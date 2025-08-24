import Link from "next/link";
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
  ChevronRight,
  Laptop,
  Gamepad2,
  Headphones,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 text-center text-sm font-medium">
        🎉 Free shipping on orders over $500 | 30-day return policy | 24/7
        customer support
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif text-foreground">
                TechHub Pro
              </span>
            </Link>

            {/* Search Section */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for computers, laptops, components..."
                  className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Cart, Wishlist, Login */}
            <div className="flex items-center space-x-2">
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                    3
                  </Badge>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                  2
                </Badge>
              </Button>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center space-x-8 py-3">
              <Link
                href="/category/computers"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Computers</span>
              </Link>
              <Link
                href="/category/laptops"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Laptop className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Laptops</span>
              </Link>
              <Link
                href="/category/components"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Cpu className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Components</span>
              </Link>
              <Link
                href="/category/gaming"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Gamepad2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Gaming</span>
              </Link>
              <Link
                href="/category/accessories"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
              >
                <Headphones className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Accessories</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                New Arrivals
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold font-serif text-foreground leading-tight">
                Build Your
                <span className="text-primary block">Dream PC</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover cutting-edge computers, gaming laptops, and
                high-performance components. Professional-grade hardware for
                creators, gamers, and professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/category/featured">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    Shop Now
                  </Button>
                </Link>
                <Link href="/category/custom-pc">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    Build Custom PC
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
            {/* <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
              <img
                src="/placeholder-bc56i.png"
                alt="Premium Gaming PC Setup"
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
              />
            </div> */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
              <img
                src="/custom-pc-build.png"
                alt="Custom PC Components"
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-muted-foreground">
              Find exactly what you need for your perfect setup
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Laptop,
                title: "Gaming Laptops",
                desc: "High-performance portable gaming",
                color: "from-blue-500 to-purple-600",
                items: "2,500+ items",
                href: "/category/gaming-laptops",
              },
              {
                icon: Monitor,
                title: "Desktop PCs",
                desc: "Custom built powerhouses",
                color: "from-primary to-accent",
                items: "1,800+ items",
                href: "/category/desktop-pcs",
              },
              {
                icon: Cpu,
                title: "Processors",
                desc: "Intel & AMD CPUs",
                color: "from-orange-500 to-red-600",
                items: "850+ items",
                href: "/category/processors",
              },
              {
                icon: Gamepad2,
                title: "Graphics Cards",
                desc: "NVIDIA & AMD GPUs",
                color: "from-purple-500 to-pink-600",
                items: "650+ items",
                href: "/category/graphics-cards",
              },
              {
                icon: Monitor,
                title: "Motherboards",
                desc: "Premium mainboards",
                color: "from-teal-500 to-cyan-600",
                items: "1,200+ items",
                href: "/category/motherboards",
              },
              {
                icon: Cpu,
                title: "Memory & Storage",
                desc: "RAM & SSD solutions",
                color: "from-indigo-500 to-blue-600",
                items: "2,100+ items",
                href: "/category/memory-storage",
              },
              {
                icon: Headphones,
                title: "Gaming Accessories",
                desc: "Keyboards, mice & more",
                color: "from-pink-500 to-rose-600",
                items: "3,100+ items",
                href: "/category/gaming-accessories",
              },
              {
                icon: Monitor,
                title: "Monitors",
                desc: "4K & gaming displays",
                color: "from-emerald-500 to-green-600",
                items: "900+ items",
                href: "/category/monitors",
              },
            ].map((category, index) => (
              <Link key={index} href={category.href}>
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-muted to-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1">
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${category.color})`,
                    }}
                  />
                  <div className="relative p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} mb-3 shadow-lg`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold font-serif text-foreground mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.desc}
                    </p>
                    <p className="text-xs font-medium text-primary">
                      {category.items}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
            {[
              {
                id: 1,
                name: "ASUS ROG Strix RTX 4090",
                image:
                  "https://dlcdnwebimgs.asus.com/files/media/015AF38A-127E-4FA8-9700-6D92BB2760C1/v2/img/kv/pd.png",
                price: "$1,599.99",
                originalPrice: "$1,799.99",
                rating: 4.9,
                reviews: 234,
                badge: "Best Seller",
                badgeColor: "bg-primary",
                discount: "11% OFF",
                category: "Graphics Card",
              },
              {
                id: 2,
                name: 'MacBook Pro 16" M3 Max',
                image:
                  "https://external-preview.redd.it/apple-macbook-pro-16-2023-m3-max-review-m3-max-challenges-v0-B9io9CbQtnqF17yeX0-PKuhmBuLmod21auH-JqVfvvI.jpg?auto=webp&s=ba18b798b825a0aab1a5642a5221e7d1961975a5",
                price: "$3,499.99",
                rating: 4.8,
                reviews: 156,
                badge: "New",
                badgeColor: "bg-blue-600",
                category: "Laptop",
              },
              {
                id: 3,
                name: "AMD Ryzen 9 7950X3D",
                image:
                  "https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x3d-og.jpg",
                price: "$699.99",
                originalPrice: "$799.99",
                rating: 4.9,
                reviews: 89,
                badge: "Sale",
                badgeColor: "bg-red-600",
                discount: "12% OFF",
                category: "Processor",
              },
              {
                id: 4,
                name: "ASUS ROG Zephyrus G14",
                image:
                  "https://dlcdnwebimgs.asus.com/gain/98AA0AFE-420A-4EE7-AAE2-6E813FA6A7CE/w1000/h732",
                price: "$1,299.99",
                originalPrice: "$1,499.99",
                rating: 4.7,
                reviews: 312,
                badge: "Hot",
                badgeColor: "bg-orange-600",
                discount: "13% OFF",
                category: "Gaming Laptop",
              },
              {
                id: 5,
                name: "Corsair Vengeance DDR5",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmnPwZ2sFKQrU_ZaO9tc6Wttnsz8kfeGEapQ&s",
                price: "$189.99",
                rating: 4.8,
                reviews: 145,
                badge: "Fast",
                badgeColor: "bg-green-600",
                category: "Memory",
              },
              {
                id: 6,
                name: "Samsung 980 PRO SSD",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmnPwZ2sFKQrU_ZaO9tc6Wttnsz8kfeGEapQ&s",
                price: "$129.99",
                originalPrice: "$149.99",
                rating: 4.9,
                reviews: 456,
                badge: "Speed",
                badgeColor: "bg-purple-600",
                discount: "13% OFF",
                category: "Storage",
              },
              {
                id: 7,
                name: "ASUS ROG Strix X670E",
                image:
                  "https://dlcdnwebimgs.asus.com/files/media/B51D103D-2941-412E-8479-AF994957093B/v1/img/spec/connectivity-m.png",
                price: "$449.99",
                rating: 4.8,
                reviews: 127,
                badge: "AMD",
                badgeColor: "bg-red-600",
                category: "Motherboard",
              },
              {
                id: 8,
                name: "Corsair RM850x PSU",
                image:
                  "https://m.media-amazon.com/images/I/819iobK+pLL._UF350,350_QL80_.jpg",
                price: "$159.99",
                originalPrice: "$179.99",
                rating: 4.8,
                reviews: 189,
                badge: "Efficient",
                badgeColor: "bg-yellow-600",
                discount: "11% OFF",
                category: "Power Supply",
              },
              {
                id: 9,
                name: "Alienware Aurora R15",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzehHNbCnYCOymyPvqGpIhPWvwRewAw8Np3A&s",
                price: "$2,199.99",
                rating: 4.7,
                reviews: 94,
                badge: "Premium",
                badgeColor: "bg-indigo-600",
                category: "Desktop PC",
              },
              {
                id: 10,
                name: "Razer DeathAdder V3",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaoY6poWoJj9kRDMfPe_NbVMqQH7zGgXmoow&s",
                price: "$89.99",
                originalPrice: "$99.99",
                rating: 4.6,
                reviews: 523,
                badge: "Gaming",
                badgeColor: "bg-pink-600",
                discount: "10% OFF",
                category: "Gaming Mouse",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                      {/* <span className="text-xs text-gray-400">
                        Product Image
                      </span> */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                    </div>

                    <div className="flex items-start justify-between">
                      <Badge
                        className={`${product.badgeColor} text-white text-xs`}
                      >
                        {product.badge}
                      </Badge>
                      {product.discount && (
                        <Badge className="bg-red-600 text-white text-xs">
                          {product.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-primary font-medium">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold font-serif text-foreground">
                          {product.price}
                        </span>
                      </div>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/product/${product.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-xs">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 bg-transparent hover:bg-primary hover:text-white"
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

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
                Gaming Laptops
              </h2>
              <p className="text-xl text-muted-foreground">
                Portable powerhouses for gaming and productivity
              </p>
            </div>
            <Link href="/category/gaming-laptops">
              <Button variant="outline" className="bg-transparent">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[
              {
                id: 11,
                name: "ASUS ROG Strix G15",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2YX8nzBh_mgtMNBERdLmcbRVnAjeHGwkiQ&s",
                price: "$1,299.99",
                originalPrice: "$1,499.99",
                rating: 4.6,
                reviews: 189,
                specs: "RTX 4060 | Ryzen 7 | 16GB RAM",
                badge: "Popular",
                badgeColor: "bg-primary",
              },
              {
                id: 12,
                name: "MSI Katana 15",
                image:
                  "https://admin.itti.com.np/storage/product/msi-katana-15-price-nepal/thumb/e821b1aa-6c09-4cc7-a687-b830993d299e.webp",
                price: "$999.99",
                rating: 4.4,
                reviews: 156,
                specs: "RTX 4050 | Intel i7 | 16GB RAM",
                badge: "Value",
                badgeColor: "bg-green-600",
              },
              {
                id: 13,
                name: "Alienware m15 R7",
                image:
                  "https://m.media-amazon.com/images/I/81Ifu9zuyFL._AC_SL1500_.jpg",
                price: "$2,199.99",
                originalPrice: "$2,499.99",
                rating: 4.8,
                reviews: 94,
                specs: "RTX 4070 | Intel i9 | 32GB RAM",
                badge: "Premium",
                badgeColor: "bg-purple-600",
              },
              {
                id: 14,
                name: "Razer Blade 15",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jPU8D2x7iP74x_JzNbjwBJmu9HHCDiO7hA&s",
                price: "$1,899.99",
                rating: 4.7,
                reviews: 203,
                specs: "RTX 4060 | Intel i7 | 16GB RAM",
                badge: "Sleek",
                badgeColor: "bg-gray-600",
              },
              {
                id: 15,
                name: "HP Omen 16",
                image:
                  "https://cdn.hukut.com/HP-Omen-16-price-in-nepal-2.png1723027010319",
                price: "$1,149.99",
                originalPrice: "$1,299.99",
                rating: 4.5,
                reviews: 178,
                specs: "RTX 4050 | AMD Ryzen 7 | 16GB RAM",
                badge: "Gaming",
                badgeColor: "bg-red-600",
              },
              {
                id: 16,
                name: "Lenovo Legion 5 Pro",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuD16tyc-BeTYxmZ4paOHQ7gozv8SK5TP2kg&s",
                price: "$1,399.99",
                rating: 4.6,
                reviews: 245,
                specs: "RTX 4060 | AMD Ryzen 7 | 16GB RAM",
                badge: "Pro",
                badgeColor: "bg-blue-600",
              },
              {
                id: 17,
                name: "ASUS TUF Gaming A15",
                image:
                  "https://dlcdnwebimgs.asus.com/files/media/fd011465-8c85-4f94-88db-97b31f593615/v1/images/desktop/design/design_pd_jaeger.png",
                price: "$899.99",
                originalPrice: "$1,099.99",
                rating: 4.3,
                reviews: 167,
                specs: "RTX 4050 | AMD Ryzen 5 | 8GB RAM",
                badge: "Budget",
                badgeColor: "bg-orange-600",
              },
              {
                id: 18,
                name: "MSI GE76 Raider",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQb1QR9RyfcJXanyTtrhO41kSLp2Vv1UOyw&s",
                price: "$2,499.99",
                rating: 4.8,
                reviews: 89,
                specs: "RTX 4080 | Intel i9 | 32GB RAM",
                badge: "Beast",
                badgeColor: "bg-indigo-600",
              },
              {
                id: 19,
                name: "Acer Predator Helios 300",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOA0n7S9nbkssGMBv-e4-hr0_sFdVWThx2zQ&s",
                price: "$1,199.99",
                originalPrice: "$1,399.99",
                rating: 4.4,
                reviews: 234,
                specs: "RTX 4060 | Intel i7 | 16GB RAM",
                badge: "Solid",
                badgeColor: "bg-teal-600",
              },
              {
                id: 20,
                name: "Gigabyte AORUS 15G",
                image:
                  "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/22315764/cfaulkner_210216_4410_0008.jpg?quality=90&strip=all&crop=16.658378915962,0,66.683242168076,100",
                price: "$1,599.99",
                rating: 4.5,
                reviews: 123,
                specs: "RTX 4070 | Intel i7 | 16GB RAM",
                badge: "RGB",
                badgeColor: "bg-pink-600",
              },
            ].map((laptop, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                      {/* <span className="text-xs text-gray-400">
                        Product Image
                      </span> */}
                      <img src={laptop.image} alt="" />
                    </div>

                    <div className="flex items-start justify-between">
                      <Badge
                        className={`${laptop.badgeColor} text-white text-xs`}
                      >
                        {laptop.badge}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {laptop.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {laptop.specs}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(laptop.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({laptop.reviews})
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold font-serif text-foreground">
                          {laptop.price}
                        </span>
                      </div>
                      {laptop.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {laptop.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/product/${laptop.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-xs">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 bg-transparent hover:bg-primary hover:text-white"
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

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
                PC Components
              </h2>
              <p className="text-xl text-muted-foreground">
                Build your dream PC with premium components
              </p>
            </div>
            <Link href="/category/pc-components">
              <Button variant="outline" className="bg-transparent">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[
              {
                id: 21,
                name: "ASUS ROG Strix X670E",
                image:
                  "https://m.media-amazon.com/images/I/81bHZW5lVuL._AC_SL1500_.jpg",
                price: "$449.99",
                rating: 4.8,
                reviews: 127,
                specs: "AM5 Socket | DDR5 | WiFi 6E",
                badge: "AMD",
                badgeColor: "bg-red-600",
              },
              {
                id: 22,
                name: "Corsair Vengeance DDR5",
                image:
                  "https://bigbyte.com.np/wp-content/uploads/2023/08/Corsair-Vengeance-RGB-DDR5-32-GB-6000Mhz-Ram-scaled-600x600.jpg",
                price: "$189.99",
                originalPrice: "$219.99",
                rating: 4.7,
                reviews: 234,
                specs: "32GB Kit | 5600MHz | RGB",
                badge: "Fast",
                badgeColor: "bg-blue-600",
              },
              {
                id: 23,
                name: "Samsung 980 PRO SSD",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQfB_F3xifv31Ann-5iMkklU5SeWAZFnQWwQ&s",
                price: "$129.99",
                rating: 4.9,
                reviews: 456,
                specs: "1TB | NVMe | PCIe 4.0",
                badge: "Speed",
                badgeColor: "bg-green-600",
              },
              {
                id: 24,
                name: "Corsair RM850x PSU",
                image:
                  "https://m.media-amazon.com/images/I/71dj+5GQwEL._UF894,1000_QL80_.jpg",
                price: "$159.99",
                originalPrice: "$179.99",
                rating: 4.8,
                reviews: 189,
                specs: "850W | 80+ Gold | Modular",
                badge: "Efficient",
                badgeColor: "bg-yellow-600",
              },
              {
                id: 25,
                name: "NZXT Kraken X63",
                image:
                  "https://m.media-amazon.com/images/I/71kcG7K5ZIL._UF894,1000_QL80_.jpg",
                price: "$149.99",
                rating: 4.6,
                reviews: 178,
                specs: "280mm AIO | RGB | Quiet",
                badge: "Cool",
                badgeColor: "bg-cyan-600",
              },
              {
                id: 26,
                name: "MSI MAG X570S",
                image:
                  "https://itti.com.np/_next/image?url=https%3A%2F%2Fadmin.itti.com.np%2Fstorage%2Fproduct%2Fmsi-mag-x570s-tomahawk-max-wifi-amd-am4-atx-motherboard%2F8b4f6860-a6b1-496d-a312-3d89d3bdadaf.png&w=3840&q=75",
                price: "$199.99",
                originalPrice: "$229.99",
                rating: 4.5,
                reviews: 145,
                specs: "AM4 Socket | DDR4 | PCIe 4.0",
                badge: "Solid",
                badgeColor: "bg-purple-600",
              },
              {
                id: 27,
                name: "G.Skill Trident Z RGB",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_yzJAbT_D211LT5R3_JUuyKO9pv0H3-8CQ&s",
                price: "$159.99",
                rating: 4.7,
                reviews: 289,
                specs: "16GB Kit | 3600MHz | RGB",
                badge: "RGB",
                badgeColor: "bg-pink-600",
              },
              {
                id: 28,
                name: "WD Black SN850X",
                image:
                  "https://shop.sandisk.com/content/dam/store/en-us/assets/products/internal-storage/wd-black-sn850x-nvme-ssd/gallery/wd-black-sn850x-nvme-ssd-heatsink-4tb-8tb-front.png.thumb.1280.1280.png",
                price: "$99.99",
                originalPrice: "$119.99",
                rating: 4.8,
                reviews: 234,
                specs: "1TB | NVMe | Gaming",
                badge: "Gaming",
                badgeColor: "bg-orange-600",
              },
              {
                id: 29,
                name: "Seasonic Focus GX-750",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ATQPDprnwNkroM1tFRmpIiBrM7N8bU0yaA&s",
                price: "$119.99",
                rating: 4.9,
                reviews: 167,
                specs: "750W | 80+ Gold | 10Y Warranty",
                badge: "Reliable",
                badgeColor: "bg-teal-600",
              },
              {
                id: 30,
                name: "Arctic Liquid Freezer II",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnw5p5nNflF9NZhWZ4HGxvt8b6x2OJQ2UCw&s",
                price: "$89.99",
                originalPrice: "$109.99",
                rating: 4.6,
                reviews: 198,
                specs: "240mm AIO | Silent | Performance",
                badge: "Silent",
                badgeColor: "bg-indigo-600",
              },
            ].map((component, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                      <img src={component.image} alt="" />
                    </div>

                    <div className="flex items-start justify-between">
                      <Badge
                        className={`${component.badgeColor} text-white text-xs`}
                      >
                        {component.badge}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {component.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {component.specs}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(component.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({component.reviews})
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold font-serif text-foreground">
                          {component.price}
                        </span>
                      </div>
                      {component.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {component.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/product/${component.id}`}
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

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">
              Trusted Brands
            </h2>
            <p className="text-xl text-muted-foreground">
              We partner with the world's leading technology brands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: "ASUS", logo: "/placeholder-cbp93.png" },
              { name: "MSI", logo: "/msi-logo.png" },
              { name: "Gigabyte", logo: "/gigabyte-logo.png" },
              { name: "NVIDIA", logo: "/nvidia-logo.png" },
              { name: "AMD", logo: "/amd-logo.png" },
              { name: "Intel", logo: "/intel-logo.png" },
            ].map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  className="h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your PC Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                New Arrivals
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold font-serif text-foreground leading-tight">
                Build Your
                <span className="text-primary block">Dream PC</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover cutting-edge computers, gaming laptops, and
                high-performance components. Professional-grade hardware for
                creators, gamers, and professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6">
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent"
                >
                  Build Custom PC
                </Button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
              <img
                src="/custom-pc-build.png"
                alt="Custom PC Components"
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-serif text-foreground">
                  TechHub Pro
                </span>
              </Link>
              <p className="text-muted-foreground">
                Your trusted partner for premium computers, laptops, and
                components. Building the future of technology, one PC at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/category/gaming-laptops"
                    className="hover:text-primary transition-colors"
                  >
                    Gaming Laptops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/desktop-pcs"
                    className="hover:text-primary transition-colors"
                  >
                    Desktop PCs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/components"
                    className="hover:text-primary transition-colors"
                  >
                    Components
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/accessories"
                    className="hover:text-primary transition-colors"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Customer Service
                  </Link>
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
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025 TechHub Pro. All rights reserved. Built with precision
              and passion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
