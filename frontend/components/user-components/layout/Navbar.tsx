"use client";

import Link from "next/link";
import {
  Search,
  User,
  Heart,
  ChevronDown,
  Phone,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useCategories } from "@/hooks/categories/getCategories";
import { getWishlist } from "@/lib/localStorage/wishlist.localStorage";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ErrorState from "./ErrorPage";
import DataLoading from "./LoadingPage";
import { getSession } from "next-auth/react";
import { ISession } from "@/lib/utils/types/auth.type";
import { signOut } from "next-auth/react";


interface FormValues {
  search: string;
}

const Navbar = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [token, setToken] = useState<string | null>(null);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<ISession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession();
      setSession(sess);
    };
    fetchSession();
  }, []);



  const { register, watch } = useForm<FormValues>({
    defaultValues: { search: "" },
  });
  const searchValue = watch("search");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchValue.trim()) query.set("search", searchValue.trim());
    router.push(`/search?${query.toString()}`);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const items = getWishlist();
    setWishlistItems(items.slice().reverse());
  }, []);

  if (isLoading) 
    return <DataLoading  />;
  if (error) 
    return <ErrorState />

  const handleLogout = async () => {
    signOut({
      redirect: true,           // redirect after logout
      callbackUrl: "/",    // where to go after logout
    });
  };

  const authUser = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top bar */}
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/NavYantra-Logo.png" alt="logo" className="h-10 w-auto" />
        </Link>

        {/* Search (hidden on xs) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-6">
          <form onSubmit={handleSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search for computers, laptops, components..."
              className="pl-10 pr-4 py-2 w-full bg-muted/50 border-border focus:bg-background"
              {...register("search")}
            />
          </form>
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {authUser ? (
            <>
              <Link href="/wishlist" className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-6 h-6" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-primary rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
                <span className="hidden md:inline">Wishlist</span>
              </Link>

              <Link href="/contact">
                <Button variant="ghost" size="sm" className="space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="hidden md:inline">Contact</span>
                </Button>
              </Link>

              <Button variant="outline" className="flex items-center space-x-2" onClick={handleLogout}>
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/contact">
                <Button variant="ghost" size="sm" className="space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="hidden md:inline">Contact</span>
                </Button>
              </Link>
              <Link href="/wishlist" className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-6 h-6" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-primary rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
                <span className="hidden md:inline">Wishlist</span>
              </Link>

              <Link href="/login">
                <Button variant="ghost" size="sm" className="space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger for md and below */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted/40"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="max-h-[70vh] overflow-y-auto px-4 py-3 space-y-4">
            {/* Search */}
            <form onSubmit={handleSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full bg-muted/50 border-border focus:bg-background"
                {...register("search")}
              />
            </form>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {session ? (
                <>
                  <Link href="/wishlist">
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>
                        Wishlist
                        {wishlistItems.length > 0
                          ? ` (${wishlistItems.length})`
                          : ""}
                      </span>
                    </Button>
                  </Link>

                  <Link href="/mycart">
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>My Cart</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/contact">
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Contact</span>
                    </Button>
                  </Link>
                  <Link href="/wishlist">
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>
                        Wishlist
                        {wishlistItems.length > 0
                          ? ` (${wishlistItems.length})`
                          : ""}
                      </span>
                    </Button>
                  </Link>

                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile / Tablet (<lg) */}
            <div className="lg:hidden">
              <div className="px-4 py-3">
                <h3 className="text-base font-semibold mb-2">Categories</h3>
                <ul className="divide-y divide-border">
                  {categories?.map((cat) => (
                    <li key={cat._id} className="py-2">
                      {cat.subCategories?.length ? (
                        <details className="group">
                          <summary className="flex items-center justify-between cursor-pointer px-1">
                            <span>{cat.name}</span>
                            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                          </summary>
                          <ul className="pl-1 mt-2 space-y-1">
                            {cat.subCategories.map((sub) => (
                              <li key={sub._id}>
                                <Link
                                  href={`/search?subCategoryID=${sub._id}`}
                                  className="block py-1 text-[14px] text-gray-700 hover:text-primary"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <Link
                          href={`/search?categoryID=${cat._id}`}
                          className="block px-1 text-gray-800 hover:text-primary"
                        >
                          {cat.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Categories: responsive */}
      <div className="border-t border-border bg-muted/30">
        {/* Desktop (lg+) horizontal nav */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center space-x-8 py-3">
              {categories?.map((cat) => (
                <div key={cat._id} className="relative group">
                  <Link
                    href={`/search?categoryID=${cat._id
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium"
                  >
                    <span>{cat.name}</span>
                    {cat.subCategories?.length ? (
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    ) : null}
                  </Link>

                  {cat.subCategories?.length ? (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {cat.subCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/search?subCategoryID=${sub._id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
