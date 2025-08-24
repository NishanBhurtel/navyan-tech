import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
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
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

function getProductData(id: string) {
  // Mock product data - in a real app, this would fetch from an API
  const products = {
    "1": {
      // id: "1",
      // name: "ASUS VivoBook 14 X1405VA - 13th Gen Intel Core i5 13420H",
      // price: "₹89,000",
      // originalPrice: "₹95,900",
      // reviews: 127,
      id: 1,
      name: "ASUS ROG Strix RTX 4090",
      image:
        "https://dlcdnwebimgs.asus.com/files/media/015AF38A-127E-4FA8-9700-6D92BB2760C1/v2/img/kv/pd.png",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd1r8PjrBdYQ_SqTFbXIf22QqINNN3S1Dw9A&s",
        "https://images-cdn.ubuy.co.in/65466f2a6337012fd975e940-asus-rog-strix-geforce-rtx-4090-oc.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp5wcx4qAyuFb1pb2bPWtxtcBFDu7sPPZhyg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNm8PGkF4IM1KbjfjcuXC8Nc3Hs6MZuQ7UA&s",
      ],
      price: "$1,599.99",
      originalPrice: "$1,799.99",
      rating: 4.9,
      reviews: 234,
      brand: "ASUS",
      series: "VivoBook 14 (X1405VA)",
      cpu: "Intel® Core™ i5-13420H Processor 2.1 GHz (12MB Cache, up to 4.6 GHz, 8 cores, 12 Threads)",
      graphics: "Intel Iris Xe Graphics",
      display:
        "14.0-inch, WUXGA (1920 x 1200) 16:10 aspect ratio, IPS-level Panel, LED Backlit, 60Hz refresh rate, 300nits, 45% NTSC color gamut, Anti-glare display, Non-touch screen, (Screen-to-body ratio)86%",
      os: "Windows 11 Home",
      memory: "8GB DDR4 onboard",
      storage: "512GB M.2 NVMe™ PCIe® 4.0 SSD",
      connectivity:
        "Wi-Fi 6E(802.11ax) (Dual band) 1*1 + Bluetooth® 5.3 Wireless Card (*Bluetooth® version may change with OS version different)",
      camera: "720p HD camera",
      audio:
        "SonicMaster, Built-in speaker, Built-in array microphone, with Cortana voice-recognition support",
      battery: "42WHrs, 3S1P, 3-cell Li-ion",
      weight: "1.60 kg (3.53 lbs)",
      warranty: "2 Year Int'l Warranty | 1 year Perfect Warranty",
      description:
        "The ASUS VivoBook 14 X1405VA is designed for productivity and entertainment. With its powerful 13th Gen Intel Core i5 processor and sleek design, it's perfect for students and professionals alike. The laptop features a stunning 14-inch display with narrow bezels for an immersive viewing experience.",
      features: [
        "13th Gen Intel Core i5-13420H processor for exceptional performance",
        "14-inch WUXGA display with 16:10 aspect ratio for more screen real estate",
        "8GB DDR4 RAM for smooth multitasking",
        "512GB PCIe 4.0 SSD for fast boot times and file transfers",
        "Wi-Fi 6E connectivity for blazing-fast internet speeds",
        "Lightweight design at just 1.60kg for ultimate portability",
        "Comprehensive I/O ports including USB-C, USB-A, and HDMI",
        "ASUS SonicMaster audio technology for immersive sound",
      ],
    },
    "3": {
      id: "3",
      name: "MSI Gaming Laptop GF63 Thin 11UC-692",
      image:
        "https://dlcdnwebimgs.asus.com/files/media/015AF38A-127E-4FA8-9700-6D92BB2760C1/v2/img/kv/pd.png",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd1r8PjrBdYQ_SqTFbXIf22QqINNN3S1Dw9A&s",
        "https://images-cdn.ubuy.co.in/65466f2a6337012fd975e940-asus-rog-strix-geforce-rtx-4090-oc.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp5wcx4qAyuFb1pb2bPWtxtcBFDu7sPPZhyg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNm8PGkF4IM1KbjfjcuXC8Nc3Hs6MZuQ7UA&s",
      ],
      price: "₹75,000",
      originalPrice: "₹82,000",
      reviews: 89,
      brand: "MSI",
      series: "GF63 Thin 11UC",
      cpu: "Intel® Core™ i5-11400H Processor 2.7 GHz (12MB Cache, up to 4.5 GHz, 6 cores, 12 Threads)",
      graphics: "NVIDIA GeForce RTX 3050 4GB GDDR6",
      display:
        "15.6-inch, Full HD (1920 x 1080), IPS-level Panel, 144Hz refresh rate, 45% NTSC color gamut",
      os: "Windows 11 Home",
      memory: "8GB DDR4-3200 RAM",
      storage: "512GB NVMe PCIe Gen3x4 SSD",
      connectivity: "Wi-Fi 6 AX201 + Bluetooth v5.2",
      camera: "HD type (30fps@720p)",
      audio: "2x 2W speakers, Nahimic 3 Audio Enhancer",
      battery: "51Whr, 3-cell",
      weight: "1.86 kg (4.1 lbs)",
      warranty: "2 Year International Warranty",
      description:
        "The MSI GF63 Thin is a powerful gaming laptop that delivers exceptional performance in a sleek, portable design. Equipped with the latest Intel processor and NVIDIA RTX graphics, it's perfect for gaming, content creation, and productivity tasks.",
      features: [
        "Intel Core i5-11400H processor for high-performance computing",
        "NVIDIA GeForce RTX 3050 graphics for smooth gaming experience",
        "144Hz display for fluid gameplay and reduced motion blur",
        "MSI Center software for system optimization and customization",
        "Cooler Boost 5 technology for efficient thermal management",
        "Red backlit keyboard for gaming in low-light conditions",
        "Comprehensive connectivity with USB-C, USB 3.2, and HDMI 2.0",
        "Nahimic 3 audio for immersive 3D sound experience",
      ],
    },
  };

  return products[id as keyof typeof products] || products["1"]; // Default to product 1 if ID not found
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductData(params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 text-center text-sm font-medium">
        🎉 Free shipping on orders over $500 | 30-day return policy | 24/7
        customer support
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
              <span className="text-2xl font-bold font-serif text-foreground">
                TechHub Pro
              </span>
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
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
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
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
              >
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

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/category/laptops" className="hover:text-primary">
            Laptops
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}

          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl border border-border"
              />
              <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                ₹6900 Off
              </Badge>
              <Badge className="absolute top-4 right-4 bg-primary text-white">
                Free Shipping
              </Badge>
            </div>
            {/* <div className="grid grid-cols-4 gap-3">
              {[
                `${product.name} closed view`,
                `${product.name} keyboard detail`,
                `${product.name} ports side view`,
                `${product.name} back view`,
              ].map((image, index) => (
                <img
                  key={index}
                  src={`/abstract-geometric-shapes.png?height=100&width=120&query=${image}`}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-border cursor-pointer hover:border-primary transition-colors"
                />
              ))}
            </div> */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-border cursor-pointer hover:border-primary transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                Ends in: 9d 1h 48m 50s
              </Badge>
              <h1 className="text-3xl font-bold font-serif text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Price:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                  <span className="text-3xl font-bold text-foreground">
                    {product.price}
                  </span>
                </div>
                <Badge className="bg-primary text-white">In Stock</Badge>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Qty:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-8 h-8 bg-transparent"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">1</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-8 h-8 bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Add to compare</span>
                </label>
              </div>

              <p className="text-sm text-muted-foreground">
                **Price is inclusive of VAT**
              </p>

              <div className="flex space-x-4">
                <Link href={`/order?product=${product.id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3">
                    Order Now
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-5 h-5 text-primary" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-5 h-5 text-primary" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span>30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section for Specifications, Description, and Reviews */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="specifications" className="font-semibold">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="description" className="font-semibold">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="font-semibold">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-2xl font-bold font-serif text-foreground mb-6">
                  Technical Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">
                      Performance
                    </h4>
                    {[
                      { label: "Brand", value: product.brand },
                      { label: "Series", value: product.series },
                      { label: "CPU", value: product.cpu },
                      { label: "Graphics", value: product.graphics },
                      { label: "Display", value: product.display },
                      { label: "Operating System", value: product.os },
                    ].map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-3 border-b border-border/50"
                      >
                        <span className="text-sm font-medium text-muted-foreground">
                          {spec.label}:
                        </span>
                        <span className="text-sm text-foreground max-w-md text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">
                      Memory & Storage
                    </h4>
                    {[
                      { label: "Main memory", value: product.memory },
                      { label: "Storage", value: product.storage },
                      { label: "Connectivity", value: product.connectivity },
                      { label: "Camera", value: product.camera },
                      { label: "Audio", value: product.audio },
                      { label: "Battery", value: product.battery },
                      { label: "Weight", value: product.weight },
                      { label: "Warranty", value: product.warranty },
                    ].map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-3 border-b border-border/50"
                      >
                        <span className="text-sm font-medium text-muted-foreground">
                          {spec.label}:
                        </span>
                        <span className="text-sm text-foreground max-w-md text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="description" className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-2xl font-bold font-serif text-foreground mb-6">
                  Product Description
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">
                    Key Features:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-2xl font-bold font-serif text-foreground mb-6">
                  Customer Reviews
                </h3>
                <div className="text-center py-12">
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 text-gray-300" />
                    ))}
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    No reviews yet
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Be the first to review this product and help others make
                    informed decisions.
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Write a Review
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* You may also like section with related products */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold font-serif text-foreground mb-8">
            You may also like
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "related-1",
                name: "ASUS VivoBook 15 X1504VA",
                price: "₹92,000",
                originalPrice: "₹98,000",
                rating: 4.6,
                reviews: 89,
                specs: "Intel i5 | 8GB RAM | 512GB SSD",
                badge: "Similar",
                badgeColor: "bg-blue-600",
              },
              {
                id: "related-2",
                name: "HP Pavilion 14-dv2000",
                price: "₹85,000",
                rating: 4.4,
                reviews: 156,
                specs: "Intel i5 | 8GB RAM | 256GB SSD",
                badge: "Popular",
                badgeColor: "bg-primary",
              },
              {
                id: "related-3",
                name: "Lenovo IdeaPad Slim 3",
                price: "₹78,000",
                rating: 4.3,
                reviews: 203,
                specs: "AMD Ryzen 5 | 8GB RAM | 512GB SSD",
                badge: "Value",
                badgeColor: "bg-green-600",
              },
              {
                id: "related-4",
                name: "Dell Inspiron 14 5430",
                price: "₹95,000",
                rating: 4.5,
                reviews: 127,
                specs: "Intel i5 | 16GB RAM | 512GB SSD",
                badge: "Premium",
                badgeColor: "bg-purple-600",
              },
            ].map((relatedProduct, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge
                        className={`${relatedProduct.badgeColor} text-white text-xs`}
                      >
                        {relatedProduct.badge}
                      </Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white w-8 h-8"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {relatedProduct.specs}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(relatedProduct.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({relatedProduct.reviews})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold font-serif text-foreground">
                        {relatedProduct.price}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/product/${relatedProduct.id}`}
                        className="flex-1"
                      >
                        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-xs">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-6 h-6 bg-transparent hover:bg-primary hover:text-white"
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
      </div>
    </div>
  );
}
