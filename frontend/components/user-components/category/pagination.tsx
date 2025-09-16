import { Button } from "../ui/button";

export default function Pagination() {
  const totalPages = 5;
  const currentPage = 1;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-6 sm:pt-8">
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent px-3 sm:px-4"
      >
        Previous
      </Button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          className={`px-3 sm:px-4 ${page !== currentPage ? "bg-transparent" : ""} 
            ${page > 3 ? "hidden sm:inline-flex" : "inline-flex"}`}
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent px-3 sm:px-4"
      >
        Next
      </Button>
    </div>
  );
}
