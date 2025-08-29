import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import {
  Package,
} from "lucide-react"
export default function OrderForm(){
    return(
        <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-serif text-foreground flex items-center space-x-2">
                  <Package className="w-6 h-6 text-primary" />
                  <span>Order Details</span>
                </CardTitle>
                <CardDescription>Please fill in your details to complete your order inquiry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" type="text" placeholder="John" className="h-11" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" type="text" placeholder="Doe" className="h-11" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="h-11" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-11" required />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Shipping Address</h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" type="text" placeholder="123 Main Street" className="h-11" required />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" type="text" placeholder="New York" className="h-11" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province *</Label>
                        <Input id="state" type="text" placeholder="NY" className="h-11" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP/Postal Code *</Label>
                        <Input id="zip" type="text" placeholder="10001" className="h-11" required />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Requirements or Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special requirements, preferred delivery time, or additional notes..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                      <select
                        id="preferredContact"
                        className="w-full h-11 px-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="phone">Phone Call</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <Link href="/order/success">
                    <Button
                      type="button"
                      className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold text-lg"
                    >
                      Submit Order Inquiry
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </Card>
          </div>
    )
}