"use client";

import { useSearchParams } from "next/navigation";
import Annoucement from "@/components/user-components/layout/Annoucement";
import OrderForm from "@/components/user-components/order/orderForm";
import OrderSummary from "@/components/user-components/order/orderSummary";
import Footer from "@/components/user-components/layout/Footer";
import { useProductByID } from "@/hooks/product/getProductByID";
import Navbar from "@/components/user-components/layout/Navbar";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const quantityParam = searchParams.get("order");

  // Ensure quantity is at least 1
  const quantity = Math.max(Number(quantityParam) || 1, 1);

  const {
    data: responseData,
    isLoading,
    isError,
  } = useProductByID(productId || "");

  const product = responseData?.data;

  const subTotal = (product?.discountedPrice ?? 0) * quantity;
  const taxRate = 0.1; // 10% VAT
  const tax = subTotal * taxRate;
  const total = subTotal + tax;

  const paymentDetails = {
    subTotal,
    tax,
    total,
  };

  if (!productId || isLoading) {
    return <div className="p-12 text-center">Loading product...</div>;
  }

  if (isError || !product) {
    return <div className="p-12 text-center">Product Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Annoucement />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <a
            href={`/product/${product._id}`}
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span>← Back to Product</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pass product and quantity to OrderForm */}
          <OrderForm
            product={product}
            quantity={quantity}
            total={paymentDetails.total}
          />
          {/* Pass product and quantity to OrderSummary */}
          <OrderSummary
            product={product}
            quantity={quantity}
            paymentDetails={paymentDetails}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
