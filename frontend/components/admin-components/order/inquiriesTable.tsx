"use client";

import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Button } from "@/components/user-components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/user-components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/user-components/ui/dropdown-menu";
import { Eye, Mail, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { Inquiry } from "./order-inqueries";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/user-components/ui/dialog";
import { Input } from "@/components/user-components/ui/input";
import { Textarea } from "@/components/user-components/ui/textarea";

export type InquiryAction = "view" | "contact" | "email" | "notes";

interface InquiriesTableProps {
  inquiries: Inquiry[];
  onAction: (inquiry: Inquiry, action: InquiryAction) => void;
}

export default function InquiriesTable({
  inquiries,
  onAction,
}: InquiriesTableProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  // const emailMutation = useMutation({
  //   mutationFn: async ({
  //     email,
  //     subject,
  //     text,
  //   }: {
  //     email: string;
  //     subject: string;
  //     text: string;
  //   }) => {
  //     const res = await axios.post("http://localhost:5000/email/sent", {
  //       email,
  //       subject,
  //       text,
  //     });
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     alert("✅ Email sent successfully");
  //     setOpen(false);
  //     setSubject("");
  //     setMessage("");
  //   },
  //   onError: () => {
  //     alert("❌ Failed to send email");
  //   },
  // });

  const emailMutation = useMutation({
    mutationFn: async ({
      email,
      subject,
      text,
    }: {
      email: string;
      subject: string;
      text: string;
    }) => {
      const res = await axios.post("http://localhost:5000/email/sent", {
        email,
        subject,
        text,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Email sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOpen(false);
      setSubject("");
      setMessage("");
    },
    onError: () => {
      toast.error("❌ Failed to send email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const handleSendEmail = () => {
    if (selectedInquiry) {
      emailMutation.mutate({
        email: selectedInquiry.customerEmail,
        subject:
          subject ||
          `Regarding your inquiry about ${selectedInquiry.productName}`,
        text:
          message ||
          `Hello ${selectedInquiry.customerName},\n\nThank you for your inquiry about ${selectedInquiry.productName}.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between pt-4">
          <span>Inquiries ({inquiries.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {inquiry.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {inquiry.customerEmail}
                      </div>
                      <div className="text-sm text-gray-500">
                        {inquiry.customerPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {inquiry.productName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Qty: {inquiry.quantity}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    Rs.{inquiry.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {moment(inquiry.createdAt).format("llll")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onAction(inquiry, "view")}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setOpen(true);
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Send Email to {selectedInquiry?.customerName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* To (readonly) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">To</label>
              <Input value={selectedInquiry?.customerEmail || ""} disabled />
            </div>

            {/* Subject with default suggestion */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Subject</label>
              <Input
                placeholder="Subject"
                value={
                  subject ||
                  `Regarding your inquiry about ${
                    selectedInquiry?.productName || ""
                  }`
                }
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Message always blank for admin to write */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Message</label>
              {/* <Textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              /> */}
              <Textarea
                placeholder="Write your message here..."
                value={
                  message ||
                  `Hello ${
                    selectedInquiry?.customerName || ""
                  },\n\nThank you for your inquiry about ${
                    selectedInquiry?.productName || ""
                  }.`
                }
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSendEmail}
              disabled={emailMutation.isPending}
            >
              {emailMutation.isPending ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
