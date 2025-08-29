import { Card, CardContent } from "@/components/user-components/ui/card"
import { Users, UserCheck } from "lucide-react"

interface UserStatsProps {
  stats: {
    total: number
    active: number
    inactive: number
    banned: number
    newThisMonth: number
  }
}

export default function UserStats({ stats }: UserStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-blue-600" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <UserCheck className="h-4 w-4 text-green-600" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-yellow-600 rounded-full" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-purple-600 rounded-full" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newThisMonth}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
