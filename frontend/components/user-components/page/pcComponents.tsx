import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Heart,
    Star,
    ChevronRight,
} from "lucide-react";
export default function PcComponents() {
    return (
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
    )
}