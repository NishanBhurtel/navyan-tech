"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Heart, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/lib/utils/types/product.type";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import { addToWishlist } from "@/lib/localStorage/wishlist.localStorage";
import { useAppToast } from "@/lib/tostify";

export default function ProductInfo({ product }: { product: IProduct }) {
  const [orderNumber, setOrderNumber] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const { toastSuccess, toastError } = useAppToast();

  const handleAddToWishlist = (product: any) => {
    const isAvailable = product.stock > 0;
    const item: WishlistItem = {
      id: product._id,
      name: product.name,
      image: product.images?.[0] ?? "",
      price: product.originalPrice ?? "",
      originalPrice: product.discountedPrice ?? "",
      category: product.categoryID?.name ?? "",
      inStock: isAvailable,
    };

    const result = addToWishlist(item);

    if (result.success) {
      toastSuccess(result.message);
    } else {
      toastError(result.message);
    }
  };

  const incrementOrder = () => setOrderNumber((prev) => prev + 1);
  const decrementOrder = () =>
    setOrderNumber((prev) => (prev > 1 ? prev - 1 : 1));
  const isAvailable = product.stock > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif text-foreground mb-2">
          {product.name} |{" "}
          <span className="text-lg text-gray-700 my-2">{product.brand}</span>
        </h1>
        <span className="text-[18px] text-muted-foreground">
          {product.categoryID.name + `   >>  `}
        </span>
        <span className="text-[16px] text-muted-foreground">
          {product.subCategoryID.name}
        </span>
      </div>

      <div className="space-y-4">
        {/* Price */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Price:</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground line-through">
              Rs.{product.discountedPrice?.toLocaleString()}
            </span>
            <span className="text-3xl font-bold text-foreground">
              Rs.{product.originalPrice?.toLocaleString()}
            </span>
          </div>
          <Badge
            className={`bg-primary text-white
            ${
              isAvailable
                ? "bg-primary text-white"
                : "bg-destructive text-white"
            }`}
          >
            {isAvailable ? "In Stock" : "Not in Stock"}
          </Badge>
        </div>

        {/* Quantity */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Qty:</span>
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="outline"
              className="w-8 h-8 bg-transparent"
              onClick={decrementOrder}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center">{orderNumber}</span>
            <Button
              size="icon"
              variant="outline"
              className="w-8 h-8 bg-transparent"
              onClick={incrementOrder}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          **Price is inclusive of VAT**
        </p>

        {/* Actions */}
        <div className="flex space-x-4">
          {token ? (
            <Link
              href={`/order?product=${product._id}&order=${orderNumber}`}
              className="flex-1"
            >
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3">
                Order Now
              </Button>
            </Link>
          ) : (
            <Link href="/login" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3">
                Order Now
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent"
            onClick={() => handleAddToWishlist(product)}
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Separator />
    </div>
  );
}
