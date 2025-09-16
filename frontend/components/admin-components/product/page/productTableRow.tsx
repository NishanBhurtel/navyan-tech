"use client"

import moment from "moment"
import { TableCell, TableRow } from "@/components/user-components/ui/table"
import ProductActions from "./productAction"
import { IProduct } from "@/lib/utils/types/product.type";


export default function ProductTableRow({ product, onDelete }: { product: IProduct; onDelete: (id: string) => void }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <img
            src={product.images&& product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-12 w-12 rounded-lg object-cover bg-gray-100"
          />
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.brand}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-mono text-sm">{product.brand}</TableCell>
      <TableCell>{product.categoryID.name}</TableCell>
      <TableCell className="font-medium">Rs.{product.discountedPrice.toLocaleString()}</TableCell>
      <TableCell>
        <span
          className={`${
            product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {product.stock}
        </span>
      </TableCell>

      <TableCell className="text-sm text-gray-500">{moment(product.createdAt).format('llll')}</TableCell>
      <TableCell className="text-right">
        <ProductActions productId={product._id} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  )
}
