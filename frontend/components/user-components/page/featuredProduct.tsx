"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import { addToWishlist } from "@/lib/localStorage/wishlist.localStorage";
import { useToast } from "@/lib/toast";

export default function FeaturedProduct() {
  const { showToast } = useToast();

  const { data: products, isLoading, isError } = useAllProducts({});
  // const featuredProducts = products? products.filter((product) => product.featured === true)
  // : "";

  if (isLoading)
    return <div className="p-12 text-center">Loading product...</div>;
  if (isError || !products)
    return <div className="p-12 text-center">Product Not Found</div>;

  const handleAddToWishlist = (product: any) => {
    const item: WishlistItem = {
      id: product._id,
      name: product.name,
      image: product.images?.[0] ?? "",
      price: product.originalPrice ?? "",
      originalPrice: product.discountedPrice ?? "",
      category: product.categoryID?.name ?? "",
      inStock: product.inStock ?? true,
    };

    const result = addToWishlist(item);

    if (result.success) {
      showToast(result.message, "bg-green-600");
    } else {
      showToast(result.message, "bg-red-600");
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground">
            Handpicked premium hardware for professionals
          </p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {products.map((product: any) => (
            <Card
              key={product._id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="w-full h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                    <img
                      src={product.images ? product.images[0] : ""}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-primary font-medium">
                      {product.categoryID?.name}
                    </p>
                    <h3 className="text-sm font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-foreground">
                        Rs.{product.originalPrice}
                      </span>
                    </div>
                    {product.discountedPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        Rs.{product.discountedPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/product/${product._id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-xs">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 bg-transparent hover:bg-primary hover:text-white"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
