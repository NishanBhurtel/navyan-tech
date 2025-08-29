import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Heart, Star } from "lucide-react";
export default function ProductGrid() {
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
                <Badge className={`${product.badgeColor} text-white text-xs`}>
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
                <p className="text-sm text-muted-foreground">{product.specs}</p>
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
                  <Link href={`/product/${product.id}`} >View Details</Link>
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
  );
}
