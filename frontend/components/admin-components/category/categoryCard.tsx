// "use client"

// import { ChevronDown, ChevronRight, Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react"
// import { Category } from "./types"
// import { Button } from "@/components/user-components/ui/button"
// import { Badge } from "@/components/user-components/ui/badge"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/user-components/ui/dropdown-menu"
// import SubcategoryItem from "./subCategoryItems"

// interface CategoryCardProps {
//   category: Category
//   expanded: boolean
//   onToggle: (id: number) => void
//   onAddSub: (parentId: number) => void
//   onEdit: (category: Category) => void
//   onEditSub: (subcategory: any, parentId: number) => void
//   onDelete: (type: "category" | "subcategory", id: number, parentId?: number) => void
// }

// export default function CategoryCard({
//   category,
//   expanded,
//   onToggle,
//   onAddSub,
//   onEdit,
//   onEditSub,
//   onDelete,
// }: CategoryCardProps) {
//   return (
//     <div className="border border-gray-200 rounded-lg">
//       {/* Main Category */}
//       <div className="flex items-center justify-between p-4 hover:bg-gray-50">
//         <div className="flex items-center space-x-3">
//           <button onClick={() => onToggle(category.id)} className="text-gray-400 hover:text-gray-600">
//             {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//           </button>
//           <div>
//             <div className="flex items-center space-x-2">
//               <h3 className="font-semibold text-gray-900">{category.name}</h3>
//               <Badge variant={category.isActive ? "default" : "secondary"}>
//                 {category.isActive ? "Active" : "Inactive"}
//               </Badge>
//             </div>
//             <p className="text-sm text-gray-500">{category.description}</p>
//             <p className="text-xs text-gray-400">{category.productCount} products</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" size="sm" onClick={() => onAddSub(category.id)}>
//             <Plus className="h-3 w-3 mr-1" />
//             Add Sub
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="sm">
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => onEdit(category)}>
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => onDelete("category", category.id)} className="text-red-600">
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Subcategories */}
//       {expanded && category.subcategories && (
//         <div className="border-t border-gray-200 bg-gray-50">
//           {category.subcategories.map((sub) => (
//             <SubcategoryItem
//               key={sub.id}
//               subcategory={sub}
//               parentId={category.id}
//               onEdit={onEditSub}
//               onDelete={onDelete}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// components/admin-components/category/CategoryCard.tsx
"use client";

import {
  ChevronDown,
  ChevronRight,
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { Category } from "./types";
import { Button } from "@/components/user-components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/user-components/ui/dropdown-menu";
import SubcategoryItem from "./SubcategoryItem";

interface CategoryCardProps {
  category: Category;
  expanded: boolean;
  onToggle: (id: string) => void;
  onAddSub: (parentId: string) => void;
  onEdit: (category: Category) => void;
  onEditSub: (subcategory: any, parentId: string) => void;
  onDelete: (type: "category" | "subcategory", id: string) => void;
}

export default function CategoryCard({
  category,
  expanded,
  onToggle,
  onAddSub,
  onEdit,
  onEditSub,
  onDelete,
}: CategoryCardProps) {
  // const hasSubcategories = category.subcategories?.length > 0;
  const hasSubcategories = (category.subCategories?.length ?? 0) > 0;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Main Category */}
      <div className="flex items-center justify-between p-4 hover:bg-gray-50">
        <div className="flex items-center space-x-3 flex-1">
          {/* Toggle Button */}
          <button
            onClick={() => onToggle(category._id)}
            className="text-gray-400 hover:text-gray-600"
            disabled={!hasSubcategories}
          >
            {hasSubcategories ? (
              expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>

          {/* Category Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            {category.description && (
              <p className="text-sm text-gray-600 mt-1">
                {category.description}
              </p>
            )}
            {/* {hasSubcategories && (
              <p className="text-xs text-gray-500 mt-1">
                {category.subcategories.length} subcategories
              </p>
            )} */}
            {hasSubcategories && (
              <p className="text-xs text-gray-500 mt-1">
                {category.subCategories?.length ?? 0} subcategories
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddSub(category._id)}
            className="hover:bg-green-50"
          >
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
              <DropdownMenuItem onClick={() => onEdit(category)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete("category", category._id)}
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
      {expanded && hasSubcategories && (
        <div className="border-t border-gray-200 bg-gray-50/50">
          {expanded && hasSubcategories && (
            <div className="border-t border-gray-200 bg-gray-50/50">
              {category.subCategories?.map((subcategory) => (
                <SubcategoryItem
                  key={subcategory._id}
                  subcategory={subcategory}
                  parentId={category._id}
                  onEdit={onEditSub}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty Subcategory State */}
      {expanded && !hasSubcategories && (
        <div className="border-t border-gray-200 bg-gray-50/30 px-4 py-6 text-center">
          <p className="text-sm text-gray-500 mb-3">No subcategories yet</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddSub(category._id)}
            className="hover:bg-green-50"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add First Subcategory
          </Button>
        </div>
      )}
    </div>
  );
}
