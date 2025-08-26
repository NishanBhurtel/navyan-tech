"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Send, Users, Eye, BarChart3, Plus, Edit, Copy } from "lucide-react"

// Mock email templates
const emailTemplates = [
  {
    id: 1,
    name: "Product Launch",
    subject: "🚀 New Product Alert - {{product_name}}",
    category: "promotion",
    preview: "Exciting news! We're launching a new product...",
    lastUsed: "2024-01-20",
  },
  {
    id: 2,
    name: "Weekly Newsletter",
    subject: "📧 Navyan Tech Weekly - Latest Updates",
    category: "newsletter",
    preview: "Here's what's happening this week at Navyan Tech...",
    lastUsed: "2024-01-18",
  },
  {
    id: 3,
    name: "Special Offer",
    subject: "💰 Limited Time Offer - Save up to {{discount}}%",
    category: "promotion",
    preview: "Don't miss out on our exclusive deals...",
    lastUsed: "2024-01-15",
  },
  {
    id: 4,
    name: "Order Confirmation",
    subject: "✅ Order Confirmed - {{order_id}}",
    category: "transactional",
    preview: "Thank you for your order! Here are the details...",
    lastUsed: "2024-01-21",
  },
];

// Mock campaign history
const campaignHistory = [
  {
    id: "CAMP-001",
    name: "New Year Sale Campaign",
    subject: "🎉 New Year Special - Up to 50% Off",
    recipients: 1247,
    sent: "2024-01-01 10:00 AM",
    status: "sent",
    openRate: "24.5%",
    clickRate: "3.2%",
  },
  {
    id: "CAMP-002",
    name: "Product Launch - Gaming Laptops",
    subject: "🚀 New Gaming Laptops Collection",
    recipients: 856,
    sent: "2024-01-15 02:00 PM",
    status: "sent",
    openRate: "31.8%",
    clickRate: "5.7%",
  },
  {
    id: "CAMP-003",
    name: "Weekly Newsletter #3",
    subject: "📧 Navyan Tech Weekly - Tech Updates",
    recipients: 1247,
    sent: "2024-01-18 09:00 AM",
    status: "sent",
    openRate: "18.9%",
    clickRate: "2.1%",
  },
];

const audienceSegments = [
  {
    id: "all",
    name: "All Users",
    count: 1247,
    description: "All registered users",
  },
  {
    id: "customers",
    name: "Customers",
    count: 892,
    description: "Users who have made purchases",
  },
  {
    id: "new_users",
    name: "New Users",
    count: 89,
    description: "Users registered in last 30 days",
  },
  {
    id: "high_value",
    name: "High Value",
    count: 156,
    description: "Users with orders > ₹50,000",
  },
];

export default function EmailMarketingPage() {
  const [activeTab, setActiveTab] = useState("compose");
  const [selectedTemplate, setSelectedTemplate] = useState("0"); // Updated default value to "0"
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    content: "",
    audience: "all",
    scheduledFor: "",
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(
      (t) => t.id === Number.parseInt(templateId)
    );
    if (template) {
      setEmailData((prev) => ({
        ...prev,
        subject: template.subject,
        content:
          template.preview + "\n\n[Full email content would be loaded here...]",
      }));
      setSelectedTemplate(templateId);
    }
  };

  const handleSendEmail = () => {
    const audience = audienceSegments.find((a) => a.id === emailData.audience);
    if (confirm(`Send email to ${audience?.count} recipients?`)) {
      // Handle email sending logic
      console.log("Sending email:", emailData);
      alert("Email campaign sent successfully!");
      // Reset form
      setEmailData({
        subject: "",
        content: "",
        audience: "all",
        scheduledFor: "",
      });
      setSelectedTemplate("0"); // Updated default value to "0"
    }
  };

  const getStatusColor = (status:"sent" | "scheduled" | "draft") => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: "promotion" | "newsletter" | "transactional") => {
    switch (category) {
      case "promotion":
        return "bg-orange-100 text-orange-800";
      case "newsletter":
        return "bg-blue-100 text-blue-800";
      case "transactional":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Email Marketing
          </h1>
          <p className="text-gray-600 mt-2">
            Create and send email campaigns to your customers
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">
                  Total Subscribers
                </p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex w-[685px]">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
        </TabsList>

        {/* Compose Email Tab */}
        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Email Composer */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Create Email Campaign</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
           

                  <div>
                    <Label htmlFor="subject">Subject Line *</Label>
                    <Input
                      id="subject"
                      value={emailData.subject}
                      onChange={(e) =>
                        setEmailData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="Enter email subject"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Email Content *</Label>
                    <Textarea
                      id="content"
                      value={emailData.content}
                      onChange={(e) =>
                        setEmailData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Write your email content here..."
                      rows={12}
                      required
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSendEmail}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
