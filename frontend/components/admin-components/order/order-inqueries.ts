export interface Inquiry {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  productName: string
  productPrice: number
  quantity: number
  totalAmount: number
  createdAt: string
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