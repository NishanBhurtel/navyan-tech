"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, ShoppingCart, Eye, Heart, Mail, FolderTree } from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: Package,
  },
  {
    title: "Total Users",
    value: "5,678",
    change: "+8%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Order Inquiries",
    value: "89",
    change: "+23%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Categories",
    value: "24",
    change: "+2",
    changeType: "positive",
    icon: FolderTree,
  },
]

const recentActivities = [
  {
    type: "order",
    message: "New order inquiry for ASUS ROG Laptop",
    time: "2 minutes ago",
    icon: ShoppingCart,
  },
  {
    type: "user",
    message: "New user registration: john@example.com",
    time: "15 minutes ago",
    icon: Users,
  },
  {
    type: "product",
    message: "Product added: MSI Gaming Desktop",
    time: "1 hour ago",
    icon: Package,
  },
  {
    type: "email",
    message: "Email campaign sent to 1,200 users",
    time: "2 hours ago",
    icon: Mail,
  },
]

const topProducts = [
  { name: "ASUS ROG Strix Gaming Laptop", views: 1234, wishlist: 89 },
  { name: "MSI Gaming Desktop RTX 4080", views: 987, wishlist: 67 },
  { name: "MacBook Pro M3 16-inch", views: 856, wishlist: 123 },
  { name: "Dell XPS 13 Ultrabook", views: 743, wishlist: 45 },
  { name: "HP Pavilion Gaming Desktop", views: 621, wishlist: 34 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye className="h-3 w-3 mr-1" />
                        {product.views}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Heart className="h-3 w-3 mr-1" />
                        {product.wishlist}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600">#{index + 1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Package className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Add New Product</h3>
              <p className="text-sm text-gray-500">Create a new product listing</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <FolderTree className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Categories</h3>
              <p className="text-sm text-gray-500">Organize product categories</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Mail className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Send Email Campaign</h3>
              <p className="text-sm text-gray-500">Notify all registered users</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
