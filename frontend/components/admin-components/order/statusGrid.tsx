"use client"
import { Card, CardContent } from "@/components/user-components/ui/card"
import { AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react"
import { InquiryStats } from "./order-inqueries"

interface StatsGridProps {
  stats: InquiryStats
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-600 rounded-full" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">New</p>
              <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 text-yellow-600" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">Contacted</p>
              <p className="text-2xl font-bold text-gray-900">{stats.contacted}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-purple-600" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-red-600 rounded-full" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}