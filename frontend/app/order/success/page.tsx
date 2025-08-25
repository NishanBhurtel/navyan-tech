import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Phone, MessageCircle, Home, ShoppingBag } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold font-serif text-white mb-2">Thank You!</h1>
              <p className="text-white/90 text-lg">Your order inquiry has been submitted successfully</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold font-serif text-foreground">We'll Contact You Soon!</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Thanks for inquiring with us! We will call you directly through phone calls or WhatsApp. Stay tuned
                  for our response within 24 hours.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Phone Call</p>
                    <p className="text-sm text-muted-foreground">We'll call you directly</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Quick messaging support</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Our team will review your inquiry within 2-4 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>We'll contact you via your preferred method</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Discuss pricing, availability, and delivery options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Complete your purchase with personalized assistance</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full h-12 bg-transparent border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/wishlist" className="flex-1">
                  <Button className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Wishlist
                  </Button>
                </Link>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Need immediate assistance?{" "}
                  <Link href="/contact" className="text-primary hover:text-primary/80 font-medium">
                    Contact us directly
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
