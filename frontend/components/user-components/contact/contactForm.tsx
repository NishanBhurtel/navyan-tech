"use client";

import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  contactFormSchema,
  TContactFormSchema,
} from "@/lib/form-validation/contact.validation";
import { contactApi } from "@/lib/api/contact.api";
import { useState } from "react";
import { useAppToast } from "@/lib/tostify";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {toastSuccess, toastError} = useAppToast();

  const form = useForm<TContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      newsletter: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TContactFormSchema) => contactApi.contactFormApi(data),
    onSuccess: () => {
      toastSuccess("Email sent successfully!");
      setLoading(false);
    },
    onError: (err: any) => {
      toastError("Failed to send email!");
      setLoading(false);
    },
  });

  const onSubmit = (data: TContactFormSchema) => mutate(data);

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-xl border-0 py-6">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span>Send us a Message</span>
          </CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you within 24
            hours
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  className="h-11"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  className="h-11"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="h-11"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  className="h-11"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <select
                id="subject"
                {...form.register("subject")}
                className="w-full h-11 px-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a subject</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="technical-support">Technical Support</option>
                <option value="order-status">Order Status</option>
                <option value="warranty-claim">Warranty Claim</option>
                <option value="bulk-order">Bulk Order</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
              {form.formState.errors.subject && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                {...form.register("message")}
                className="min-h-[150px]"
              />
              {form.formState.errors.message && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            {/* Newsletter */}
            <div className="flex items-start gap-2">
              <input
                id="newsletter"
                type="checkbox"
                {...form.register("newsletter")}
              />
              <Label htmlFor="newsletter" className="text-sm">
                Subscribe to our newsletter for the latest tech updates and
                exclusive offers
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className={`w-full h-12 text-white font-semibold 
                ${isPending ? "bg-green-400" : "bg-gradient-to-r from-primary to-accent"} 
                disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {isPending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
