"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  loginSchema,
  TLoginSchema,
} from "@/lib/form-validation/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/lib/api/auth.api";
import { useForm } from "react-hook-form";
import { useToast } from "@/lib/Toast";

export default function LoginForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { showToast } = useToast();

  // ✅ Mutation for login API
  const mutation = useMutation({
    mutationFn: (data: TLoginSchema) =>
      authApi.loginApi({
        email: data.email,
        password: data.password,
      }),
    onSuccess: () => {
      router.push("/");
      showToast("Login successful!", "bg-primary");
    },
    onError: (error: any) => {
      showToast("Login failed: " + (error?.message || "Unknown error"), "bg-destructive");
    },
  });

  // ✅ Form submit handler
  const onSubmit = (data: TLoginSchema) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-green-600">Navyan Tech</h1>
          </Link>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-green-600 hover:bg-green-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
