"use client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Heart as HeartOutline, ChevronRight } from "lucide-react";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import {
  addToWishlist,
  getWishlist,
} from "@/lib/localStorage/wishlist.localStorage";
import ErrorState from "../layout/ErrorPage";
import { useAppToast } from "@/lib/tostify";
import { useEffect, useState } from "react";
import { productApi } from "@/lib/api/product.api";
import DataLoading from "../layout/LoadingPage";

export default function GamingLaptop() {
  const subCategoryID = process.env.NEXT_PUBLIC_GAMING_LAPTOP_SUB_CATEGORY_ID;
  const { toastSuccess, toastError } = useAppToast();

  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // fetch all products from all pages
  useEffect(() => {
    let isMounted = true;

    const fetchAllProducts = async () => {
      try {
        let page = 1;
        const limit = 50; // fetch 50 items per page
        let allProducts: any[] = [];
        let totalPages = 1;

        do {
          const res = await productApi.getAllProductsApi({ page, limit });
          allProducts = [...allProducts, ...(res.data || [])];
          totalPages = res.pagination?.totalPages || 1;
          page++;
        } while (page <= totalPages);

        if (isMounted) {
          setProducts(allProducts);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
        }
      }
    };

    fetchAllProducts();
    setWishlist(getWishlist());

    return () => {
      isMounted = false;
    };
  }, []);
  console.log(subCategoryID);

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
      setWishlist((prev) => [...prev, item]);
    } else {
      toastError("Item already in your wishlist");
    }
  };

  // filter products by heading
  const gamingLaptops = products.filter(
    (product) => product.subCategoryID?._id === subCategoryID
  ).slice(0,10);

  const categoryID = gamingLaptops?.[0]?.categoryID?._id;

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  if (isLoading) return <DataLoading />;
  if (isError) return <ErrorState />;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex-cols items-center justify-between mb-12">
          <div className="w-full flex items-center justify-between py-4">
            <h2 className="text-xl md:text-4xl font-bold text-foreground">
              Gaming Laptops
            </h2>
            <Link
              href={
                categoryID
                  ? `/search?categoryID=${categoryID}&subCategoryID=${subCategoryID}`
                  : "#"
              }
            >
              <Button size="sm" variant="outline" className="bg-transparent">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <p className="text-xl text-muted-foreground">
            Portable powerhouses for gaming and productivity
          </p>
        </div>

        {/* Product Grid */}
        {gamingLaptops.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-muted-foreground">
              No any product related to{" "}
              <span className="font-bold">Gaming Laptop"</span>
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gamingLaptops.map((product: any) => {
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
