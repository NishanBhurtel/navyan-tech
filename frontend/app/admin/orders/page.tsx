"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
} from "lucide-react"

// Mock order inquiry data
const mockInquiries = [
  {
    id: "INQ-001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "+91 9876543210",
    productName: "ASUS ROG Strix Gaming Laptop",
    productPrice: 89999,
    quantity: 1,
    totalAmount: 89999,
    status: "new",
    priority: "high",
    createdAt: "2024-01-21 10:30 AM",
    lastContact: null,
    notes: "",
    address: "123 Main St, Mumbai, Maharashtra 400001",
    preferredContact: "phone",
  },
  {
    id: "INQ-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    customerPhone: "+91 9876543211",
    productName: "MSI Gaming Desktop RTX 4080",
    productPrice: 125000,
    quantity: 1,
    totalAmount: 125000,
    status: "contacted",
    priority: "medium",
    createdAt: "2024-01-21 09:15 AM",
    lastContact: "2024-01-21 11:00 AM",
    notes: "Customer interested, requested demo",
    address: "456 Park Ave, Delhi, Delhi 110001",
    preferredContact: "email",
  },
  {
    id: "INQ-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@example.com",
    customerPhone: "+91 9876543212",
    productName: "MacBook Pro M3 16-inch",
    productPrice: 199999,
    quantity: 1,
    totalAmount: 199999,
    status: "in-progress",
    priority: "high",
    createdAt: "2024-01-20 03:45 PM",
    lastContact: "2024-01-21 10:00 AM",
    notes: "Negotiating price, customer budget is 180k",
    address: "789 Tech Park, Bangalore, Karnataka 560001",
    preferredContact: "whatsapp",
  },
  {
    id: "INQ-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.wilson@example.com",
    customerPhone: "+91 9876543213",
    productName: "Dell XPS 13 Ultrabook",
    productPrice: 75000,
    quantity: 2,
    totalAmount: 150000,
    status: "completed",
    priority: "low",
    createdAt: "2024-01-19 02:20 PM",
    lastContact: "2024-01-20 04:30 PM",
    notes: "Order completed, payment received",
    address: "321 Business District, Pune, Maharashtra 411001",
    preferredContact: "email",
  },
  {
    id: "INQ-005",
    customerName: "David Brown",
    customerEmail: "david.brown@example.com",
    customerPhone: "+91 9876543214",
    productName: "HP Pavilion Gaming Desktop",
    productPrice: 65000,
    quantity: 1,
    totalAmount: 65000,
    status: "cancelled",
    priority: "low",
    createdAt: "2024-01-18 11:00 AM",
    lastContact: "2024-01-19 09:30 AM",
    notes: "Customer found better deal elsewhere",
    address: "654 Residential Area, Chennai, Tamil Nadu 600001",
    preferredContact: "phone",
  },
]

const inquiryStats = {
  total: 156,
  new: 23,
  contacted: 45,
  inProgress: 67,
  completed: 18,
  cancelled: 3,
}

export default function OrderInquiriesPage() {
  const [inquiries, setInquiries] = useState(mockInquiries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false)
  const [actionType, setActionType] = useState("")
  const [notes, setNotes] = useState("")

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    const matchesPriority = priorityFilter === "all" || inquiry.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleInquiryAction = (inquiry, action) => {
    setSelectedInquiry(inquiry)
    setActionType(action)
    setNotes(inquiry.notes || "")
    setIsInquiryDialogOpen(true)
  }

  const handleStatusChange = (inquiryId, newStatus) => {
    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              status: newStatus,
              lastContact: new Date().toLocaleString(),
            }
          : inquiry,
      ),
    )
    setIsInquiryDialogOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />
      case "contacted":
        return <MessageSquare className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Order Inquiries</h1>
          <p className="text-gray-600 mt-2">Manage customer product inquiries and follow-ups</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-600 rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{inquiryStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-gray-900">{inquiryStats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-yellow-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-gray-900">{inquiryStats.contacted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-purple-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inquiryStats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{inquiryStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-red-600 rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{inquiryStats.cancelled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by customer name, email, inquiry ID, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Inquiries ({filteredInquiries.length})</span>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
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
                    <TableCell>
                      <Badge className={getStatusColor(inquiry.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(inquiry.status)}
                          <span>{inquiry.status.replace("-", " ")}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(inquiry.priority)}>{inquiry.priority}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{inquiry.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleInquiryAction(inquiry, "view")}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleInquiryAction(inquiry, "contact")}>
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleInquiryAction(inquiry, "email")}>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleInquiryAction(inquiry, "notes")}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Notes
                          </DropdownMenuItem>
                          {inquiry.status !== "completed" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "completed")}>
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

      {/* Inquiry Action Dialog */}
      <Dialog open={isInquiryDialogOpen} onOpenChange={setIsInquiryDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {actionType === "view" && `Inquiry Details - ${selectedInquiry?.id}`}
              {actionType === "contact" && "Contact Customer"}
              {actionType === "email" && "Send Email"}
              {actionType === "notes" && "Add Notes"}
            </DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-6">
              {actionType === "view" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
                      <div className="space-y-2">
                        <div>
                          <Label>Name</Label>
                          <p className="text-sm text-gray-900">{selectedInquiry.customerName}</p>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <p className="text-sm text-gray-900">{selectedInquiry.customerEmail}</p>
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <p className="text-sm text-gray-900">{selectedInquiry.customerPhone}</p>
                        </div>
                        <div>
                          <Label>Address</Label>
                          <p className="text-sm text-gray-900">{selectedInquiry.address}</p>
                        </div>
                        <div>
                          <Label>Preferred Contact</Label>
                          <Badge className="mt-1">{selectedInquiry.preferredContact}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Product & Order Details</h3>
                      <div className="space-y-2">
                        <div>
                          <Label>Product</Label>
                          <p className="text-sm text-gray-900">{selectedInquiry.productName}</p>
                        </div>
                        <div>
                          <Label>Price</Label>
                          <p className="text-sm text-gray-900">₹{selectedInquiry.productPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label>Quantity</Label>
                          <p className="text-sm text-gray-900">{selectedInquiry.quantity}</p>
                        </div>
                        <div>
                          <Label>Total Amount</Label>
                          <p className="text-sm font-semibold text-gray-900">
                            ₹{selectedInquiry.totalAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label>Status</Label>
                          <Badge className={getStatusColor(selectedInquiry.status)}>
                            {selectedInquiry.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <div>
                          <Label>Priority</Label>
                          <Badge className={getPriorityColor(selectedInquiry.priority)}>
                            {selectedInquiry.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div>
                      <Label>Notes</Label>
                      <p className="text-sm text-gray-900 mt-1">{selectedInquiry.notes || "No notes available"}</p>
                    </div>
                  </div>
                </div>
              )}

              {actionType === "contact" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {selectedInquiry.customerPhone}
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor="contactNotes">Contact Notes</Label>
                    <Textarea
                      id="contactNotes"
                      placeholder="Add notes about this contact..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsInquiryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(selectedInquiry.id, "contacted")}
                    >
                      Mark as Contacted
                    </Button>
                  </div>
                </div>
              )}

              {actionType === "email" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="emailTo">To</Label>
                    <Input id="emailTo" value={selectedInquiry.customerEmail} disabled />
                  </div>
                  <div>
                    <Label htmlFor="emailSubject">Subject</Label>
                    <Input
                      id="emailSubject"
                      placeholder="Enter email subject"
                      defaultValue={`Regarding your inquiry for ${selectedInquiry.productName}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailMessage">Message</Label>
                    <Textarea
                      id="emailMessage"
                      placeholder="Enter your message"
                      rows={8}
                      defaultValue={`Dear ${selectedInquiry.customerName},\n\nThank you for your inquiry about ${selectedInquiry.productName}. We would be happy to assist you with your purchase.\n\nBest regards,\nNavyan Tech Team`}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsInquiryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">Send Email</Button>
                  </div>
                </div>
              )}

              {actionType === "notes" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="inquiryNotes">Notes</Label>
                    <Textarea
                      id="inquiryNotes"
                      placeholder="Add notes about this inquiry..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsInquiryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">Save Notes</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
