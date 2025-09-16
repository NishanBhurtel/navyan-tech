import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/user-components/ui/dialog"
import { Button } from "@/components/user-components/ui/button"
import { Input } from "@/components/user-components/ui/input"
import { Textarea } from "@/components/user-components/ui/textarea"
import { Label } from "@/components/user-components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/user-components/ui/select"

interface User {
  _id: string
    firstName: string,
    lastName: string,
  email: string
  phone: string
  role: string
  status?: string
  registeredAt: string
  totalOrders: number
}

interface UserActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  actionType: string
}

export default function UserActionDialog({
  open,
  onOpenChange,
  user,
  actionType,
}: UserActionDialogProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {actionType === "view" && "User Details"}
            {actionType === "edit" && "Edit User"}
            {actionType === "email" && "Send Email"}
          </DialogTitle>
        </DialogHeader>

        {actionType === "view" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <p className="text-sm text-gray-900">{user.firstName}</p>
            </div>
             <div>
              <Label>Name</Label>
              <p className="text-sm text-gray-900">{user.lastName}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-sm text-gray-900">{user.email}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="text-sm text-gray-900">{user.phone}</p>
            </div>
            <div>
              <Label>Registered</Label>
              <p className="text-sm text-gray-900">{user.registeredAt}</p>
            </div>
            <div>
              <Label>Total Orders</Label>
              <p className="text-sm text-gray-900">{user.totalOrders}</p>
            </div>
          </div>
        )}

        {actionType === "email" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter email subject" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" rows={6} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Send Email</Button>
            </div>
          </div>
        )}

        {actionType === "edit" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editName">First Name</Label>
                <Input id="editName" defaultValue={user.firstName} />
              </div>
               <div>
                <Label htmlFor="editName">Last Name</Label>
                <Input id="editName" defaultValue={user.lastName} />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input id="editEmail" defaultValue={user.email} />
              </div>
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input id="editPhone" defaultValue={user.phone} />
              </div>
              <div>
                <Label htmlFor="editRole">Role</Label>
                <Select defaultValue={user.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
