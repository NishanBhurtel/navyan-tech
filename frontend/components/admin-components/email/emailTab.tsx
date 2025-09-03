// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/user-components/ui/card";
// import { Button } from "@/components/user-components/ui/button";
// import { Label } from "@/components/user-components/ui/label";
// import { Textarea } from "@/components/user-components/ui/textarea";
// import { TabsContent } from "@/components/user-components/ui/tabs";
// import { Send } from "lucide-react";
// import { Input } from "@/components/user-components/ui/input";

// export default function EmailTab() {
//   const emailTemplates = [
//     {
//       id: 1,
//       name: "Product Launch",
//       subject: "🚀 New Product Alert - {{product_name}}",
//       category: "promotion",
//       preview: "Exciting news! We're launching a new product...",
//       lastUsed: "2024-01-20",
//     },
//     {
//       id: 2,
//       name: "Weekly Newsletter",
//       subject: "📧 Navyan Tech Weekly - Latest Updates",
//       category: "newsletter",
//       preview: "Here's what's happening this week at Navyan Tech...",
//       lastUsed: "2024-01-18",
//     },
//     {
//       id: 3,
//       name: "Special Offer",
//       subject: "💰 Limited Time Offer - Save up to {{discount}}%",
//       category: "promotion",
//       preview: "Don't miss out on our exclusive deals...",
//       lastUsed: "2024-01-15",
//     },
//     {
//       id: 4,
//       name: "Order Confirmation",
//       subject: "✅ Order Confirmed - {{order_id}}",
//       category: "transactional",
//       preview: "Thank you for your order! Here are the details...",
//       lastUsed: "2024-01-21",
//     },
//   ];

//   const campaignHistory = [
//     {
//       id: "CAMP-001",
//       name: "New Year Sale Campaign",
//       subject: "🎉 New Year Special - Up to 50% Off",
//       recipients: 1247,
//       sent: "2024-01-01 10:00 AM",
//       status: "sent",
//       openRate: "24.5%",
//       clickRate: "3.2%",
//     },
//     {
//       id: "CAMP-002",
//       name: "Product Launch - Gaming Laptops",
//       subject: "🚀 New Gaming Laptops Collection",
//       recipients: 856,
//       sent: "2024-01-15 02:00 PM",
//       status: "sent",
//       openRate: "31.8%",
//       clickRate: "5.7%",
//     },
//     {
//       id: "CAMP-003",
//       name: "Weekly Newsletter #3",
//       subject: "📧 Navyan Tech Weekly - Tech Updates",
//       recipients: 1247,
//       sent: "2024-01-18 09:00 AM",
//       status: "sent",
//       openRate: "18.9%",
//       clickRate: "2.1%",
//     },
//   ];

//   const audienceSegments = [
//     {
//       id: "all",
//       name: "All Users",
//       count: 1247,
//       description: "All registered users",
//     },
//     {
//       id: "customers",
//       name: "Customers",
//       count: 892,
//       description: "Users who have made purchases",
//     },
//     {
//       id: "new_users",
//       name: "New Users",
//       count: 89,
//       description: "Users registered in last 30 days",
//     },
//     {
//       id: "high_value",
//       name: "High Value",
//       count: 156,
//       description: "Users with orders > ₹50,000",
//     },
//   ];

//   const [activeTab, setActiveTab] = useState("compose");
//   const [selectedTemplate, setSelectedTemplate] = useState("0"); // Updated default value to "0"
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [emailData, setEmailData] = useState({
//     subject: "",
//     content: "",
//     audience: "all",
//     scheduledFor: "",
//   });

//   const handleTemplateSelect = (templateId: string) => {
//     const template = emailTemplates.find(
//       (t) => t.id === Number.parseInt(templateId)
//     );
//     if (template) {
//       setEmailData((prev) => ({
//         ...prev,
//         subject: template.subject,
//         content:
//           template.preview + "\n\n[Full email content would be loaded here...]",
//       }));
//       setSelectedTemplate(templateId);
//     }
//   };

//   const handleSendEmail = () => {
//     const audience = audienceSegments.find((a) => a.id === emailData.audience);
//     if (confirm(`Send email to ${audience?.count} recipients?`)) {
//       // Handle email sending logic
//       console.log("Sending email:", emailData);
//       alert("Email campaign sent successfully!");
//       // Reset form
//       setEmailData({
//         subject: "",
//         content: "",
//         audience: "all",
//         scheduledFor: "",
//       });
//       setSelectedTemplate("0"); // Updated default value to "0"
//     }
//   };

//   return (
//     <TabsContent value="compose" className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Email Composer */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Create Email Campaign</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="subject">Subject Line *</Label>
//                 <Input
//                   className="my-2"
//                   id="subject"
//                   value={emailData.subject}
//                   onChange={(e) =>
//                     setEmailData((prev) => ({
//                       ...prev,
//                       subject: e.target.value,
//                     }))
//                   }
//                   placeholder="Enter email subject"
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="content">Email Content *</Label>
//                 <Textarea
//                   className="my-2"
//                   id="content"
//                   value={emailData.content}
//                   onChange={(e) =>
//                     setEmailData((prev) => ({
//                       ...prev,
//                       content: e.target.value,
//                     }))
//                   }
//                   placeholder="Write your email content here..."
//                   rows={12}
//                   required
//                 />
//               </div>

//               <div className="flex space-x-2">
//                 <Button
//                   onClick={handleSendEmail}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   <Send className="h-4 w-4 mr-2" />
//                   Send Campaign
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </TabsContent>
//   );
// }

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
            <CardHeader>
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
                      Send Campaign
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
