import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Heart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ProductInfo({ product }: { product: any }) {
  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
          Ends in: 9d 1h 48m 50s
        </Badge>
        <h1 className="text-3xl font-bold font-serif text-foreground mb-2">
          {product.name}
        </h1>
      </div>

      <div className="space-y-4">
        {/* Price */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Price:</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice}
            </span>
            <span className="text-3xl font-bold text-foreground">
              {product.price}
            </span>
          </div>
          <Badge className="bg-primary text-white">In Stock</Badge>
        </div>

        {/* Quantity & Compare */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Qty:</span>
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="outline" className="w-8 h-8 bg-transparent">
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center">1</span>
            <Button size="icon" variant="outline" className="w-8 h-8 bg-transparent">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" className="rounded" />
            <span>Add to compare</span>
          </label>
        </div>

        <p className="text-sm text-muted-foreground">**Price is inclusive of VAT**</p>

        {/* Actions */}
        <div className="flex space-x-4">
          <Link href={`/order?product=${product.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3">
              Order Now
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="bg-transparent">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Delivery, Warranty, Returns */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 text-sm">
          <Truck className="w-5 h-5 text-primary" />
          <span>Free Delivery</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Shield className="w-5 h-5 text-primary" />
          <span>{product.warranty}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <RotateCcw className="w-5 h-5 text-primary" />
          <span>30 Day Returns</span>
        </div>
      </div>
    </div>
  );
}
