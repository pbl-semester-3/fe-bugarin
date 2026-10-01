"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function LoginPage() {
  const [info, setInfo] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrUsername: "", password: "" },
  });

  function onSubmit() {
    // TODO: sambungkan ke POST /auth/login (response web: { data: { role } }).
    // Backend belum punya akun PT/Admin, jadi submit sengaja belum di-wire.
    setInfo("Login belum tersambung ke backend (TODO integrasi).");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login Bugarin</CardTitle>
          <CardDescription>Masuk sebagai Personal Trainer atau Admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="emailOrUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email atau Username</FormLabel>
                    <FormControl>
                      <Input placeholder="email@contoh.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Masuk
              </Button>
              {info && (
                <p className="text-sm text-muted-foreground">{info}</p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
