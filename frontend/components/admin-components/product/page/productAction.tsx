"use client"

import Link from "next/link"
import { Button } from "@/components/user-components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/user-components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

export default function ProductActions({ productId, onDelete }: { productId: number; onDelete: (id: number) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/admin/products/${productId}`}>
            <Eye className="h-4 w-4 mr-2 hover:text-white" />
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/products/${productId}/edit`}>
            <Edit className="h-4 w-4 mr-2 hover:text-white" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={() => onDelete(productId)}>
          <Trash2 className="h-4 w-4 mr-2 hover:text-white" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
