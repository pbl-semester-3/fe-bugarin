"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Field mengikuti kontrak backend (auth.schema.ts): { emailOrUsername, password }.
const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email/username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginValues = z.infer<typeof loginSchema>;

// Split screen desain PT (docs/DESIGN_PT.md §7.1). Tanpa app shell.
export default function LoginPage() {
  const [info, setInfo] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrUsername: "", password: "" },
  });

  function onSubmit() {
    // TODO: sambungkan ke POST /auth/login (response web: { data: { role } }).
    setInfo("Login belum tersambung ke backend (TODO integrasi).");
  }

  return (
    <main className="flex min-h-screen">
      {/* Panel kiri: foto. Gambar dari public/dashboard.webp (fallback gradient bila belum ada). */}
      <div className="relative hidden bg-gradient-to-br from-primary via-success/80 to-sidebar lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-[url('/dashboard.webp')] bg-cover bg-center" />
      </div>

      {/* Panel kanan: form */}
      <div className="flex w-full items-center justify-center bg-surface-tint p-6 lg:w-1/2">
        <div className="w-full max-w-[480px]">
          <h1 className="text-4xl font-extrabold text-ink">
            Welcome Back, Coach
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <FormField
                control={form.control}
                name="emailOrUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="coach@bugarin.com"
                          className="bg-white pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <button
                        type="button"
                        className="text-xs font-medium text-secondary-strong hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="bg-white px-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={
                            showPassword
                              ? "Sembunyikan password"
                              : "Tampilkan password"
                          }
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-ink"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Sign In
              </Button>

              {info && (
                <p className="text-center text-sm text-muted-foreground">
                  {info}
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
