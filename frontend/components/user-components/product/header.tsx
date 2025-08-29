import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Cpu, Heart, Monitor, Laptop, Gamepad2, Headphones, Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold font-serif text-foreground">Navyan Tech</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for computers, laptops, components..."
            className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl border border-border focus:ring-2 focus:ring-primary text-sm"
          />
          <Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 px-4">Search</Button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="w-5 h-5" />
            <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-primary">3</Badge>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-primary">2</Badge>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-border bg-muted/30">
        <nav className="container mx-auto px-4 flex items-center justify-center space-x-8 py-3">
          {[
            { icon: <Monitor className="w-4 h-4" />, label: "Computers" },
            { icon: <Laptop className="w-4 h-4" />, label: "Laptops" },
            { icon: <Cpu className="w-4 h-4" />, label: "Components" },
            { icon: <Gamepad2 className="w-4 h-4" />, label: "Gaming" },
            { icon: <Headphones className="w-4 h-4" />, label: "Accessories" },
          ].map((item, i) => (
            <a key={i} href="#" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium group">
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
