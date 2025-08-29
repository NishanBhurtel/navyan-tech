import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card"
import { Package, Mail, FolderTree } from "lucide-react"

export default function QuickAction(){
    return(
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
    )
}