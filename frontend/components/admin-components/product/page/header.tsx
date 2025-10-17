import Link from "next/link"
import { Button } from "@/components/user-components/ui/button"
import { Plus } from "lucide-react"

interface ProductHeaderProps {
  totalProducts?: number;
}

export default function ProductHeader({totalProducts}:ProductHeaderProps){
    return(
           <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Products ({totalProducts})</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/add">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>
    )
}