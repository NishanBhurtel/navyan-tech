import { Button } from "../ui/button";
import {
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
export default function SortByFeatured(){
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
    return(
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
    )
}