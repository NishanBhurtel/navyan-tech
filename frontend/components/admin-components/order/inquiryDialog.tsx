"use client"
import { Button } from "@/components/user-components/ui/button"
import { Badge } from "@/components/user-components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/user-components/ui/dialog"
import { Input } from "@/components/user-components/ui/input"
import { Label } from "@/components/user-components/ui/label"
import { Textarea } from "@/components/user-components/ui/textarea"
import { Inquiry } from "./order-inqueries"

export type DialogAction = "view" | "contact" | "email" | "notes"

interface InquiryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  actionType: DialogAction | ""
  inquiry: Inquiry | null
}

export default function InquiryDialog({
  open,
  onOpenChange,
  actionType,
  inquiry,
}: InquiryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {actionType === "view" && `Inquiry Details - ${inquiry?.id}`}
            {actionType === "email" && "Send Email"}
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
                        <Badge className="mt-1 py-1">{inquiry.preferredContact}</Badge>
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
                        <p className="text-sm text-gray-900">Rs.{inquiry.productPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <p className="text-sm text-gray-900">{inquiry.quantity}</p>
                      </div>
                      <div>
                        <Label>Total Amount</Label>
                        <p className="text-sm font-semibold text-gray-900">Rs.{inquiry.totalAmount.toLocaleString()}</p>
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

            {actionType === "email" && (
              <div className="space-y-4">
                <div>
                  <Label className="my-2" htmlFor="emailTo">To</Label>
                  <Input id="emailTo" value={inquiry.customerEmail} disabled />
                </div>
                <div>
                  <Label className="my-2" htmlFor="emailSubject">Subject</Label>
                  <Input id="emailSubject" placeholder="Enter email subject" defaultValue={`Regarding your order inquery for ${inquiry.productName}`} />
                </div>
                <div>
                  <Label className="my-2" htmlFor="emailMessage">Message</Label>
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}