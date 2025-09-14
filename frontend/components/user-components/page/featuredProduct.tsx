"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import { addToWishlist } from "@/lib/localStorage/wishlist.localStorage";
import { useToast } from "@/lib/Toast";
import { Badge } from "../ui/badge";

export default function FeaturedProduct() {
  const { showToast } = useToast();
  const { data: products, isLoading, isError } = useAllProducts({});

  const heading = "Featured Products";

  const featuredProducts = products
    ? products.filter((product) => product.isFeatured === true)
    : [];

  if (isLoading) {
    return <div className="p-12 text-center">Loading product...</div>;
  }

  if (isError || !products) {
    return <div className="p-12 text-center">Product Not Found</div>;
  }

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
    showToast(result.message, result.success ? "bg-green-600" : "bg-red-600");
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-xl text-muted-foreground">
            Handpicked premium hardware for professionals
          </p>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-muted-foreground">
              No any product related to{" "}
              <span className="font-bold">{heading}</span>
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((product: any) => {
              const isAvailable = product.stock > 0;

              return (
                <Card
                  key={product._id}
                  className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Image + Stock badge */}
                      <div className="relative w-full h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                        <img
                          src={product.images?.[0] ?? ""}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                        <span
                          className={`absolute top-2 left-2 px-3 py-2 text-[10px] font-semibold rounded-[4px] ${
                            isAvailable
                              ? "bg-primary text-white"
                              : "bg-destructive text-white"
                          }`}
                        >
                          {isAvailable ? "In Stock" : "Not in Stock"}
                        </span>
                      </div>

                      {/* Category + Name */}
                      <div className="space-y-1">
                        <p className="text-xs text-primary font-medium">
                          {product.categoryID?.name}
                        </p>
                        <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </div>

                      {/* Price */}
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

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/product/${product._id}`}
                          className="flex-1"
                        >
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
