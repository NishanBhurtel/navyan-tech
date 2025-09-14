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
  registerSchema,
  TRegisterSchema,
} from "@/lib/form-validation/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/lib/api/auth.api";
import { useForm } from "react-hook-form";
import { useToast } from "@/lib/Toast";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { showToast } = useToast();
  // ✅ Mutation for registration API
  const mutation = useMutation({
    mutationFn: (data: TRegisterSchema) =>
      authApi.registerApi({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phoneNumber: data.phoneNumber,
        termsAccepted: data.termsAccepted,
      }),
    onSuccess: () => {
      router.push("/login");
      showToast("Registration successful!", "bg-green-600");
    },
    onError: (error: any) => {
      showToast(
        "Registration failed: " + error?.message || "Unknown error",
        "bg-red-600"
      );
      console.log(error.message);
    },
  });

  // ✅ Form submit handler
  const onSubmit = (data: TRegisterSchema) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-green-600">Navyan Tech</h1>
          </Link>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Get Started
            </CardTitle>
            <CardDescription className="text-center">
              Create your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="John"
                    className="h-11"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Doe"
                    className="h-11"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...register("email", { required: "Email is required" })}
                  placeholder="john@example.com"
                  className="h-11"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  placeholder="977 9812345678"
                  className="h-11"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  type="password"
                  placeholder="Create a strong password"
                  className="h-11"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                  })}
                  type="password"
                  placeholder="Confirm your password"
                  className="h-11"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  {...register("termsAccepted", {
                    required: "You must accept the terms",
                  })}
                  id="termsAccepted"
                  type="checkbox"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <Label htmlFor="termsAccepted" className="text-sm">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-green-600 hover:text-green-700"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-green-600 hover:text-green-700"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm">
                  {errors.termsAccepted.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-green-600 hover:bg-green-700"
                disabled={mutation.status === "pending"}
              >
                {mutation.status === "pending"
                  ? "Creating..."
                  : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
