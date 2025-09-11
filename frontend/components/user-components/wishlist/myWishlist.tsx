"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Heart,
  Star,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import {
  clearWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/localStorage/wishlist.localStorage";
import Link from "next/link";
import { useToast } from "@/lib/toast";

export default function MyWishList() {
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlistItems(getWishlist());
  }, []);

  const handleRemove = (id: number) => {
    const confirmRemove = confirm(
      "Are you sure you want to remove this item from your watchlist?"
    );
    if (confirmRemove) {
      removeFromWishlist(id);
      setWishlistItems(getWishlist());
      showToast("Product removed from wishlist", "bg-green-600");
    }
  };

  const handleClearAll = () => {
    clearWishlist();
    setWishlistItems([]);
  };

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Initialize quantities when wishlist loads
  useEffect(() => {
    const items = getWishlist();
    setWishlistItems(items);

    // initialize each item with quantity = 1
    const initialQuantities: { [key: number]: number } = {};
    items.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const incrementOrder = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrementOrder = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif text-foreground mb-2">
          My Wishlist
        </h1>
        <p className="text-muted-foreground">
          Save your favorite products for later
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {wishlistItems.length} items in your wishlist
            </p>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </div>

          <div className="grid gap-6">
            {wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <img src={item.image} alt={item.name} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-primary font-medium">
                              {item.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold font-serif text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          {/* Quantity */}
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm text-muted-foreground">
                              Qty:
                            </span>
                            <div className="flex items-center space-x-1">
                              <Button
                                size="icon"
                                variant="outline"
                                className="w-8 h-8 bg-transparent"
                                onClick={() => decrementOrder(item.id)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center">
                                {quantities[item.id] || 1}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="w-8 h-8 bg-transparent"
                                onClick={() => incrementOrder(item.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold font-serif text-foreground">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.inStock ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                In Stock
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            className="bg-transparent hover:bg-primary hover:text-white"
                            disabled={!item.inStock}
                          >
                            <Link
                              href={`/product/${item.id}`}
                              className="flex-1"
                            >
                              View Details
                            </Link>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                            disabled={!item.inStock}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            <Link
                              href={`/order?product=${item.id}&order=${quantities[item.id] || 1}`}
                              className="flex-1"
                            >
                              Order Now
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-foreground mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mb-8">
            Start adding products you love to your wishlist
          </p>

          <Link href="/">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
