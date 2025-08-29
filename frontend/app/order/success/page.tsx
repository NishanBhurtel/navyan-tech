import Contact from "@/components/user-components/order/orderSuccess/contactMedium";
import ContinueShopping from "@/components/user-components/order/orderSuccess/continueShopping";
import InqueryAfterOrderSuccess from "@/components/user-components/order/orderSuccess/inquery";
import ThankYou from "@/components/user-components/order/orderSuccess/thankGiving";
import { Card, CardContent } from "@/components/user-components/ui/card";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Thank Giving  */}
            <ThankYou />

            <div className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold font-serif text-foreground">
                  We'll Contact You Soon!
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Thanks for inquiring with us! We will call you directly
                  through phone calls or WhatsApp. Stay tuned for our response
                  within 24 hours.
                </p>
              </div>

              <Contact />

              {/* Order After Order Success  */}
              <InqueryAfterOrderSuccess />

             {/* Back to Shopping or watchlist */}
             <ContinueShopping />

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Need immediate assistance?{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Contact us directly
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
