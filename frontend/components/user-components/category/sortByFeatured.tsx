import { useAllProducts } from "@/hooks/product/getAllProducts";
import { SlidersHorizontal } from "lucide-react";

type ProductGridProps = {
  products: any[];
};

export default function SortByFeatured({ products }: ProductGridProps) {
  const {data: allProduct } = useAllProducts({});
  return (
    <div className="grid grid-cols-1">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-bold text-foreground">
          Gaming Laptops
        </h1>
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <select className="bg-background border text-[14px] border-border rounded-md px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <p className="text-muted-foreground mt-1">
          Showing {products.length} of {allProduct?.length} products
        </p>
      </div>
    </div>
  );
}
