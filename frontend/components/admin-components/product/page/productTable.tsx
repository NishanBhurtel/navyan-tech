"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/user-components/ui/table"
import ProductTableRow from "./productTableRow"

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

interface ProductTableProps {
  products: Product[]
  onDelete: (id: number) => void
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductTableRow key={product.id} product={product} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
