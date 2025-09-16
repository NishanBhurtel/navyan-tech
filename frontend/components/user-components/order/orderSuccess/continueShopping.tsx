import Link from "next/link";
import {
  Home,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../../ui/button";
export default function ContinueShopping(){
    return(
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
    )
}