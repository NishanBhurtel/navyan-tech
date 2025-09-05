"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/user-components/ui/card"
import { Input } from "@/components/user-components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/user-components/ui/select"
import { Search } from "lucide-react"

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

export default function Filters(){
      const [searchTerm, setSearchTerm] = useState("")
      const [categoryFilter, setCategoryFilter] = useState("all")
      const [subCategoryFilter, setSubCategoryFilter] = useState("all");
    
      const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
        const matchesSUbCategory = subCategoryFilter === "all" || product.subcategory === subCategoryFilter
    
        return matchesSearch && matchesCategory && matchesSUbCategory
      })
    return(
           <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Computers">Computers</SelectItem>
                <SelectItem value="Components">Components</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subCategoryFilter} onValueChange={setSubCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    )
}