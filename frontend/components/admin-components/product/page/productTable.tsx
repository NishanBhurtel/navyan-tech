"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/user-components/ui/table"
import ProductTableRow from "./productTableRow"
import { IProduct } from "@/lib/utils/types/product.type"



interface ProductTableProps {
  products: IProduct[]
  onDelete: (id: string) => void
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductTableRow key={product._id}  product={product} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
