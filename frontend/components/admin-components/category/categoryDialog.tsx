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
import { Loader2 } from "lucide-react";
import { FormData, Category } from "./types";
import { DialogDescription } from "@radix-ui/react-dialog";

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
              value={formData.description||""}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Enter description (optional)"
              disabled={isSubmitting}
              rows={4}
              className="w-full resize-none"
            />
          </div>

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
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
