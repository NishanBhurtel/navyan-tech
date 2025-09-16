"use client";
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

import { Inquiry } from "./order-inqueries";
import moment from "moment";

export type InquiryAction = "view" | "contact" | "email" | "notes";

interface InquiriesTableProps {
  inquiries: Inquiry[];
  onAction: (inquiry: Inquiry, action: InquiryAction) => void;
}

export default function InquiriesTable({
  inquiries,
  onAction,
}: InquiriesTableProps) {
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
                  <TableCell className="font-medium">Rs.{inquiry.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-gray-500">{moment(inquiries[0].createdAt).format('llll')}</TableCell>
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
                        <DropdownMenuItem onClick={() => onAction(inquiry, "email")}>
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
    </Card>
  );
}
