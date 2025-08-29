import { useRouter } from "next/navigation"
import { Button } from "@/components/user-components/ui/button"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"

export default function AddProductHeader(){
      const router = useRouter()

    return(
         <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Create a new product listing</p>
        </div>
      </div>
    )
}