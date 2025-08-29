"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card"
import { Package, Users, ShoppingCart, FolderTree } from "lucide-react"

export default function StatsGrid() {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Package,
      bg: "bg-[#3450c9]", // soft blue
    },
    {
      title: "Total Users",
      value: "5,678",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      bg: "bg-[#4dc934]", // soft green
    },
    {
      title: "Order Inquiries",
      value: "89",
      change: "+23%",
      changeType: "positive",
      icon: ShoppingCart,
      bg: "bg-[#c93e34]", // soft yellow
    },
    {
      title: "Categories",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: FolderTree,
      bg: "bg-[#c9b834]", // soft purple
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={`${stat.bg} shadow-sm`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
            <stat.icon className="h-5 w-5 text-gray-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-50">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === "positive" ? "text-gray-200" : "text-red-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
