import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { zodToJsonSchema } from "zod-to-json-schema";
import type { ZodTypeAny } from "zod";

import { ptProfileSchema, ptPasswordSchema } from "../lib/schemas/pt-profile.schema";

// Kontrak dihasilkan dari schema Zod backend (repo be-bugarin).
// Default: ./be/contract/schema-contract.json (hasil checkout repo BE di CI).
// Lokal: set CONTRACT_PATH, mis. ../bugarin-backend/contract/schema-contract.json
const contractPath = process.env.CONTRACT_PATH ?? resolve(process.cwd(), "be/contract/schema-contract.json");

type FieldRule = {
  type?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  enum?: string[];
  optional?: boolean;
};

type Contract = {
  version: number;
  schemas: Record<string, Record<string, FieldRule>>;
};

type JsonSchemaLike = {
  properties?: Record<string, Record<string, unknown>>;
};

// Bagian yang dibandingkan. `optional` sengaja tidak dibandingkan karena backend
// memakai schema partial (semua optional) sedangkan form FE mengirim field penuh.
const COMPARE_KEYS = ["type", "minLength", "maxLength", "minimum", "maximum", "enum"] as const;

function extractFieldRules(schema: ZodTypeAny): Record<string, FieldRule> {
  const json = zodToJsonSchema(schema) as JsonSchemaLike;
  const fields: Record<string, FieldRule> = {};

  for (const name of Object.keys(json.properties ?? {})) {
    const prop = json.properties![name];
    const rule: FieldRule = {};
    if (typeof prop.type === "string") rule.type = prop.type;
    for (const key of ["minLength", "maxLength", "minimum", "maximum"] as const) {
      if (typeof prop[key] === "number") rule[key] = prop[key] as number;
    }
    if (Array.isArray(prop.enum)) rule.enum = prop.enum as string[];
    fields[name] = rule;
  }

  return fields;
}

// Nama field FE -> nama field backend di kontrak.
const checks: Array<{
  contract: string;
  schema: ZodTypeAny;
  fields: Record<string, string>;
}> = [
  {
    contract: "pt.updateProfile",
    schema: ptProfileSchema,
    fields: {
      nama: "nama",
      usia: "usia",
      whatsapp: "whatsapp",
    },
  },
  {
    contract: "pt.changePassword",
    schema: ptPasswordSchema,
    fields: {
      currentPassword: "passwordSaatIni",
      newPassword: "passwordBaru",
      // confirmPassword hanya ada di FE (validasi klien) -> tidak dibandingkan.
    },
  },
];

function sortedEnum(value?: string[]): string[] | undefined {
  return value ? [...value].sort() : undefined;
}

function main() {
  const absolute = resolve(contractPath);
  let contract: Contract;
  try {
    contract = JSON.parse(readFileSync(absolute, "utf8")) as Contract;
  } catch (err) {
    console.error(`Gagal membaca kontrak di ${absolute}:`, (err as Error).message);
    console.error("Pastikan repo BE sudah di-checkout (folder ./be) atau set CONTRACT_PATH.");
    process.exit(1);
  }

  const problems: string[] = [];

  for (const { contract: contractName, schema, fields } of checks) {
    const contractSchema = contract.schemas[contractName];
    if (!contractSchema) {
      problems.push(`Kontrak "${contractName}" tidak ditemukan.`);
      continue;
    }

    const feRules = extractFieldRules(schema);

    for (const [feField, beField] of Object.entries(fields)) {
      const fe = feRules[feField];
      const be = contractSchema[beField];

      if (!fe) {
        problems.push(`${contractName}.${feField}: tidak ada di schema FE.`);
        continue;
      }
      if (!be) {
        problems.push(`${contractName}.${beField}: tidak ada di kontrak BE.`);
        continue;
      }

      for (const key of COMPARE_KEYS) {
        const feValue = key === "enum" ? sortedEnum(fe.enum) : fe[key];
        const beValue = key === "enum" ? sortedEnum(be.enum) : be[key];
        if (JSON.stringify(feValue) !== JSON.stringify(beValue)) {
          problems.push(
            `${contractName}.${beField} (FE ${feField}) → ${key}: FE=${JSON.stringify(feValue)} vs BE=${JSON.stringify(beValue)}`
          );
        }
      }
    }
  }

  const skipped = Object.keys(contract.schemas).filter((name) => !checks.some((c) => c.contract === name));
  if (skipped.length > 0) {
    console.log(`Catatan: kontrak tidak dicek (schema FE belum diekspor terpisah): ${skipped.join(", ")}`);
  }

  if (problems.length > 0) {
    console.error(`\nDitemukan ${problems.length} ketidakselarasan schema FE vs BE:`);
    for (const problem of problems) console.error(`- ${problem}`);
    process.exit(1);
  }

  console.log("OK: schema FE selaras dengan kontrak BE.");
}

main();
