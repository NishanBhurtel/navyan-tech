"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import { addToWishlist } from "@/lib/localStorage/wishlist.localStorage";
import { useToast } from "@/lib/Toast";

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
    showToast(result.message, result.success ? "bg-primary" : "bg-destructive");
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
                  className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-40 overflow-hidden">
                    <img
                      src={product.images?.[0] ?? ""}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute bottom-2 right-2 px-3 py-1 text-[10px] font-semibold rounded-2 shadow-sm ${
                        isAvailable
                          ? "bg-green-600 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {isAvailable ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Content */}
                  <CardContent className="p-3 space-y-2">
                    {/* Category */}
                    <p className="text-xs font-medium text-muted-foreground">
                      {product.categoryID?.name}
                    </p>

                    {/* Name */}
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline space-x-2">
                      <span className="text-base font-bold text-primary">
                        Rs.{product.originalPrice}
                      </span>
                      {product.discountedPrice && (
                        <span className="text-xs line-through text-muted-foreground">
                          Rs.{product.discountedPrice}
                        </span>
                      )}
                    </div>

                    {/* Buttons (always visible) */}
                    <div className="flex gap-2 pt-2">
                      <Link href={`/product/${product._id}`} className="flex-1">
                        <Button className="w-full bg-primary text-white text-xs font-semibold hover:bg-primary/90">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 hover:bg-primary hover:text-white"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart className="w-3 h-3" />
                      </Button>
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
