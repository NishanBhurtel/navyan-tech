"use client";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronRight, Heart, Star } from "lucide-react";
import Link from "next/link";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import { addToWishlist } from "@/lib/localStorage/wishlist.localStorage";
import { useAppToast } from "@/lib/tostify";

interface RelatedProductsProps {
  currentProduct: any;
}

export default function RelatedProducts({
  currentProduct,
}: RelatedProductsProps) {
  const { data: allProducts = [], isLoading } = useAllProducts({});

  if (isLoading) return <div>Loading related products...</div>;

  // Filter related products: same category or subcategory, exclude current product
  const relatedProducts = allProducts
    .filter(
      (p: any) =>
        p._id !== currentProduct._id &&
        (p.categoryID?._id === currentProduct.categoryID?._id ||
          p.subCategoryID?._id === currentProduct.subCategoryID?._id)
    )
    .slice(0, 5); // limit to 5 products

  if (relatedProducts.length === 0) return null;

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

  return (
    <div className="container mx-auto px-4 mt-16 mb-4">
      <h3 className="text-3xl font-bold font-serif text-foreground mb-8">
        You may also like
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {relatedProducts.map((p, i) => {
          const isAvailable = p.stock > 0;
          return (
            <Card
              key={i}
              className="group hover:shadow-xl py-6 transition-all duration-300 border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
            >
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full h-48 md:h-32 bg-gray-50 rounded-lg flex items-center justify-center relative">
                    {/* Badge inside image top-left */}
                    <Badge
                      className={`absolute top-2 left-2 text-white text-[10px] ${
                        isAvailable ? "bg-primary" : "bg-destructive"
                      }`}
                    >
                      {isAvailable ? "InStock" : "Out of Stock"}
                    </Badge>
                    <Link href={`/product/${p._id}`} className="flex-1">
                      <img
                        src={p.images ? p.images[0] : p.name}
                        alt={p.name}
                        className="object-contain h-full w-full rounded"
                      />
                    </Link>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground flex gap-1 items-center pt-2">
                      <Link
                        className="hover:underline hover:text-blue-600"
                        href={`/search?categoryID=${p.categoryID._id}`}
                      >
                        {p.categoryID?.name}{" "}
                      </Link>
                      <ChevronRight className="w-3 h-3" />
                      <Link
                        className="hover:underline hover:text-blue-600"
                        href={`/search?categoryID=${p.subCategoryID._id}`}
                      >
                        {p.subCategoryID?.name}{" "}
                      </Link>
                    </p>
                    <h4 className="text-lg font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {p.description || `${p.brand} | ${p.originalPrice}`}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold font-serif text-foreground">
                      ₹
                      {p.discountedPrice?.toLocaleString() ||
                        p.originalPrice?.toLocaleString()}
                    </span>
                    {p.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{p.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/product/${p._id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-xs">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 bg-transparent hover:bg-primary hover:text-white"
                      onClick={() => handleAddToWishlist(p)}
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
    </div>
  );
}
