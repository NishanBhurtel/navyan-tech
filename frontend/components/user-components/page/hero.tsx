"use client"
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAllProducts } from "@/hooks/product/getAllProducts";
import { useAllUsers } from "@/hooks/users/getAllUser";
import DataLoading from "../layout/LoadingPage";
import ErrorState from "../layout/ErrorPage";

export default function Hero() {
  const { data: products, isError, isLoading } = useAllProducts({});

  const { data: users } = useAllUsers();
  const customerCount = users
    ? users.filter((user) => user.role === "customer").length
    : 5000;

  const displayCount = customerCount > 100 ? customerCount : 120;

  if (isLoading)
    return <DataLoading />;
  if (isError || !products)
    return <ErrorState />;

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              New Arrivals
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Build Your
              <span className="text-primary block">Dream PC</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover cutting-edge computers, gaming laptops, and
              high-performance components. Professional-grade hardware for
              creators, gamers, and professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/wishlist">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="#components">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                >
                  Build Custom PC
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {displayCount}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {products?.pagination?.total}+
                </div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
            <img
              src="/hero_image.png"
              alt="Custom PC Components"
              className="relative z-10 w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
