"use client";
import Link from "next/link";
import { ChevronRight, Heart, Heart as HeartOutline } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import {
  addToWishlist,
  getWishlist,
} from "@/lib/localStorage/wishlist.localStorage";
import { useAppToast } from "@/lib/tostify";
import DataLoading from "../layout/LoadingPage";
import { productApi } from "@/lib/api/product.api";
import { useState, useEffect } from "react";

export default function FeaturedProduct() {
  const heading = "Featured Products";
  const { toastSuccess, toastError } = useAppToast();

  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch all products by paging
  useEffect(() => {
    let isMounted = true;

    const fetchAllFeatured = async () => {
      try {
        let page = 1;
        const limit = 50; // fetch 50 at a time
        let allProducts: any[] = [];
        let totalPages = 1;

        do {
          const res = await productApi.getAllProductsApi({ page, limit });
          allProducts = [...allProducts, ...(res.data || [])];
          totalPages = res.pagination?.totalPages || 1;
          page++;
        } while (page <= totalPages);

        if (isMounted) {
          // filter featured products only
          const featured = allProducts.filter((p) => p.isFeatured);
          setFeaturedProducts(featured.slice(0, 10)); // display first 10 only
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAllFeatured();
    setWishlist(getWishlist());

    return () => {
      isMounted = false;
    };
  }, []);

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
      toastSuccess("Item added to wishlist");
      setWishlist((prev) => [...prev, item]); // 🟢 THIS is what was missing
    } else {
      toastError("Item already in your wishlist");
    }
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  if (isLoading) return <DataLoading />;

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
              No products available for{" "}
              <span className="font-bold">{heading}</span>
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((product) => {
              const isAvailable = product.stock > 0;
              const alreadyInWishlist = isInWishlist(product._id);

              return (
                <Card
                  key={product._id}
                  className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <Link href={`/product/${product._id}`} className="flex-1">
                    <div className="relative w-full h-40 overflow-hidden">
                      <img
                        src={product.images?.[0] ?? ""}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute bottom-2 right-2 px-3 py-1 text-[10px] font-semibold rounded-[4px] shadow-sm ${
                          isAvailable
                            ? "bg-green-600 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {isAvailable ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <CardContent className="p-3 space-y-2">
                    {/* Category */}
                    <p className="text-xs font-medium text-muted-foreground flex gap-1 items-center">
                      <Link
                        className="hover:underline hover:text-blue-600"
                        href={`/search?categoryID=${product.categoryID._id}`}
                      >
                        {product.categoryID?.name}{" "}
                      </Link>
                      <ChevronRight className="w-3 h-3" />
                      <Link
                        className="hover:underline hover:text-blue-600"
                        href={`/search?categoryID=${product.categoryID._id}&subCategoryID=${product.subCategoryID._id}`}
                      >
                        {product.subCategoryID?.name}{" "}
                      </Link>
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

                    {/* Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Link href={`/product/${product._id}`} className="flex-1">
                        <Button className="w-full bg-primary text-white text-xs font-semibold hover:bg-primary/90">
                          View Details
                        </Button>
                      </Link>

                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 bg-white hover:bg-white"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart
                          className="w-3 h-3"
                          fill={alreadyInWishlist ? "green" : "none"}
                          color={alreadyInWishlist ? "green" : "gray"}
                        />
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
