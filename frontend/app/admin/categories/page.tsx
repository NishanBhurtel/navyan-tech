"use client";
import { useState } from "react";
import { Plus, FolderTree, Loader2 } from "lucide-react";
import { Button } from "@/components/user-components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";
import {
  Category,
  FormData,
} from "../../../components/admin-components/category/types";
import CategoryCard from "../../../components/admin-components/category/categoryCard";
import CategoryDialog from "../../../components/admin-components/category/categoryDialog";
import {useCategories, useCategoryMutations, useSubcategoryMutations } from "@/hooks/categories/getCategories";

export default function CategoriesPage() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    parentCategory: "0",
  });

  // Hooks
  const { data: categories = [], isLoading, error, refetch } = useCategories();
  const categoryMutations = useCategoryMutations();
  const subcategoryMutations = useSubcategoryMutations();

  const isSubmitting =
    categoryMutations.isLoading || subcategoryMutations.isLoading;

  // Individual toggle for each category
  const toggleCategory = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", parentCategory: "0" });
    setEditingItem(null);
  };

  const handleAddCategory = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleAddSubcategory = (parentId: string) => {
    // setEditingItem({ type: "subcategory", parentId });
    setFormData({
      name: "",
      description: "",
      parentCategory: parentId.toString(),
    });
    setIsDialogOpen(true);

    // Auto-expand parent category
    if (!expandedCategories.has(parentId)) {
      toggleCategory(parentId);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingItem({ type: "category", id: category._id });
    setFormData({
      name: category.name,
      description: category.description || "",
      parentCategory: category.parentCategory || "0",
    });
    setIsDialogOpen(true);
  };

  const handleEditSubcategory = (subcategory: any, parentId: string) => {
    setEditingItem({ type: "subcategory", id: subcategory.id, parentId });
    console.log(subcategory);
    console.log(parentId);
    setFormData({
      name: subcategory.name,
      description: subcategory.description || "",
      parentCategory: parentId.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (type: "category" | "subcategory", id: string) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "category") {
        categoryMutations.deleteCategory.mutate(id);
      } else {
        subcategoryMutations.deleteSubcategory.mutate(id);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData, "Editing:", editingItem);
    if (!formData.name.trim()) return;

    const submitData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
    };

    if (editingItem) {
      // Editing
      if (editingItem.type === "category") {
        categoryMutations.updateCategory.mutate({
          id: editingItem.id,
          data: submitData,
        });
      } else {
        subcategoryMutations.updateSubcategory.mutate({
          id: editingItem.id,
          data: submitData,
        });
      }
    } else {
      // Creating
      if (formData.parentCategory !== "0") {
        // Create subcategory
        subcategoryMutations.createSubcategory.mutate({
          ...submitData,
          parentCategoryId: formData.parentCategory,
        });
      } else {
        // Create category
        categoryMutations.createCategory.mutate(submitData);
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && !isSubmitting) {
      setIsDialogOpen(false);
      resetForm();
    }
  };

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading categories</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Categories
          </h1>
          <p className="text-gray-600 mt-2">
            Manage categories and subcategories
          </p>
        </div>
        <Button
          onClick={handleAddCategory}
          className="bg-green-600 hover:bg-green-700"
          disabled={isSubmitting}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderTree className="h-5 w-5 mr-2" />
            Categories ({categories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length == 0 ? (
            <div className="text-center py-12">
              <FolderTree className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No categories yet</h3>
              <p className="text-gray-500 mb-6">
                Create your first category to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  expanded={expandedCategories.has(category._id)}
                  onToggle={toggleCategory}
                  onAddSub={handleAddSubcategory}
                  onEdit={handleEditCategory}
                  onEditSub={handleEditSubcategory}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <CategoryDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        formData={formData}
        categories={categories}
        editingItem={editingItem}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
