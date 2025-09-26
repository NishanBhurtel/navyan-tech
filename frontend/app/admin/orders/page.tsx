"use client";
import { useMemo, useState } from "react";
import FiltersBar from "@/components/admin-components/order/filterBar";
import OrderHeader from "@/components/admin-components/order/header";
import InquiriesTable, {
  InquiryAction,
} from "@/components/admin-components/order/inquiriesTable";
import InquiryDialog, {
  DialogAction,
} from "@/components/admin-components/order/inquiryDialog";
import { Inquiry } from "@/components/admin-components/order/order-inqueries";
import { useAllOrders } from "@/hooks/order/getAllOrders";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DataLoading from "@/components/user-components/layout/LoadingPage";

export default function OrderInquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<DialogAction | "">("");

  const { data: ordersResp, isError, isLoading } = useAllOrders();

  const inquiries: Inquiry[] = useMemo(() => {
    if (!ordersResp || !Array.isArray(ordersResp.data)) return [];

    return ordersResp.data.map((o, idx) => ({
      id: o.id,
      customerName: o.customer,
      customerEmail: o.email,
      customerPhone: o.phoneNumber,
      productName: o.productName,
      productPrice: o.amount,
      totalAmount: o.amount,
      quantity: o.quantity,
      createdAt: o.createdAt,
      notes: o?.notes ?? "",
      address: o.address,
      preferredContact: o.contactMethod as "phone" | "email" | "whatsapp",
    }));
  }, [ordersResp]);

  const filteredInquiries = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return inquiries.filter(
      (inq) =>
        inq.customerName.toLowerCase().includes(q) ||
        inq.customerEmail.toLowerCase().includes(q) ||
        inq.id.toLowerCase().includes(q) ||
        inq.productName.toLowerCase().includes(q)
    );
  }, [inquiries, searchTerm]);

  // ✅ Export function
  const handleExport = () => {
    if (filteredInquiries.length === 0) return;


    const data = filteredInquiries.map((order,i) => ({
      "S.N.": String(i+1),
      Customer_Name: order.customerName,
      Customer_Email: order.customerEmail,
      Customer_Phone: order.customerPhone,
      Product_Name: order.productName,
      "Product_Price(Rs)": order.productPrice,
      Quantity: order.quantity,
      "Total_Price(Rs)": order.totalAmount,
      Notes: order.notes,
      Address: order.address,
      Prefered_Contact: order.preferredContact,
      Created_At: order.createdAt,
    }));
    console.log("exporting ",data)

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save file
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Navyan Tech Customer Order Records_${new Date().toISOString()}.xlsx`);
  };

  const handleInquiryAction = (inquiry: Inquiry, action: InquiryAction) => {
    setSelectedInquiry(inquiry);
    setActionType(action);
    setIsInquiryDialogOpen(true);
  };

  if (isError) {
    return <div>Error while fetching orders...</div>;
  }

  if (isLoading) {
    return <DataLoading />
  }

  return (
    <div className="space-y-6">
      <OrderHeader onExport={handleExport} totalOrder ={ordersResp?.data.length} />
      {/* <StatsGrid stats={inquiryStats} /> */}
      <FiltersBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <InquiriesTable
        inquiries={filteredInquiries}
        onAction={handleInquiryAction}
      />
      <InquiryDialog
        open={isInquiryDialogOpen}
        onOpenChange={setIsInquiryDialogOpen}
        actionType={actionType}
        inquiry={selectedInquiry}
      />
    </div>
  );
}
