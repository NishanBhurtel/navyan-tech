import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Star,
  Cpu,
  Monitor,
  Laptop,
  Gamepad2,
  Headphones,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import Annoucement from "@/components/layout/Annoucement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToet3gJG5Dl_YypQhy5gXAKTAQFpL9HdO1gg&s",
      price: "$1,599.99",
      originalPrice: "$1,799.99",
      rating: 4.9,
      reviews: 234,
      badge: "Best Seller",
      badgeColor: "bg-primary",
      category: "Graphics Card",
      inStock: true,
    },
    {
      id: 2,
      name: "AMD Ryzen 9 7950X3D",
      image: "https://m.media-amazon.com/images/I/51jNS8epPeL.jpg",
      price: "$699.99",
      originalPrice: "$799.99",
      rating: 4.9,
      reviews: 89,
      badge: "Sale",
      badgeColor: "bg-red-600",
      category: "Processor",
      inStock: true,
    },
    {
      id: 3,
      name: "ASUS ROG Zephyrus G14",
      image:
        "https://itti.com.np/_next/image?url=https%3A%2F%2Fadmin.itti.com.np%2Fstorage%2Fproduct%2Fasus-rog-zephyrus-g14-2024-price-nepal%2F34a4616e-850b-4797-a6a2-85b86fa51ff7.webp&w=3840&q=75",
      price: "$1,299.99",
      originalPrice: "$1,499.99",
      rating: 4.7,
      reviews: 312,
      badge: "Hot",
      badgeColor: "bg-orange-600",
      category: "Gaming Laptop",
      inStock: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <Annoucement />

      {/* Header */}
      <Navbar />

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
              <Button variant="outline" className="bg-transparent">
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
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt="" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={`${item.badgeColor} text-white text-xs`}
                              >
                                {item.badge}
                              </Badge>
                              <span className="text-xs text-primary font-medium">
                                {item.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold font-serif text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(item.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                ({item.reviews} reviews)
                              </span>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
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
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                              disabled={!item.inStock}
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Order Now
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
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Start Shopping
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
