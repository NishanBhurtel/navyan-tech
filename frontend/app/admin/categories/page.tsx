"use client"

import { useState } from "react"
import { Plus, FolderTree } from "lucide-react"
import { Button } from "@/components/user-components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card"
import { Category, FormData } from "@/components/admin-components/category/types"
import CategoryCard from "@/components/admin-components/category/categoryCard"
import CategoryDialog from "@/components/admin-components/category/categoryDialog"

// Mock categories
const mockCategories = [
  {
    id: 1,
    name: "Computers",
    slug: "computers",
    description: "Desktop computers and workstations",
    productCount: 45,
    isActive: true,
    subcategories: [
      { id: 11, name: "Gaming Desktop", slug: "gaming-desktop", productCount: 15, isActive: true },
      { id: 12, name: "Mini PC", slug: "mini-pc", productCount: 8, isActive: true },
      { id: 13, name: "All-in-One", slug: "all-in-one", productCount: 12, isActive: true },
      { id: 14, name: "Workstations", slug: "workstations", productCount: 10, isActive: true },
    ],
  },
  {
    id: 2,
    name: "Laptops",
    slug: "laptops",
    description: "Portable computers and notebooks",
    productCount: 67,
    isActive: true,
    subcategories: [
      { id: 21, name: "Gaming Laptops", slug: "gaming-laptops", productCount: 25, isActive: true },
      { id: 22, name: "MacBook", slug: "macbook", productCount: 12, isActive: true },
      { id: 23, name: "Ultrabooks", slug: "ultrabooks", productCount: 18, isActive: true },
      { id: 24, name: "Business Laptops", slug: "business-laptops", productCount: 12, isActive: true },
    ],
  },
  {
    id: 3,
    name: "Components",
    slug: "components",
    description: "Computer parts and components",
    productCount: 156,
    isActive: true,
    subcategories: [
      { id: 31, name: "Processors", slug: "processors", productCount: 28, isActive: true },
      { id: 32, name: "Graphics Cards", slug: "graphics-cards", productCount: 35, isActive: true },
      { id: 33, name: "Motherboards", slug: "motherboards", productCount: 42, isActive: true },
      { id: 34, name: "RAM", slug: "ram", productCount: 31, isActive: true },
      { id: 35, name: "Storage", slug: "storage", productCount: 20, isActive: true },
    ],
  },
  {
    id: 4,
    name: "Accessories",
    slug: "accessories",
    description: "Computer accessories and peripherals",
    productCount: 89,
    isActive: true,
    subcategories: [
      { id: 41, name: "Keyboards", slug: "keyboards", productCount: 25, isActive: true },
      { id: 42, name: "Mice", slug: "mice", productCount: 22, isActive: true },
      { id: 43, name: "Monitors", slug: "monitors", productCount: 28, isActive: true },
      { id: 44, name: "Speakers", slug: "speakers", productCount: 14, isActive: true },
    ],
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [expandedCategories, setExpandedCategories] = useState(new Set([1, 2, 3, 4]))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    parentCategory: "0",
    isActive: true,
  })

  const toggleCategory = (id: number) => {
    const newExpanded = new Set(expandedCategories)
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id)
    setExpandedCategories(newExpanded)
  }

  const handleAddCategory = () => {
    setEditingItem(null)
    setFormData({ name: "", description: "", parentCategory: "0", isActive: true })
    setIsDialogOpen(true)
  }

  const handleAddSubcategory = (parentId: number) => {
    setEditingItem({ type: "subcategory", parentId })
    setFormData({ name: "", description: "", parentCategory: parentId.toString(), isActive: true })
    setIsDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingItem({ type: "category", id: category.id })
    setFormData({
      name: category.name,
      description: category.description || "",
      parentCategory: "0",
      isActive: category.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleEditSubcategory = (subcategory: any, parentId: number) => {
    setEditingItem({ type: "subcategory", id: subcategory.id, parentId })
    setFormData({
      name: subcategory.name,
      description: "",
      parentCategory: parentId.toString(),
      isActive: subcategory.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (type: "category" | "subcategory", id: number, parentId?: number) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      console.log(`Delete ${type}:`, id, parentId)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData, "Editing:", editingItem)
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Manage product categories and subcategories</p>
        </div>
        <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Tree */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderTree className="h-5 w-5 mr-2" />
            Category Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                expanded={expandedCategories.has(cat.id)}
                onToggle={toggleCategory}
                onAddSub={handleAddSubcategory}
                onEdit={handleEditCategory}
                onEditSub={handleEditSubcategory}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <CategoryDialog
        open={isDialogOpen}
        onClose={setIsDialogOpen}
        formData={formData}
        categories={categories}
        editingItem={editingItem}
        onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

