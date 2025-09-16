"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { Send, Loader2 } from "lucide-react";
import { Input } from "@/components/user-components/ui/input";
import { toast } from "sonner"; // or your preferred toast library

// Types
interface EmailData {
  subject: string;
  text: string;
}

// API Function
const sendEmail = async (emailData: EmailData) => {
  const response = await fetch("http://localhost:5000/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to send email" }));
    throw new Error(errorData.message || "Failed to send email");
  }

  return response.json();
};

export default function EmailTab() {
  // State
  const [emailData, setEmailData] = useState<EmailData>({
    subject: "",
    text: "",
  });

  // Mutation
  const sendEmailMutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
      toast.success("Email campaign sent successfully to all users!");

      // Reset form
      setEmailData({
        subject: "",
        text: "",
      });

      console.log("Email sent successfully:", data);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send email campaign");
      console.error("Email sending failed:", error);
    },
  });

  // Event Handlers
  const handleSendEmail = async () => {
    // Validation
    if (!emailData.subject.trim()) {
      toast.error("Subject line is required");
      return;
    }

    if (!emailData.text.trim()) {
      toast.error("Email content is required");
      return;
    }

    // Send email to all users
    sendEmailMutation.mutate(emailData);
  };

  const handleInputChange = (field: keyof EmailData, value: string) => {
    setEmailData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <TabsContent value="compose" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Composer */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pt-4">
              <CardTitle>Create Email Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject Line */}
              <div>
                <Label htmlFor="subject">Subject Line *</Label>
                <Input
                  className="my-2"
                  id="subject"
                  value={emailData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Enter email subject"
                  required
                  disabled={sendEmailMutation.isPending}
                />
              </div>

              {/* Email Content */}
              <div>
                <Label htmlFor="content">Email Content *</Label>
                <Textarea
                  className="my-2"
                  id="content"
                  value={emailData.text}
                  onChange={(e) => handleInputChange("text", e.target.value)}
                  placeholder="Write your email content here..."
                  rows={12}
                  required
                  disabled={sendEmailMutation.isPending}
                />
              </div>

              {/* Send Button */}
              <div className="flex space-x-2">
                <Button
                  onClick={handleSendEmail}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={sendEmailMutation.isPending}
                >
                  {sendEmailMutation.isPending ? (
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

              {/* Error Display */}
              {sendEmailMutation.isError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  Error:{" "}
                  {sendEmailMutation.error?.message || "Failed to send email"}
                </div>
              )}

              {/* Success Display */}
              {sendEmailMutation.isSuccess && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                  Email campaign sent successfully to all users!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
}
