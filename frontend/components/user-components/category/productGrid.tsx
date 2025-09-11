import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Heart, Star } from "lucide-react";
import { addToWishlist } from "@/lib/localStorage/wishlist.localStorage";
import { useToast } from "@/lib/toast";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";

type ProductGridProps = {
  products: any[]; 
};

export default function ProductGrid({ products }: ProductGridProps) {
  const { showToast } = useToast();

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
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product._id}
          className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <img
                  src={product.images ? product.images[0] : product.name}
                  alt=""
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-primary font-medium">
                  {product.brand}
                </p>
                <h3 className="text-lg font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold font-serif text-foreground">
                    Rs.{product.discountedPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      Rs.{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-sm">
                  <Link href={`/product/${product._id}`}>View Details</Link>
                </Button>
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
  );
}
