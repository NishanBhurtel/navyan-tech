"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card"
import { Package, Users, ShoppingCart, Mail} from "lucide-react"

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

export default function RecentActivity(){
    return(
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
    )
}