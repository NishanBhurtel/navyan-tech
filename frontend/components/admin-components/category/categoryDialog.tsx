"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/user-components/ui/dialog"
import { Label } from "@/components/user-components/ui/label"
import { Input } from "@/components/user-components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/user-components/ui/select"
import { FormData, Category } from "./types"

interface CategoryDialogProps {
  open: boolean
  formData: FormData
  categories: Category[]
  editingItem: any
  onClose: (open: boolean) => void
  onChange: (data: Partial<FormData>) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function CategoryDialog({
  open,
  formData,
  categories,
  editingItem,
  onClose,
  onChange,
  onSubmit,
}: CategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingItem
              ? `Edit ${editingItem.type === "category" ? "Category" : "Subcategory"}`
              : formData.parentCategory !== "0"
              ? "Add Subcategory"
              : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input className="my-2"
              id="name"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input className="my-2"
              id="description"
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Enter description (optional)"
            />
          </div>

          {!editingItem && (
            <div>
              <Label htmlFor="parentCategory">Parent Category</Label>
              <Select value={formData.parentCategory} onValueChange={(value) => onChange({ parentCategory: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None (Main Category)</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
