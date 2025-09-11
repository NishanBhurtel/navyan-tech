"use client"
import { Button } from "@/components/user-components/ui/button"
import { Badge } from "@/components/user-components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/user-components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/user-components/ui/dropdown-menu"
import { CheckCircle, Eye, Filter, Mail, MessageSquare, MoreHorizontal, Phone } from "lucide-react"
import { getPriorityColor, getStatusColor, getStatusIcon } from "./status-utils"
import { Inquiry } from "./order-inqueries"

export type InquiryAction = "view" | "contact" | "email" | "notes"

interface InquiriesTableProps {
  inquiries: Inquiry[]
  onAction: (inquiry: Inquiry, action: InquiryAction) => void
  onMarkComplete: (inquiryId: string) => void
}

export default function InquiriesTable({ inquiries, onAction, onMarkComplete }: InquiriesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Inquiries ({inquiries.length})</span>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inquiry ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-mono text-sm">{inquiry.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{inquiry.customerName}</div>
                      <div className="text-sm text-gray-500">{inquiry.customerEmail}</div>
                      <div className="text-sm text-gray-500">{inquiry.customerPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{inquiry.productName}</div>
                      <div className="text-sm text-gray-500">Qty: {inquiry.quantity}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">₹{inquiry.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-gray-500">{inquiry.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onAction(inquiry, "view")}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onClick={() => onAction(inquiry, "contact")}>
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Customer
                        </DropdownMenuItem> */}
                        <DropdownMenuItem onClick={() => onAction(inquiry, "email")}>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onClick={() => onAction(inquiry, "notes")}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Add Notes
                        </DropdownMenuItem> */}
                        {inquiry.status !== "completed" && (
                          <DropdownMenuItem onClick={() => onMarkComplete(inquiry.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Complete
                          </DropdownMenuItem>
                        )}
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
  )
}