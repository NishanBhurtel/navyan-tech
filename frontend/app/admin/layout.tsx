"use client"
import { useEffect, useState } from "react";
import type React from "react"
import { Menu } from "lucide-react"
import SideBar from "@/components/admin-components/layout/sideBar";
import { Button } from "@/components/user-components/ui/button";
import { ISession } from "@/lib/utils/types/auth.type";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DataLoading from "@/components/user-components/layout/LoadingPage";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<ISession | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession();
      setSession(sess);
      setLoading(false);
      if (sess?.user.role !== 'admin') {
        router.push('/');
      }
    };
    fetchSession();
  }, []);




  if (loading) {
    return <DataLoading />
  }

  if (!session || !session.user || session.user.role !== 'admin') {
    return <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
    </div>
  };



  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-xl text-gray-800">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
