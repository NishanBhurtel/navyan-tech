export type InquiryStatus = "new" | "contacted" | "in-progress" | "completed" | "cancelled"
export type InquiryPriority = "high" | "medium" | "low"

export interface Inquiry {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  productName: string
  productPrice: number
  quantity: number
  totalAmount: number
  status: InquiryStatus
  priority: InquiryPriority
  createdAt: string
  lastContact: string | null
  notes: string
  address: string
  preferredContact: "phone" | "email" | "whatsapp"
}

export interface InquiryStats {
  total: number
  new: number
  contacted: number
  inProgress: number
  completed: number
  cancelled: number
}