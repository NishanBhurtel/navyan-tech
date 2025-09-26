"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  loginSchema,
  TLoginSchema,
} from "@/lib/form-validation/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/lib/api/auth.api";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { useAppToast } from "@/lib/tostify";

export default function LoginForm() {
  const router = useRouter();
  const { toastSuccess, toastError } = useAppToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Mutation for login API
  const mutation = useMutation({
    mutationFn: (data: TLoginSchema) =>
      authApi.loginApi({
        email: data.email,
        password: data.password,
      }),
    onSuccess: () => {
      toastSuccess("User login successfull!");
      router.push("/");
    },
    onError: (error: any) => {
      toastSuccess("User login failed!");
    },
  });

  // ✅ Form submit handler
  const onSubmit = async (data: TLoginSchema) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // stay on same page
    });
    if (res?.ok) {
      router.push("/");
      const session = await getSession();
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      toastSuccess("Login successful!");
    } else {
      toastError("Login failed: " + (res?.error || "Unknown error"));
    }
  };


  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <img src="/logos/NavYantra-Logo.png" alt="logo" className="h-14 w-auto" />
          </Link>

          <p className="text-2xl text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card className="shadow-lg border border-gray-200 py-6">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
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
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
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
