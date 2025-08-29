import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Heart,
  Star,
  ChevronRight,
} from "lucide-react";
export default function GamingLaptop(){
    return(
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
                originalPrice: "$2,499.99",                specs: "RTX 4070 | Intel i9 | 32GB RAM",
                badge: "Premium",
                badgeColor: "bg-purple-600",
              },
              {
                id: 14,
                name: "Razer Blade 15",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jPU8D2x7iP74x_JzNbjwBJmu9HHCDiO7hA&s",
                price: "$1,899.99",
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
                specs: "RTX 4050 | AMD Ryzen 5 | 8GB RAM",
                badge: "Budget",
                badgeColor: "bg-orange-600",
              },
              {
                id: 18,
                name: "MSI GE76 Raider",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQb1QR9RyfcJXanyTtrhO41kSLp2Vv1UOyw&s",
                price: "$2,499.99",                specs: "RTX 4080 | Intel i9 | 32GB RAM",
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
    )
}