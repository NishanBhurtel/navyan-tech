"use client";
import { use } from "react";
import Annoucement from "@/components/user-components/layout/Annoucement";
import Footer from "@/components/user-components/layout/Footer";
import Breadcrumb from "@/components/user-components/product/breadCrumb";
import ProductInfo from "@/components/user-components/product/productInfo";
import RelatedProducts from "@/components/user-components/product/relatedProduct";
import Specification from "@/components/user-components/product/specification";
import { useProductByID } from "@/hooks/product/getProductByID";
import Navbar from "@/components/user-components/layout/Navbar";
import ProductImages from "@/components/user-components/product/productImage";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: responseData, isLoading, isError } = useProductByID(id);

  if (isLoading)
    return <div className="p-12 text-center">Loading product...</div>;
  if (isError || !responseData?.data)
    return <div className="p-12 text-center">Product Not Found</div>;

  const product = responseData.data;

  return (
    <div className="min-h-screen bg-background">
      <Annoucement />
      <Navbar />
      <Breadcrumb productName={product.name} productCategory={product.categoryID._id} />

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-12">
        <ProductImages product={product} />

        <ProductInfo product={product} />
      </div>

      <Specification product={product} />

      {/* Pass the current product, RelatedProducts handles filtering internally */}
      <RelatedProducts currentProduct={product} />

      <Footer />
    </div>
  );
}
