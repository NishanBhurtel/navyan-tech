import { Card, CardContent } from "@/components/user-components/ui/card"
import { Users } from "lucide-react"

export default function StatsCard(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-600">
                  Total Subscribers
                </p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}