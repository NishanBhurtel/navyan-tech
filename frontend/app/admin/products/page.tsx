"use client"

import Filters from "@/components/admin-components/product/page/filter"
import ProductHeader from "@/components/admin-components/product/page/header"
import ProductTable from "@/components/admin-components/product/page/productTable"
import { Button } from "@/components/user-components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card"
import { Filter } from "lucide-react"
import { useState } from "react"

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "ASUS ROG Strix Gaming Laptop",
    sku: "ASUS-ROG-001",
    category: "Laptops",
    subcategory: "Gaming Laptops",
    price: 89999,
    stock: 15,
    status: "active",
    images: ["/placeholder.svg?height=60&width=60"],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "MSI Gaming Desktop RTX 4080",
    sku: "MSI-DESK-002",
    category: "Computers",
    subcategory: "Gaming Desktop",
    price: 125000,
    stock: 8,
    status: "active",
    images: ["/placeholder.svg?height=60&width=60"],
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    name: "MacBook Pro M3 16-inch",
    sku: "APPLE-MBP-003",
    category: "Laptops",
    subcategory: "MacBook",
    price: 199999,
    stock: 0,
    status: "inactive",
    images: ["/placeholder.svg?height=60&width=60"],
    createdAt: "2024-01-13",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDelete = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product:", productId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProductHeader />

      {/* Filters */}
      <Filters />

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Products ({filteredProducts.length})</span>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable products={filteredProducts} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  )
}
