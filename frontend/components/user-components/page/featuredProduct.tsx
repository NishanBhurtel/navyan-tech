import Link from "next/link";

import {
  Heart,
  Star,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
export default function FeaturedProduct(){
    return(
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
                originalPrice: "$219.99",
                badge: "Fast",
                badgeColor: "bg-blue-600",
                discount: "13% OFF",
                category: "Memory",
              },
              {
                id: 6,
                name: "Samsung 980 PRO SSD",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmnPwZ2sFKQrU_ZaO9tc6Wttnsz8kfeGEapQ&s",
                price: "$129.99",
                originalPrice: "$149.99",
                badge: "Speed",
                badgeColor: "bg-green-600",
                discount: "13% OFF",
                category: "Storage",
              },
              {
                id: 7,
                name: "ASUS ROG Strix X670E",
                image:
                  "https://dlcdnwebimgs.asus.com/files/media/B51D103D-2941-412E-8479-AF994957093B/v1/img/spec/connectivity-m.png",
                price: "$449.99",
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
    )
}