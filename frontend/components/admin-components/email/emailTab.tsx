"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";
import { Button } from "@/components/user-components/ui/button";
import { Label } from "@/components/user-components/ui/label";
import { Textarea } from "@/components/user-components/ui/textarea";
import { TabsContent } from "@/components/user-components/ui/tabs";
import { Input } from "@/components/user-components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { adminEmailSchema, TAdminEmailFormSchema } from "@/lib/form-validation/sendEmailToUser.validation";
import { adminEmailApi } from "@/lib/api/sendEmailToUser.api";
import { useAppToast } from "@/lib/tostify";

export default function EmailTab() {
  const [resetKey, setResetKey] = useState(0); // force reset UI messages if needed
  const { toastSuccess, toastError } = useAppToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAdminEmailFormSchema>({
    resolver: zodResolver(adminEmailSchema),
    defaultValues: {
      subject: "",
      text: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TAdminEmailFormSchema) => adminEmailApi.adminEmailFormApi(data),
    onSuccess: (data) => {
      toastSuccess("Email campaign sent successfully to all users!");
      reset(); // clear form
      setResetKey((k) => k + 1);
      console.log("Email sent:", data);
    },
    onError: (err: any) => {
      toastError(err?.message || "Failed to send email campaign");
      console.error("Email sending failed:", err);
    },
  });

  const onSubmit = (data: TAdminEmailFormSchema) => mutation.mutate(data);

  return (
    <TabsContent value="compose" key={resetKey} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Create Email Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Subject */}
                <div>
                  <Label className="my-2" htmlFor="subject">Subject Line *</Label>
                  <Input
                    id="subject"
                    placeholder="Enter email subject"
                    disabled={mutation.isPending}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Email Content */}
                <div>
                  <Label className="my-2" htmlFor="text">Email Content *</Label>
                  <Textarea
                    id="text"
                    placeholder="Write your email content here..."
                    rows={12}
                    disabled={mutation.isPending}
                    {...register("text")}
                  />
                  {errors.text && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.text.message}
                    </p>
                  )}
                </div>

                {/* Send Button */}
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Mail
                      </>
                    )}
                  </Button>
                </div>

                {/* Feedback Messages */}
                {mutation.isError && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {mutation.error instanceof Error
                      ? mutation.error.message
                      : "Failed to send email"}
                  </div>
                )}

                {mutation.isSuccess && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                    Email campaign sent successfully to all users!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
}
