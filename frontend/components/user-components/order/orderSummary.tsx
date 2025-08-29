import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
export default function OrderSummary(){
    return(
           <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-serif text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-400">Image</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">ASUS VivoBook 14 X1405VA</h4>
                    <p className="text-xs text-muted-foreground">Intel i5 | 8GB RAM | 512GB SSD</p>
                    <p className="text-sm font-bold text-primary">₹89,000</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹89,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>₹8,900</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₹97,900</span>
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
                      <p className="text-sm text-muted-foreground">Call us at +1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@techhubpro.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Visit Our Store</p>
                      <p className="text-sm text-muted-foreground">123 Tech Street, NY 10001</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
    )
}