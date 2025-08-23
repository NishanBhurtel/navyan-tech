import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: "ASUS ROG Strix RTX 4090",
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
      price: "$1,299.99",
      originalPrice: "$1,499.99",
      rating: 4.7,
      reviews: 312,
      badge: "Hot",
      badgeColor: "bg-orange-600",
      category: "Gaming Laptop",
      inStock: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 text-center text-sm font-medium">
        🎉 Free shipping on orders over $500 | 30-day return policy | 24/7 customer support
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif text-foreground">TechHub Pro</span>
            </div>

            {/* Search Section */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for computers, laptops, components..."
                  className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4">
                  Search
                </Button>
              </div>
            </div>

            {/* Cart, Wishlist, Login */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5 text-primary" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                  2
                </Badge>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center space-x-8 py-3">
              <a
                href="#"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Computers</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Laptop className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Laptops</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Cpu className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Components</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Gamepad2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Gaming</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Headphones className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Accessories</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">Save your favorite products for later</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">{wishlistItems.length} items in your wishlist</p>
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
                        <span className="text-xs text-gray-400">Product Image</span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Badge className={`${item.badgeColor} text-white text-xs`}>{item.badge}</Badge>
                              <span className="text-xs text-primary font-medium">{item.category}</span>
                            </div>
                            <h3 className="text-lg font-bold font-serif text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">({item.reviews} reviews)</span>
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
                              <span className="text-xl font-bold font-serif text-foreground">{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {item.inStock ? (
                                <Badge className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800 border-red-200">Out of Stock</Badge>
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
            <h2 className="text-2xl font-bold font-serif text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Start adding products you love to your wishlist</p>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Start Shopping
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-serif text-foreground">TechHub Pro</span>
              </div>
              <p className="text-muted-foreground">
                Your trusted partner for premium computers, laptops, and components. Building the future of technology,
                one PC at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Gaming Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Desktop PCs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Customer Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 TechHub Pro. All rights reserved. Built with precision and passion.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
