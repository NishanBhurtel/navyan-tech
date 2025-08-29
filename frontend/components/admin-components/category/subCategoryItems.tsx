"use client"

import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Subcategory } from "./types"
import { Button } from "@/components/user-components/ui/button"
import { Badge } from "@/components/user-components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/user-components/ui/dropdown-menu"

interface SubcategoryItemProps {
  subcategory: Subcategory
  parentId: number
  onEdit: (subcategory: Subcategory, parentId: number) => void
  onDelete: (type: "subcategory", id: number, parentId: number) => void
}

export default function SubcategoryItem({ subcategory, parentId, onEdit, onDelete }: SubcategoryItemProps) {
  return (
    <div className="flex items-center justify-between p-4 pl-12 border-b border-gray-100 last:border-b-0 hover:bg-gray-100">
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
          <DropdownMenuItem onClick={() => onEdit(subcategory, parentId)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete("subcategory", subcategory.id, parentId)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
