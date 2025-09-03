// components/admin-components/category/SubcategoryItem.tsx
"use client";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/user-components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/user-components/ui/dropdown-menu";

interface SubcategoryItemProps {
  subcategory: {
    _id: string;
    name: string;
    description: string;
  };
  parentId: string;
  onEdit: (subcategory: any, parentId: string) => void;
  onDelete: (type: "category" | "subcategory", id: string) => void;
}

export default function SubcategoryItem({
  subcategory,
  parentId,
  onEdit,
  onDelete,
}: SubcategoryItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-100/50">
      {/* Subcategory Info */}
      <div className="flex items-center space-x-3 flex-1">
        {/* Indentation */}
        <div className="w-6 flex justify-center">
          <div className="w-px h-4 bg-gray-300"></div>
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-gray-800">{subcategory.name}</h4>
          {subcategory.description && (
            <p className="text-sm text-gray-600 mt-1">
              {subcategory.description}
            </p>
          )}
        </div>
      </div>

      {/* Action Dropdown */}
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
            onClick={() => onDelete("subcategory", subcategory._id)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
