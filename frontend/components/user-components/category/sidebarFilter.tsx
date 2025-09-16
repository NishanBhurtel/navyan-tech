"use client";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";
import { Filter } from "lucide-react";
import { useCategories } from "@/hooks/categories/getCategories";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";

type ProductGridProps = {
  products: any[];
};

export default function SidebarFilter({ products }: ProductGridProps) {
  const { data: categories, isLoading, error } = useCategories();
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search");
  const categoryID = searchParams.get("categoryID");
  const subCategoryID = searchParams.get("subCategoryID");
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "300000";
  const brand = searchParams.get("brand") || "";

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/search?${params.toString()}`);
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!categories) return <>Loading</>;

  // --- Collect subcategory counts dynamically ---
  const subCategoryCounts: Record<string, number> = {};
  products?.forEach((p) => {
    if (p.subCategoryID?._id) {
      subCategoryCounts[p.subCategoryID._id] =
        (subCategoryCounts[p.subCategoryID._id] || 0) + 1;
    }
  });

  // --- Collect brand counts dynamically ---
  const brandCounts: Record<string, number> = {};
  products?.forEach((p: any) => {
    if (p.brand) brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });
  const brands = Object.entries(brandCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // --- Category/subCategory filtering logic ---
const searchedCategory = categories?.find(
  (cat) => cat._id === categoryID
);


const categoriesRelatedToSearchQuery = categories.filter((cat) => {
  if (search) {
    const regex = new RegExp(search, "i");
    return regex.test(cat.name) || regex.test(cat.description || "");
  }
  return false;
});


  const isSearchedByCategory = categoryID || subCategoryID;
  const shouldDisplaySearchCategoryFilter =
    isSearchedByCategory && searchedCategory;
  const shouldDisplaySearchRelatedCategories =
    search && categoriesRelatedToSearchQuery.length > 0;

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-32 space-y-6">
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Filters
              </h2>
            </div>

            {/* Subcategories if searched by category */}
            {shouldDisplaySearchCategoryFilter && (
              <div key={searchedCategory._id} className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  {searchedCategory.name}
                </h3>
                <div className="space-y-3">
                  {searchedCategory.subCategories?.map((sub: any) => {
                    const count = subCategoryCounts[sub._id] || 0;
                    const isChecked = sub._id === subCategoryID;
                    return (
                      <div
                        key={sub._id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={sub._id}
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            updateQuery(
                              "subCategoryID",
                              checked ? sub._id : null
                            )
                          }
                        />
                        <label
                          htmlFor={sub._id}
                          className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                        >
                          <span>{sub.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({count})
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
                <Separator className="my-6" />
              </div>
            )}

            {/* Categories related to search query */}
            {shouldDisplaySearchRelatedCategories &&
              categoriesRelatedToSearchQuery.map((cat) => (
                <div key={cat._id} className="space-y-4">
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <div className="space-y-3">
                    {cat.subCategories?.map((sub: any) => {
                      const count = subCategoryCounts[sub._id] || 0;
                      const isChecked = sub._id === subCategoryID;
                      return (
                        <div
                          key={sub._id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={sub._id}
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              updateQuery(
                                "subCategoryID",
                                checked ? sub._id : null
                              )
                            }
                          />
                          <label
                            htmlFor={sub._id}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{sub.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({count})
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="my-6" />
                </div>
              ))}

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[+minPrice, +maxPrice]}
                  max={3000}
                  min={0}
                  step={100}
                  className="w-full"
                  onValueChange={(val) => {
                    updateQuery("minPrice", val[0].toString());
                    updateQuery("maxPrice", val[1].toString());
                  }}
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Rs.{minPrice}</span>
                  <span>Rs.{maxPrice}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Brands */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Brands</h3>
              <div className="space-y-3">
                {brands.map((b) => (
                  <div key={b.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={b.name}
                      checked={brand === b.name}
                      onCheckedChange={(checked) =>
                        updateQuery("brand", checked ? b.name : null)
                      }
                    />
                    <label
                      htmlFor={b.name}
                      className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                    >
                      <span>{b.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({b.count})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Clear All */}
            <Button
              variant="outline"
              className="w-full mt-2 bg-transparent"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                const baseSearch = search;
                const baseCategoryID = categoryID;
                const baseSubCategoryID = subCategoryID;

                // --- Remove filter-only params ---
                params.delete("minPrice");
                params.delete("maxPrice");
                params.delete("brand");

                params.set("subCategoryID", baseSubCategoryID || "");

                // Make sure to keep search & category info
                if (baseSearch) params.set("search", baseSearch);
                if (baseCategoryID) params.set("categoryID", baseCategoryID);
                if (baseSubCategoryID)
                  params.set("subCategoryID", baseSubCategoryID);

                router.push(`/search?${params.toString()}`);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
