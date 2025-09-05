"use client"

import AddProduct from "@/components/admin-components/product/addModel/addProductForm"
import AddProductHeader from "@/components/admin-components/product/addModel/header"

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <AddProductHeader />
      <AddProduct />
    </div>
  )
}
