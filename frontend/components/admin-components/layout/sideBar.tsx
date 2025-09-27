"use client";
import { Button } from "@/components/user-components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Mail,
  FolderTree,
  X,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function SideBar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  const sidebarItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/categories", icon: FolderTree, label: "Categories" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Order Inquiries" },
    { href: "/admin/email", icon: Mail, label: "Email" },
  ];


  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-24 h-15 rounded-lg flex items-center justify-center">
              <img src="/logos/NavYantra-Logo.png" alt="" />
            </div>
          </Link>
        </div>

        {/* Close button for mobile */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="mt-6 px-3 flex-1">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                  ? "bg-green-50 text-green-700 border-r-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${isActive ? "text-green-500" : "text-gray-400"
                    }`}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-white cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
