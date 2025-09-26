"use client";

import Filters from "@/components/admin-components/product/page/filter";
import ProductHeader from "@/components/admin-components/product/page/header";
import ProductTable from "@/components/admin-components/product/page/productTable";
import { Button } from "@/components/user-components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/user-components/ui/card";
import { Download } from "lucide-react";
import { useDeleteProduct } from "@/hooks/product/removeProduct";
import { useState } from "react";
import { IProduct } from "@/lib/utils/types/product.type";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ConfirmDialog from "@/lib/confirmModel";
import { useProductStatus } from "@/hooks/product/setProductStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { productApi } from "@/lib/api/product.api";
import { useDeleteImages } from "@/hooks/images/useDeleteFirebaseImage";

export default function ProductsPage() {
  const { mutate: deleteProduct } = useDeleteProduct();
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    subCategory: "all",
  });

  const [page, setPage] = useState(1);
  const limit = 9;

  const { data } = useAllProducts({
    page,
    limit,
    search: filters.search,
    filter: {
      categoryID: filters.category !== "all" ? filters.category : undefined,
      subCategoryID:
        filters.subCategory !== "all" ? filters.subCategory : undefined,
    },
  });

  const products: IProduct[] = data?.data || [];
  const pagination = data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
    limit,
  };

  const [itemToRemove, setItemToRemove] = useState<IProduct | null>(null);
  const [itemToActive, setItemToActive] = useState<{
    id: string;
    isActive: boolean;
  } | null>(null);

  const queryClient = useQueryClient();
  const { deleteImages } = useDeleteImages();
  const { mutate: setProductStatus } = useProductStatus();

  const handleRemoveClick = (id: IProduct) => {
    setItemToRemove(id);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      deleteProduct(itemToRemove._id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["searchProducts"] });
          // Delete associated images from Firebase Storage
          if (itemToRemove.images && itemToRemove.images.length > 0) {
            deleteImages(itemToRemove.images || []);
          }
        },
      });
      setItemToRemove(null);
    }
  };

  const handleActiveClick = (id: string, isActive: boolean) => {
    setItemToActive({ id, isActive });
  };

  const confirmActive = () => {
    if (itemToActive) {
      setProductStatus(itemToActive, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["searchProducts"] });
          setItemToActive(null);
        },
      });
    }
  };

  const handleExport = async () => {
    try {
      const res = await productApi.getAllProductsApi({
        page: 1,
        limit: pagination?.total,
        search: filters.search,
        filter: {
          categoryID: filters.category !== "all" ? filters.category : undefined,
          subCategoryID:
            filters.subCategory !== "all" ? filters.subCategory : undefined,
        },
      });

      const allProducts = res.data;

      if (!allProducts.length) return;

      const data = allProducts.map((product: any, i) => ({
        "S.N.": String(i + 1),
        Name: product.name,
        Brand: product.brand,
        Category: product.categoryID?.name || "",
        Sub_Category: product.subCategoryID?.name || "",
        Original_Price: product.originalPrice,
        Discounted_Price: product.discountedPrice,
        Stock: product.stock,
        Description: product.description || "",
        Specifications: product.specifications
          .map((spec: any) => `${spec.key}: ${spec.value}`)
          .join("; "),
        CreatedAt: product.createdAt
          ? new Date(product.createdAt).toLocaleString()
          : "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(
        blob,
        `Navyan Tech Product Records_${new Date().toISOString()}.xlsx`
      );
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProductHeader totalProducts ={products.length} />

      {/* Filters */}
      <Filters
        onChange={(newFilters) => {
          setFilters(newFilters);
          setPage(1); // reset to page 1 when filters change
        }}
      />

      {/* Products Table */}
      <Card>
        <div className="my-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTable
            currentPageNo= {page}
              products={products}
              onDelete={handleRemoveClick}
              onSetActive={handleActiveClick}
            />

            {/* Pagination */}
            {products.length > 0 ? (
              <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </Button>

                {Array.from({ length: pagination.totalPages }, (_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-muted-foreground">
                  No products found for your search!
                </h3>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={itemToRemove !== null}
        title="Remove Product"
        message="Are you sure you want to remove this product?"
        onConfirm={confirmRemove}
        onCancel={() => setItemToRemove(null)}
      />
      <ConfirmDialog
        open={itemToActive !== null}
        title="Change Product Status"
        message="Are you sure you want to change the current status of this product?"
        onConfirm={confirmActive}
        onCancel={() => setItemToActive(null)}
      />
    </div>
  );
}
