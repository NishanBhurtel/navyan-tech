"use client"

import { TableCell, TableRow } from "@/components/user-components/ui/table"
import { Badge } from "@/components/user-components/ui/badge"
import ProductActions from "./productAction"

interface Product {
  id: number
  name: string
  sku: string
  category: string
  subcategory: string
  price: number
  stock: number
  status: string
  images: string[]
  createdAt: string
}

export default function ProductTableRow({ product, onDelete }: { product: Product; onDelete: (id: number) => void }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-12 w-12 rounded-lg object-cover bg-gray-100"
          />
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.subcategory}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell className="font-medium">₹{product.price.toLocaleString()}</TableCell>
      <TableCell>
        <span
          className={`${
            product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {product.stock}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
      </TableCell>
      <TableCell className="text-sm text-gray-500">{product.createdAt}</TableCell>
      <TableCell className="text-right">
        <ProductActions productId={product.id} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  )
}
