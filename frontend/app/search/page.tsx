"use client";
import Pagination from "@/components/user-components/category/pagination";
import ProductGrid from "@/components/user-components/category/productGrid";
import SidebarFilter from "@/components/user-components/category/sidebarFilter";
import SortByFeatured from "@/components/user-components/category/sortByFeatured";
import Annoucement from "@/components/user-components/layout/Annoucement";
import ErrorState from "@/components/user-components/layout/ErrorPage";
import Footer from "@/components/user-components/layout/Footer";
import DataLoading from "@/components/user-components/layout/LoadingPage";
import Navbar from "@/components/user-components/layout/Navbar";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const categoryID = searchParams.get("categoryID");
  const subCategoryID = searchParams.get("subCategoryID");

  // 🔑 include page + limit in query
  const { isLoading, isError, data } = useAllProducts({
    search: search || undefined,
    filter: {
      brand: brand || undefined,
      categoryID: categoryID || undefined,
      subCategoryID: subCategoryID || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    },
    page: currentPage, // ✅ works now
    limit: 10,
  });

  const products = data?.data || [];
  const pagination = data?.pagination;

  // keep total pages in sync with API response
  useEffect(() => {
    if (pagination?.totalPages) {
      setTotalPages(pagination.totalPages);
    }
  }, [pagination]);

  if (isLoading) return <DataLoading />;
  if (isError || !data || products.length === 0) return <ErrorState />;

  return (
    <div className="min-h-screen bg-background">
      <Annoucement />
      <Navbar />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
          {/* Sidebar Filters */}
          <div className="md:col-span-4 lg:col-span-1">
            <SidebarFilter products={products} />
          </div>

          {/* Products Section */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="space-y-6">
              <SortByFeatured products={products} />
              <ProductGrid products={products} />

              {/* ✅ Hook up pagination */}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                maxLimit={10}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
