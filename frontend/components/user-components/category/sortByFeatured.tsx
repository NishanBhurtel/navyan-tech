
type ProductGridProps = {
 filteredProductCount: number;
 totalProductsCount?: number;
};

export default function SortByFeatured({ filteredProductCount , totalProductsCount}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-bold text-foreground">
          Searched Products
        </h1>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <p className="text-muted-foreground mt-1">
          Showing {filteredProductCount} of {totalProductsCount} products
        </p>
      </div>
    </div>
  );
}
