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
  currentPageNo: number;
  products: IProduct[];
  onDelete: (id: IProduct) => void;
  onSetActive: (id: string, isActive: boolean) => void;
}

export default function ProductTable({
  currentPageNo,
  products,
  onDelete,
  onSetActive,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N.</TableHead>
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
          {products.map((product, i) => {
            const SN = ((currentPageNo-1) * 9) + (i+1);
            return (
              <ProductTableRow
                sn={SN}
                key={product._id}
                product={product}
                onDelete={onDelete}
                onSetActive={onSetActive}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
