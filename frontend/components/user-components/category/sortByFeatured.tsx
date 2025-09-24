"use-client"
import { useAllProducts } from "@/hooks/product/getAllProducts";

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
      </div>
      <div className="flex items-center justify-between space-x-4">
        <p className="text-muted-foreground mt-1">
          Showing {products.length} of {allProduct?.pagination.total} products
        </p>
      </div>
    </div>
  );
}
