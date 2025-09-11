"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Package } from "lucide-react";
import {
  createOrderSchema,
  TCreateOrderSchema,
} from "@/lib/form-validation/order-validation";
import { orderApi } from "@/lib/api/order.api";
import { useToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { IProduct } from "@/lib/utils/types/product.type";

interface OrderFormProps {
  product: IProduct;
  quantity: number;
}

export default function OrderForm({ product, quantity }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      notes: "",
      preferredContact: "",
      productID: product._id,
      quantity, // <-- include productId & quantity
    },
  });

  const router = useRouter();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: TCreateOrderSchema) => orderApi.createOrderApi(data),
    onSuccess: () => {
      showToast("Order submitted successfully", "bg-green-600");
      router.push("/order/success");
    },
    onError: (error: any) => {
      showToast(
        "Failed to submit order! " + (error?.message || "Unknown error"),
        "bg-red-600"
      );
    },
  });

  const onSubmit = (data: TCreateOrderSchema) => {
    // Attach productId and quantity from props (in case user did not modify)
    data.productID = product._id;
    data.quantity = quantity;
    mutation.mutate(data);
  };

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-serif text-foreground flex items-center space-x-2">
            <Package className="w-6 h-6 text-primary" />
            <span>Order Details</span>
          </CardTitle>
          <CardDescription>
            Please fill in your details to complete your order inquiry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className="h-11"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className="h-11"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="h-11"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Shipping Address
              </h3>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" {...register("address")} className="h-11" />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" {...register("city")} className="h-11" />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  {/* <Input id="state" {...register("state")} className="h-11" /> */}
                  <select
                    id="state"
                    defaultValue=""
                    {...register("state")}
                    className="w-full h-11 px-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="" disabled>
                      -- Choose Province --
                    </option>
                    <option value="koshi">Koshi Province</option>
                    <option value="madhesh">Madhesh Province</option>
                    <option value="bagmati">Bagmati Province</option>
                    <option value="gandaki">Gandaki Province</option>
                    <option value="lumbini">Lumbini Province</option>
                    <option value="karnali">Karnali Province</option>
                    <option value="sudurpaschim">Sudurpashchim Province</option>
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP/Postal Code *</Label>
                  <Input id="zip" {...register("zip")} className="h-11" />
                  {errors.zip && (
                    <p className="text-red-500 text-sm">{errors.zip.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Additional Information
              </h3>
              <div className="space-y-2">
                <Label htmlFor="notes">Special Requirements or Notes</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredContact">
                  Preferred Contact Method
                </Label>
                <select
                  id="preferredContact"
                  defaultValue=""
                  {...register("preferredContact")}
                  className="w-full h-11 px-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>
                    -- Choose Contact Method --
                  </option>
                  <option value="phone">Phone Call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
                {errors.preferredContact && (
                  <p className="text-red-500 text-sm">
                    {errors.preferredContact.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold text-lg"
            >
              Submit Order Inquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
