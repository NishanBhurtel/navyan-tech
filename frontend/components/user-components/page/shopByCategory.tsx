import Link from "next/link";
import {
  Cpu,
  Monitor,
  Laptop,
  Gamepad2,
  Headphones,
} from "lucide-react";

export default function ShopByCategory(){
    return(
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
    )
}