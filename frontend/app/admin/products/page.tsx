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
import { Filter } from "lucide-react";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { useDeleteProduct } from "@/hooks/product/removeProduct";

export default function ProductsPage() {
  const { data: product, isLoading, isError } = useAllProducts();

  const { mutate: deleteProduct } = useDeleteProduct();
  

  if (isLoading)
    return <div className="p-12 text-center">Loading product...</div>;
  if (isError || !product)
    return <div className="p-12 text-center">Product Not Found</div>;

  const removeProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProductHeader />

      {/* Filters */}
      <Filters />

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={product}
            onDelete={(id) => removeProduct(id)}
          />{" "}
        </CardContent>
      </Card>
    </div>
  );
}
