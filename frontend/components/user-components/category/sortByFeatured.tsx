import { Button } from "../ui/button";
import {
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";

type ProductGridProps = {
  products: any[];
};

export default function SortByFeatured({ products }: ProductGridProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold font-serif text-foreground">
          Gaming Laptops
        </h1>
        <p className="text-muted-foreground mt-1">
          Showing {products.length} of 156 products
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <select className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
        <div className="flex items-center space-x-1 border border-border rounded-md p-1">
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
