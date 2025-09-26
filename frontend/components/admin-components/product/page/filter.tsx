"use client";

import { Card, CardContent } from "@/components/user-components/ui/card";
import { Input } from "@/components/user-components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user-components/ui/select";
import { Search } from "lucide-react";
import { useCategories } from "@/hooks/categories/getCategories";
import { useState, useEffect } from "react";

interface FiltersProps {
  onChange: (filters: { search: string; category: string; subCategory: string }) => void;
}

export default function Filters({ onChange }: FiltersProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");

  // notify parent when filters change
  useEffect(() => {
    onChange({ search: searchTerm, category: categoryFilter, subCategory: subCategoryFilter });
  }, [searchTerm, categoryFilter, subCategoryFilter]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {!categoriesLoading &&
                categories.map((cat: any) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Subcategory Filter */}
          <Select value={subCategoryFilter} onValueChange={setSubCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select Subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subcategories</SelectItem>
              {!categoriesLoading &&
                categories
                  .find((cat: any) => cat._id === categoryFilter)
                  ?.subCategories?.map((sub: any) => (
                    <SelectItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
