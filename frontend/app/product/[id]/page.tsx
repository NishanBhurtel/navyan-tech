import Annoucement from "@/components/user-components/layout/Annoucement";
import Footer from "@/components/user-components/layout/Footer";
import Breadcrumb from "@/components/user-components/product/breadCrumb";
import Header from "@/components/user-components/product/header";
import ProductImages from "@/components/user-components/product/productImage";
import ProductInfo from "@/components/user-components/product/productInfo";
import { getProductData } from "@/components/user-components/product/productList";
import RelatedProducts from "@/components/user-components/product/relatedProduct";
import Specification from "@/components/user-components/product/specification";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;   // <- explicitly await params
  const product = getProductData(params.id);

  if (!product) return <div className="p-12 text-center">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Annoucement />
      <Header />
      <Breadcrumb productName={product.name} />

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-12">
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </div>

      <Specification product={product} />
      <RelatedProducts />
      <Footer />
    </div>
  );
}
