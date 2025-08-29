"use client"
import { Button } from "@/components/user-components/ui/button"
import { Badge } from "@/components/user-components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/user-components/ui/dialog"
import { Input } from "@/components/user-components/ui/input"
import { Label } from "@/components/user-components/ui/label"
import { Textarea } from "@/components/user-components/ui/textarea"
import { Mail, MessageSquare, Phone } from "lucide-react"
import { getPriorityColor, getStatusColor } from "./status-utils"
import { Inquiry } from "./order-inqueries"

export type DialogAction = "view" | "contact" | "email" | "notes"

interface InquiryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  actionType: DialogAction | ""
  inquiry: Inquiry | null
  notes: string
  onNotesChange: (v: string) => void
  onStatusChange: (inquiryId: string, newStatus: string) => void
}

export default function InquiryDialog({
  open,
  onOpenChange,
  actionType,
  inquiry,
  notes,
  onNotesChange,
  onStatusChange,
}: InquiryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {actionType === "view" && `Inquiry Details - ${inquiry?.id}`}
            {actionType === "contact" && "Contact Customer"}
            {actionType === "email" && "Send Email"}
            {actionType === "notes" && "Add Notes"}
          </DialogTitle>
        </DialogHeader>
        {inquiry && (
          <div className="space-y-6">
            {actionType === "view" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
                    <div className="space-y-2">
                      <div>
                        <Label>Name</Label>
                        <p className="text-sm text-gray-900">{inquiry.customerName}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="text-sm text-gray-900">{inquiry.customerEmail}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="text-sm text-gray-900">{inquiry.customerPhone}</p>
                      </div>
                      <div>
                        <Label>Address</Label>
                        <p className="text-sm text-gray-900">{inquiry.address}</p>
                      </div>
                      <div>
                        <Label>Preferred Contact</Label>
                        <Badge className="mt-1">{inquiry.preferredContact}</Badge>
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
                        <p className="text-sm text-gray-900">{inquiry.productName}</p>
                      </div>
                      <div>
                        <Label>Price</Label>
                        <p className="text-sm text-gray-900">₹{inquiry.productPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <p className="text-sm text-gray-900">{inquiry.quantity}</p>
                      </div>
                      <div>
                        <Label>Total Amount</Label>
                        <p className="text-sm font-semibold text-gray-900">₹{inquiry.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Badge className={getStatusColor(inquiry.status)}>{inquiry.status.replace("-", " ")}</Badge>
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Badge className={getPriorityColor(inquiry.priority)}>{inquiry.priority}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div>
                    <Label>Notes</Label>
                    <p className="text-sm text-gray-900 mt-1">{inquiry.notes || "No notes available"}</p>
                  </div>
                </div>
              </div>
            )}

            {actionType === "contact" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {inquiry.customerPhone}
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
                    onChange={(e) => onNotesChange(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => onStatusChange(inquiry.id, "contacted")}>
                    Mark as Contacted
                  </Button>
                </div>
              </div>
            )}

            {actionType === "email" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emailTo">To</Label>
                  <Input id="emailTo" value={inquiry.customerEmail} disabled />
                </div>
                <div>
                  <Label htmlFor="emailSubject">Subject</Label>
                  <Input id="emailSubject" placeholder="Enter email subject" defaultValue={`Regarding your inquiry for ${inquiry.productName}`} />
                </div>
                <div>
                  <Label htmlFor="emailMessage">Message</Label>
                  <Textarea
                    id="emailMessage"
                    placeholder="Enter your message"
                    rows={8}
                    defaultValue={`Dear ${inquiry.customerName},\n\nThank you for your inquiry about ${inquiry.productName}. We would be happy to assist you with your purchase.\n\nBest regards,\nNavyan Tech Team`}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
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
                    onChange={(e) => onNotesChange(e.target.value)}
                    rows={6}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
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
  )
}