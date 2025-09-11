"use client";
import Link from "next/link";

import {
  Search,
  User,
  Heart,
  ChevronDown,
  Phone,
  ShoppingCart,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCategories } from "@/hooks/categories/getCategories";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

interface FormValues {
  search: string;
}

const Navbar = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [token, setToken] = useState<string | null>(null);

  const { register, watch } = useForm<FormValues>({
    defaultValues: { search: "" },
  });
  const searchValue = watch("search");

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();
    if (searchValue.trim()) {
      query.set("search", searchValue.trim());
    }

    router.push(`/search?${query.toString()}`);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-18 h-15  rounded-lg flex items-center justify-center">
              <img src="/NavYantra-Logo.png" alt="" />
            </div>
          </Link>

           <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search for computers, laptops, components..."
              className="pl-10 pr-4 py-2 w-full bg-muted/50 border-border focus:bg-background"
              {...register("search")}
            />
          </form>
        </div>

          {token ? (
            <div className="flex items-center space-x-4">
              <Link href="/wishlist">
                {/* Wishlist */}
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-6 h-6" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-primary rounded-full p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                <span className="hidden md:inline">Wishlist</span>
              </Link>

              <Link href="mycart">
                {/* Cart */}
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-primary rounded-full p-0 flex items-center justify-center">
                    2
                  </Badge>
                </Button>
                <span className="hidden md:inline">My Cart</span>
              </Link>

              {/* Logout */}
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden md:inline">Contact</span>
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden md:inline">Wishlist</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4">
          
            <nav className="flex items-center justify-center space-x-8 py-3">
              {categories?.map((cat) => (
                <div key={cat._id} className="relative group">
                  <Link
                    href={`/search?cateogryID=${cat._id
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>

                  {cat.subCategories && cat.subCategories.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {cat.subCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/search?subCategoryID=${sub._id
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;