import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

export default function RelatedProducts() {
  const related = [
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
  ];

  return (
    <div className="container mx-auto px-4 mt-16">
      <h3 className="text-3xl font-bold font-serif text-foreground mb-8">
        You may also like
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((p, i) => (
          <Card
            key={i}
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden bg-white hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <Badge className={`${p.badgeColor} text-white text-xs`}>
                    {p.badge}
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
                    {p.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{p.specs}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(p.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({p.reviews})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold font-serif text-foreground">{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {p.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/product/${p.id}`} className="flex-1">
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
  );
}
