import { Button } from "@/components/user-components/ui/button"
import {
  Download,
} from "lucide-react"
export default function OrderHeader(){
    return(
              <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Order Inquiries</h1>
          <p className="text-gray-600 mt-2">Manage customer product inquiries and follow-ups</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    )
}