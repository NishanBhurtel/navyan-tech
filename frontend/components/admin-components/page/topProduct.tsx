import { Card, CardContent, CardHeader, CardTitle } from "@/components/user-components/ui/card"
import { Eye, Heart} from "lucide-react"

const topProducts = [
  { name: "ASUS ROG Strix Gaming Laptop", views: 1234, wishlist: 89 },
  { name: "MSI Gaming Desktop RTX 4080", views: 987, wishlist: 67 },
  { name: "MacBook Pro M3 16-inch", views: 856, wishlist: 123 },
  { name: "Dell XPS 13 Ultrabook", views: 743, wishlist: 45 },
  { name: "HP Pavilion Gaming Desktop", views: 621, wishlist: 34 },
]
export default function TopProduct(){
    return(
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
    )
}