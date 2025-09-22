"use client";
import Pagination from "@/components/user-components/category/pagination";
import ProductGrid from "@/components/user-components/category/productGrid";
import SidebarFilter from "@/components/user-components/category/sidebarFilter";
import SortByFeatured from "@/components/user-components/category/sortByFeatured";
import Annoucement from "@/components/user-components/layout/Annoucement";
import Footer from "@/components/user-components/layout/Footer";
import Navbar from "@/components/user-components/layout/Navbar";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { useSearchParams } from "next/navigation";

export default function CategoryPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const categoryID = searchParams.get("categoryID");
  const subCategoryID = searchParams.get("subCategoryID");


  const {
    isLoading,
    isError,
    data
  } = useAllProducts({

    search: search || undefined,
    filter: {
      brand: brand || undefined,
      categoryID: categoryID || undefined,
      subCategoryID: subCategoryID || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    },
  });

  const products = data?.data || [];

  if (isLoading)
    return <div className="p-12 text-center">Loading product...</div>;

  if (isError || !data || products.length === 0)
    return <div className="p-12 text-center">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <Annoucement />

      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <div
          className="grid gap-8 grid-cols-1 md:grid-cols-4"
        >
          {/* Sidebar Filters */}
          <div className="md:col-span-4 lg:col-span-1">
            <SidebarFilter products={products} />
          </div>

          {/* Products Section */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="space-y-6">
              {/* Sort by featured */}
              <SortByFeatured products={products} />

              {/* Products Grid */}
              <ProductGrid products={products} />

              {/* Pagination */}
              <Pagination />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
