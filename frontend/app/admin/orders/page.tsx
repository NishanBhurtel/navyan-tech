"use client"
import FiltersBar from "@/components/admin-components/order/filterBar"
import OrderHeader from "@/components/admin-components/order/header"
import InquiriesTable, { InquiryAction } from "@/components/admin-components/order/inquiriesTable"
import InquiryDialog, { DialogAction } from "@/components/admin-components/order/inquiryDialog"
import { inquiryStats, mockInquiries } from "@/components/admin-components/order/mock-inqueries"
import { Inquiry } from "@/components/admin-components/order/order-inqueries"
import StatsGrid from "@/components/admin-components/order/statusGrid"
import { useAllOrders } from "@/hooks/order/getAllOrders"
import { useMemo, useState } from "react"

export default function OrderInquiriesPage() {

  // const {data:orders, error, isLoading } = useAllOrders();

  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<DialogAction | "">("")
  const [notes, setNotes] = useState("")

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      const q = searchTerm.toLowerCase()
      const matchesSearch =
        inquiry.customerName.toLowerCase().includes(q) ||
        inquiry.customerEmail.toLowerCase().includes(q) ||
        inquiry.id.toLowerCase().includes(q) ||
        inquiry.productName.toLowerCase().includes(q)
      const matchesStatus = statusFilter === "all" || inquiry.status === (statusFilter as any)
      const matchesPriority = priorityFilter === "all" || inquiry.priority === (priorityFilter as any)
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [inquiries, searchTerm, statusFilter, priorityFilter])

  const handleInquiryAction = (inquiry: Inquiry, action: InquiryAction) => {
    setSelectedInquiry(inquiry)
    setActionType(action)
    setNotes(inquiry.notes || "")
    setIsInquiryDialogOpen(true)
  }

  const handleStatusChange = (inquiryId: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId ? { ...inq, status: newStatus as any, lastContact: new Date().toLocaleString() } : inq,
      ),
    )
    setIsInquiryDialogOpen(false)
  }

  const handleMarkComplete = (inquiryId: string) => handleStatusChange(inquiryId, "completed")

  // if(error){
  //   return <div>Error while fetching orders.....</div>
  // }
  // if(isLoading){
  //   return <div>Loading orders.....</div>
  // }

  return (
    <div className="space-y-6">
      <OrderHeader />
      <StatsGrid stats={inquiryStats} />
      <FiltersBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />
      <InquiriesTable inquiries={filteredInquiries} onAction={handleInquiryAction} onMarkComplete={handleMarkComplete} />
      <InquiryDialog
        open={isInquiryDialogOpen}
        onOpenChange={setIsInquiryDialogOpen}
        actionType={actionType}
        inquiry={selectedInquiry}
        notes={notes}
        onNotesChange={setNotes}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}