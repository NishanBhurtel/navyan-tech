import Link from "next/link"
import {
  ArrowLeft,
} from "lucide-react"
import Annoucement from "@/components/user-components/layout/Annoucement"
import Header from "@/components/user-components/product/header"
import OrderForm from "@/components/user-components/order/orderForm"
import OrderSummary from "@/components/user-components/order/orderSummary"
import Footer from "@/components/user-components/layout/Footer"

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
     <Annoucement />
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/product/1"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Product</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <OrderForm />
          {/* Order Summary */}
          <OrderSummary />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
