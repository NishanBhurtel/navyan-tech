"use client";
import Link from "next/link";

// Icons for categories
import { Cpu, Monitor, Laptop, Gamepad2, Headphones } from "lucide-react";
import { Category } from "@/components/admin-components/category/types";

type CategoryProps = {
  category?: Category[];
};

// Map category names to icons
const categoryIcons: Record<string, any> = {
  "Laptops": Laptop,
  "Computers": Monitor,
  "Processors": Cpu,
  "Gaming": Gamepad2,
  "Components": Cpu,
  "Accessories": Headphones,
};

const categoryColors: string[] = [
  "from-blue-500 to-purple-600",
  "from-primary to-accent",
  "from-orange-500 to-red-600",
  "from-purple-500 to-pink-600",
  "from-teal-500 to-cyan-600",
  "from-indigo-500 to-blue-600",
  "from-pink-500 to-rose-600",
  "from-emerald-500 to-green-600",
];

export default function ShopByCategory({ category }: CategoryProps) {



  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-muted-foreground">
            Find exactly what you need for your perfect setup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {category?.map((cat, index: number) => {
            const Icon = categoryIcons[cat.name] || Monitor; // default icon
            const color = categoryColors[index % categoryColors.length];

            // Count products for this category
            return (
              <Link key={cat._id} href={`/search?categoryID=${cat._id}`}>
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-muted to-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1">
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${color})`,
                    }}
                  />
                  <div className="relative p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${color} mb-3 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cat.description || "Explore products"}
                    </p>
                    <p className="text-xs font-medium text-primary">
                      {cat.totalItems || 0} items
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
