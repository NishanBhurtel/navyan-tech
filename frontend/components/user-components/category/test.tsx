"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Filter } from "lucide-react";
import { useCategories } from "@/hooks/categories/getCategories";

type ProductGridProps = {
  products: any[];
  // Parent will listen to changes via searchParams or re-render automatically via server component
};

export default function SidebarFilter({ products }: ProductGridProps) {
  const { data: categories, isLoading, error } = useCategories();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (!categories || isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categoryID = searchParams.get("categoryID");
  const subCategoryID = searchParams.get("subCategoryID");

  const searchedCategory = categories.find(
    (cat) =>
      cat._id === categoryID ||
      cat.subCategories?.some((sub) => sub._id === subCategoryID)
  );

  const shouldDisplayCategory = Boolean(searchedCategory);

  // Handler to update URL
  const handleSubcategoryToggle = useCallback(
    (subId: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Toggle: set or delete param
      if (subCategoryID === subId) {
        params.delete("subCategoryID");
      } else {
        params.set("categoryID", searchedCategory!._id);
        params.set("subCategoryID", subId);
      }

      router.push(pathname + "?" + params.toString());
    },
    [searchParams, searchParams.toString(), subCategoryID, searchedCategory, router, pathname]
  );

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-32 space-y-6">
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold font-serif text-foreground">Filters</h2>
            </div>

            {shouldDisplayCategory && (
              <div key={searchedCategory!._id} className="space-y-4">
                <h3 className="font-semibold text-foreground">{searchedCategory!.name}</h3>
                <div className="space-y-3">
                  {searchedCategory!.subCategories?.map((sub: any) => (
                    <div key={sub._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={sub._id}
                        checked={subCategoryID === sub._id}
                        onCheckedChange={() => handleSubcategoryToggle(sub._id)}
                      />
                      <label
                        htmlFor={sub._id}
                        className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                      >
                        <span>{sub.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({sub.productCount ?? 0})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
              </div>
            )}

            {/* Additional filters like Price, Brand can be added similarly */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
