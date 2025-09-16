import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Phone, Mail, MapPin } from "lucide-react";
import { IProduct } from "@/lib/utils/types/product.type";

interface OrderSummaryProps {
  product: IProduct;
  quantity: number;
  paymentDetails:{
    subTotal:number;
    tax:number;
    total:number;
  }
}

export default function OrderSummary({ product, quantity, paymentDetails }: OrderSummaryProps) {

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-serif text-foreground">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className="w-36 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-sm">{product.name}</h4>
              <p className="text-xs text-muted-foreground">
                {/* {product.specifications?.map((s) => s.value).join(" | ")} */}
                {product.brand}
              </p>
              <p className="text-sm font-bold text-primary">
                Rs.{(product.discountedPrice ?? 0).toLocaleString()} x {quantity}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>Rs.{paymentDetails.subTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span className="text-primary">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (13% VAT):</span>
              <span>Rs.{paymentDetails.tax.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rs.{paymentDetails.total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Need Help?</p>
                <p className="text-sm text-muted-foreground">Call us at +(977) 9864400400</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Email Support</p>
                <p className="text-sm text-muted-foreground">navyan2018@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Visit Our Store</p>
                <p className="text-sm text-muted-foreground">Paschimanchal Finance chowk, Butwal-8</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
