import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
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
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import Annoucement from "@/components/layout/Annoucement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CategoryPage() {
  const products = [
    {
      id: 1,
      name: "ASUS ROG Strix G15",
      image:
        "https://admin.itti.com.np/storage/product/asus-vivobook-14-x1405va-13th-gen-price-nepal-intel-core-i5-13420h-8gb-512gb-ssd-14-win11-backlit-keyboard-fingerprint/5f98fa29-937a-420c-8ab7-c3a003e91ccc.webp",
      price: "$1,299.99",
      originalPrice: "$1,499.99",
      rating: 4.6,
      reviews: 189,
      specs: "RTX 4060 | Ryzen 7 | 16GB RAM",
      badge: "Popular",
      badgeColor: "bg-primary",
      brand: "ASUS",
      category: "Gaming Laptop",
    },
    {
      id: 2,
      name: "MSI Katana 15",
      image:
        "https://storage-asset.msi.com/global/picture/image/feature/nb/GF/Katana-15-A13V/photo15-3.png",
      price: "$999.99",
      rating: 4.4,
      reviews: 156,
      specs: "RTX 4050 | Intel i7 | 16GB RAM",
      badge: "Value",
      badgeColor: "bg-green-600",
      brand: "MSI",
      category: "Gaming Laptop",
    },
    {
      id: 3,
      name: "Alienware m15 R7",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfIS5sk2rA13vnqxflvmQBVWayx_cvw9RRVg&s",
      price: "$2,199.99",
      originalPrice: "$2,499.99",
      rating: 4.8,
      reviews: 94,
      specs: "RTX 4070 | Intel i9 | 32GB RAM",
      badge: "Premium",
      badgeColor: "bg-purple-600",
      brand: "Dell",
      category: "Gaming Laptop",
    },
    {
      id: 4,
      name: "Razer Blade 15",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6meBb0BF0-kGk4iu3mHL18NPYvSXE_hmIWw&s",
      price: "$1,899.99",
      rating: 4.7,
      reviews: 203,
      specs: "RTX 4060 | Intel i7 | 16GB RAM",
      badge: "Sleek",
      badgeColor: "bg-gray-600",
      brand: "Razer",
      category: "Gaming Laptop",
    },
    {
      id: 5,
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
      brand: "HP",
      category: "Gaming Laptop",
    },
    {
      id: 6,
      name: "Lenovo Legion 5 Pro",
      image:
        "https://mudita.com.np/media/catalog/product/cache/5f4a658faeee583187031a67361d4d52/l/e/lenovo-legion-pro-5i-i9_1_1.webp",
      price: "$1,399.99",
      rating: 4.6,
      reviews: 245,
      specs: "RTX 4060 | AMD Ryzen 7 | 16GB RAM",
      badge: "Pro",
      badgeColor: "bg-blue-600",
      brand: "Lenovo",
      category: "Gaming Laptop",
    },
    {
      id: 7,
      name: "ASUS TUF Gaming A15",
      image:
        "https://www.asus.com/media/global/gallery/c0fgpdhpjyf8ajft_setting_xxx_0_90_end_800.png",
      price: "$899.99",
      originalPrice: "$1,099.99",
      rating: 4.3,
      reviews: 167,
      specs: "RTX 4050 | AMD Ryzen 5 | 8GB RAM",
      badge: "Budget",
      badgeColor: "bg-orange-600",
      brand: "ASUS",
      category: "Gaming Laptop",
    },
    {
      id: 8,
      name: "MSI GE76 Raider",
      image:
        "https://asset.msi.com/resize/image/global/product/product_1607066826c8f8cac0407f130ab5aedbc0763777cc.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
      price: "$2,499.99",
      rating: 4.8,
      reviews: 89,
      specs: "RTX 4080 | Intel i9 | 32GB RAM",
      badge: "Beast",
      badgeColor: "bg-indigo-600",
      brand: "MSI",
      category: "Gaming Laptop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <Annoucement />

      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Filter className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold font-serif text-foreground">
                      Filters
                    </h2>
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "Gaming Laptops", count: 45 },
                        { name: "Ultrabooks", count: 32 },
                        { name: "2-in-1 Laptops", count: 18 },
                        { name: "Workstations", count: 12 },
                        { name: "Chromebooks", count: 8 },
                      ].map((category) => (
                        <div
                          key={category.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={category.name} />
                          <label
                            htmlFor={category.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{category.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({category.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Price Range */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[500, 2500]}
                        max={3000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>$500</span>
                        <span>$2,500</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Brands */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Brands</h3>
                    <div className="space-y-3">
                      {[
                        { name: "ASUS", count: 28 },
                        { name: "MSI", count: 22 },
                        { name: "Dell", count: 18 },
                        { name: "HP", count: 15 },
                        { name: "Lenovo", count: 12 },
                        { name: "Razer", count: 8 },
                        { name: "Acer", count: 6 },
                      ].map((brand) => (
                        <div
                          key={brand.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={brand.name} />
                          <label
                            htmlFor={brand.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{brand.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({brand.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Processor */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Processor</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Intel Core i9", count: 15 },
                        { name: "Intel Core i7", count: 32 },
                        { name: "Intel Core i5", count: 28 },
                        { name: "AMD Ryzen 9", count: 12 },
                        { name: "AMD Ryzen 7", count: 25 },
                        { name: "AMD Ryzen 5", count: 18 },
                      ].map((processor) => (
                        <div
                          key={processor.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={processor.name} />
                          <label
                            htmlFor={processor.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{processor.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({processor.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Graphics Card */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Graphics Card
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "RTX 4080", count: 8 },
                        { name: "RTX 4070", count: 15 },
                        { name: "RTX 4060", count: 25 },
                        { name: "RTX 4050", count: 18 },
                        { name: "GTX 1660 Ti", count: 12 },
                        { name: "Integrated", count: 22 },
                      ].map((gpu) => (
                        <div
                          key={gpu.name}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={gpu.name} />
                          <label
                            htmlFor={gpu.name}
                            className="text-sm text-foreground cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{gpu.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({gpu.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 bg-transparent"
                  >
                    Clear All
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold font-serif text-foreground">
                    Gaming Laptops
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Showing {products.length} of 156 products
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                    <select className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Sort by: Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Customer Rating</option>
                      <option>Newest First</option>
                      <option>Best Selling</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-1 border border-border rounded-md p-1">
                    <Button size="icon" variant="ghost" className="w-8 h-8">
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8">
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Product Image */}
                        <div className="w-full h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                          {/* <span className="text-sm text-gray-400">
                            Product Image
                          </span> */}
                          <img src={product.image} alt="" />
                        </div>

                        <div className="flex items-start justify-between">
                          <Badge
                            className={`${product.badgeColor} text-white text-xs`}
                          >
                            {product.badge}
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
                          <p className="text-xs text-primary font-medium">
                            {product.brand}
                          </p>
                          <h3 className="text-lg font-bold font-serif text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.specs}
                          </p>
                        </div>

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

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold font-serif text-foreground">
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-sm">
                            View Details
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-10 h-10 bg-transparent hover:bg-primary hover:text-white"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center space-x-2 pt-8">
                <Button variant="outline" className="bg-transparent">
                  Previous
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className={page === 1 ? "" : "bg-transparent"}
                    size="icon"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" className="bg-transparent">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <Footer />
    </div>
  );
}
