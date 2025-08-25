"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, FolderTree, Edit, Trash2, MoreHorizontal, ChevronRight, ChevronDown } from "lucide-react"

// Mock category data with hierarchical structure
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
  const [categories, setCategories] = useState(mockCategories)
  const [expandedCategories, setExpandedCategories] = useState(new Set([1, 2, 3, 4]))
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "0", // Updated default value to be a non-empty string
    isActive: true,
  })

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const handleAddCategory = () => {
    setEditingItem(null)
    setFormData({ name: "", description: "", parentCategory: "0", isActive: true }) // Updated default value to be a non-empty string
    setIsAddDialogOpen(true)
  }

  const handleAddSubcategory = (parentId) => {
    setEditingItem({ type: "subcategory", parentId })
    setFormData({ name: "", description: "", parentCategory: parentId.toString(), isActive: true })
    setIsAddDialogOpen(true)
  }

  const handleEditCategory = (category) => {
    setEditingItem({ type: "category", id: category.id })
    setFormData({
      name: category.name,
      description: category.description || "",
      parentCategory: "0", // Updated default value to be a non-empty string
      isActive: category.isActive,
    })
    setIsAddDialogOpen(true)
  }

  const handleEditSubcategory = (subcategory, parentId) => {
    setEditingItem({ type: "subcategory", id: subcategory.id, parentId })
    setFormData({
      name: subcategory.name,
      description: "",
      parentCategory: parentId.toString(),
      isActive: subcategory.isActive,
    })
    setIsAddDialogOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form data:", formData, "Editing:", editingItem)
    setIsAddDialogOpen(false)
  }

  const handleDelete = (type, id, parentId = null) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      // Handle delete logic here
      console.log(`Delete ${type}:`, id, parentId)
    }
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
            {categories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg">
                {/* Main Category */}
                <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => toggleCategory(category.id)} className="text-gray-400 hover:text-gray-600">
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <Badge variant={category.isActive ? "default" : "secondary"}>
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{category.description}</p>
                      <p className="text-xs text-gray-400">{category.productCount} products</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleAddSubcategory(category.id)}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Sub
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete("category", category.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Subcategories */}
                {expandedCategories.has(category.id) && category.subcategories && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex items-center justify-between p-4 pl-12 border-b border-gray-100 last:border-b-0 hover:bg-gray-100"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-800">{subcategory.name}</h4>
                            <Badge variant={subcategory.isActive ? "default" : "secondary"} className="text-xs">
                              {subcategory.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">{subcategory.productCount} products</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditSubcategory(subcategory, category.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete("subcategory", subcategory.id, category.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? `Edit ${editingItem.type === "category" ? "Category" : "Subcategory"}`
                : formData.parentCategory
                  ? "Add Subcategory"
                  : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description (optional)"
              />
            </div>

            {!editingItem && (
              <div>
                <Label htmlFor="parentCategory">Parent Category</Label>
                <Select
                  value={formData.parentCategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, parentCategory: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None (Main Category)</SelectItem>{" "}
                    {/* Updated value prop to be a non-empty string */}
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingItem ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
