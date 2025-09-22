"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/user-components/ui/table";
import ProductTableRow from "./productTableRow";
import { IProduct } from "@/lib/utils/types/product.type";

interface ProductTableProps {
  products: IProduct[];
  onDelete: (id: string) => void;
  onSetActive: (id: string, isActive: boolean) => void;
}

export default function ProductTable({
  products,
  onDelete,
  onSetActive,
}: ProductTableProps) {
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
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductTableRow
              key={product._id}
              product={product}
              onDelete={onDelete}
              onSetActive={onSetActive}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
