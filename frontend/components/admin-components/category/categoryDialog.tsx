// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/user-components/ui/dialog"
// import { Label } from "@/components/user-components/ui/label"
// import { Input } from "@/components/user-components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/user-components/ui/select"
// import { FormData, Category } from "./types"

// interface CategoryDialogProps {
//   open: boolean
//   formData: FormData
//   categories: Category[]
//   editingItem: any
//   onClose: (open: boolean) => void
//   onChange: (data: Partial<FormData>) => void
//   onSubmit: (e: React.FormEvent) => void
// }

// export default function CategoryDialog({
//   open,
//   formData,
//   categories,
//   editingItem,
//   onClose,
//   onChange,
//   onSubmit,
// }: CategoryDialogProps) {
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {editingItem
//               ? `Edit ${editingItem.type === "category" ? "Category" : "Subcategory"}`
//               : formData.parentCategory !== "0"
//               ? "Add Subcategory"
//               : "Add Category"}
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={onSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="name">Name *</Label>
//             <Input className="my-2"
//               id="name"
//               value={formData.name}
//               onChange={(e) => onChange({ name: e.target.value })}
//               placeholder="Enter category name"
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Input className="my-2"
//               id="description"
//               value={formData.description}
//               onChange={(e) => onChange({ description: e.target.value })}
//               placeholder="Enter description (optional)"
//             />
//           </div>

//           {!editingItem && (
//             <div>
//               <Label htmlFor="parentCategory">Parent Category</Label>
//               <Select value={formData.parentCategory} onValueChange={(value) => onChange({ parentCategory: value })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select parent category (optional)" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0">None (Main Category)</SelectItem>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id.toString()}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           )}
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// // components/admin-components/category/CategoryDialog.tsx
// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/user-components/ui/dialog";
// import { Label } from "@/components/user-components/ui/label";
// import { Input } from "@/components/user-components/ui/input";
// import { Textarea } from "@/components/user-components/ui/textarea";
// import { Button } from "@/components/user-components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/user-components/ui/select";
// import { Loader2 } from "lucide-react";
// import { FormData, Category } from "./types";

// components/admin-components/category/CategoryDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/user-components/ui/dialog";
import { Label } from "@/components/user-components/ui/label";
import { Input } from "@/components/user-components/ui/input";
import { Textarea } from "@/components/user-components/ui/textarea";
import { Button } from "@/components/user-components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user-components/ui/select";
import { Loader2 } from "lucide-react";
import { FormData, Category } from "./types";

interface CategoryDialogProps {
  open: boolean;
  formData: FormData;
  categories: Category[];
  editingItem: any;
  isSubmitting?: boolean;
  onClose: (open: boolean) => void;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CategoryDialog({
  open,
  formData,
  categories,
  editingItem,
  isSubmitting = false,
  onClose,
  onChange,
  onSubmit,
}: CategoryDialogProps) {
  const isEditing = !!editingItem;
  const isSubcategory = formData.parentCategory !== "0";

  const getDialogTitle = () => {
    if (isEditing) {
      return `Edit ${
        editingItem.type === "category" ? "Category" : "Subcategory"
      }`;
    }
    return isSubcategory ? "Add Subcategory" : "Add Category";
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Enter name"
              disabled={isSubmitting}
              required
              className="w-full"
              autoFocus
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Enter description (optional)"
              disabled={isSubmitting}
              rows={4}
              className="w-full resize-none"
            />
          </div>

          {/* Parent Category - Only for new items */}
          {!isEditing && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Type</Label>
              <Select
                value={formData.parentCategory}
                onValueChange={(value) => onChange({ parentCategory: value })}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Main Category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id.toString()}>
                      Subcategory of "{cat.name}"
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditing ? "Update" : "Create"}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
