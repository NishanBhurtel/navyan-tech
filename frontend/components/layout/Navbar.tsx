import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  User,
  Heart,
  Star,
  Cpu,
  Monitor,
  ChevronRight,
  Laptop,
  Gamepad2,
  Headphones,
  ChevronDown,
  Phone,
} from "lucide-react";

const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-18 h-15  rounded-lg flex items-center justify-center">
              {/* <span className="text-white font-bold text-sm"></span> */}
              <img src="/NavYantra-Logo.png" alt="" />
            </div>

            <span className="text-xl font-bold text-foreground">
              Navyan Tech
            </span>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search for computers, laptops, components..."
                className="pl-10 pr-4 py-2 w-full bg-muted/50 border-border focus:bg-background"
              />
            </div>
          </div>

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
        </div>

        <div className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center space-x-8 py-3">
              <div className="relative group">
                <Link
                  href="/category/computers"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
                >
                  <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Computers</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/category/gaming-desktops"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Gaming Desktops
                    </Link>
                    <Link
                      href="/category/workstations"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Workstations
                    </Link>
                    <Link
                      href="/category/mini-pcs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mini PCs
                    </Link>
                    <Link
                      href="/category/all-in-ones"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All-in-Ones
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link
                  href="/category/laptops"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
                >
                  <Laptop className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Laptops</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/category/gaming-laptops"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Gaming Laptops
                    </Link>
                    <Link
                      href="/category/ultrabooks"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ultrabooks
                    </Link>
                    <Link
                      href="/category/business-laptops"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Business Laptops
                    </Link>
                    <Link
                      href="/category/chromebooks"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Chromebooks
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link
                  href="/category/components"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
                >
                  <Cpu className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Components</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/category/processors"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Processors
                    </Link>
                    <Link
                      href="/category/graphics-cards"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Graphics Cards
                    </Link>
                    <Link
                      href="/category/motherboards"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Motherboards
                    </Link>
                    <Link
                      href="/category/memory"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Memory & Storage
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link
                  href="/category/gaming"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
                >
                  <Gamepad2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Gaming</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/category/gaming-chairs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Gaming Chairs
                    </Link>
                    <Link
                      href="/category/gaming-keyboards"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Gaming Keyboards
                    </Link>
                    <Link
                      href="/category/gaming-mice"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Gaming Mice
                    </Link>
                    <Link
                      href="/category/headsets"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Gaming Headsets
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link
                  href="/category/accessories"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group"
                >
                  <Headphones className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Accessories</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/category/monitors"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Monitors
                    </Link>
                    <Link
                      href="/category/speakers"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Speakers
                    </Link>
                    <Link
                      href="/category/webcams"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Webcams
                    </Link>
                    <Link
                      href="/category/cables"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cables & Adapters
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
