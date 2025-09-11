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
import { useDeleteProduct } from "@/hooks/product/removeProduct";
import { useState } from "react";
import { IProduct } from "@/lib/utils/types/product.type";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ProductsPage() {
  const { mutate: deleteProduct } = useDeleteProduct();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const removeProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleExport = () => {
    if (!filteredProducts.length) return;

    const data = filteredProducts.map((product) => ({
      Name: product.name,
      Brand: product.brand,
      Category: product.categoryID?.name || "",
      SubCategory: product.subCategoryID?.name || "",
      OriginalPrice: product.originalPrice,
      DiscountedPrice: product.discountedPrice,
      Stock: product.stock,
      Description: product.description || "",

      // Flatten technical specifications (performance)
      Series: product.technicalSpecification?.performance?.series || "",
      CPU: product.technicalSpecification?.performance?.cpu || "",
      Graphics: product.technicalSpecification?.performance?.graphics || "",
      Display: product.technicalSpecification?.performance?.display || "",
      OperatingSystem:
        product.technicalSpecification?.performance?.operatingSystem || "",

      // Flatten technical specifications (memoryAndStorage)
      MainMemory:
        product.technicalSpecification?.memoryAndStorage?.mainMemory || "",
      Storage: product.technicalSpecification?.memoryAndStorage?.storage || "",
      Connectivity:
        product.technicalSpecification?.memoryAndStorage?.connectivity || "",
      Camera: product.technicalSpecification?.memoryAndStorage?.camera || "",
      Audio: product.technicalSpecification?.memoryAndStorage?.audio || "",
      Battery: product.technicalSpecification?.memoryAndStorage?.battery || "",
      Weight: product.technicalSpecification?.memoryAndStorage?.weight || "",
      Warranty:
        product.technicalSpecification?.memoryAndStorage?.warranty || "",

      // Flatten specifications array into a single string
      Specifications: product.specifications
        .map((spec) => `${spec.key}: ${spec.value}`)
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProductHeader />

      {/* Filters */}
      <Filters onFilter={setFilteredProducts} />

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable products={filteredProducts} onDelete={removeProduct} />
        </CardContent>
      </Card>
    </div>
  );
}
