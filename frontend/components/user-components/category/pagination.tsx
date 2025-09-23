import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  maxLimit?: number;
  onPageChange: (page: number) => void; // ✅ tell TS that page is a number
}

export default function Pagination({
  totalPages,
  currentPage,
  maxLimit = 10,
  onPageChange,
}: PaginationProps) {
  const safeCurrent = Math.min(Math.max(currentPage, 1), totalPages);

  const half = Math.floor(maxLimit / 2);
  let start = Math.max(1, safeCurrent - half);
  let end = Math.min(totalPages, start + maxLimit - 1);
  if (end - start + 1 < maxLimit) {
    start = Math.max(1, end - maxLimit + 1);
  }
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-6 sm:pt-8">
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent px-3 sm:px-4"
        disabled={safeCurrent === 1}
        onClick={() => safeCurrent > 1 && onPageChange(safeCurrent - 1)}
      >
        Previous
      </Button>

      {/* Page numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === safeCurrent ? "default" : "outline"}
          size="sm"
          className={`px-3 sm:px-4 ${
            page !== safeCurrent ? "bg-transparent" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent px-3 sm:px-4"
        disabled={safeCurrent === totalPages}
        onClick={() =>
          safeCurrent < totalPages && onPageChange(safeCurrent + 1)
        }
      >
        Next
      </Button>
    </div>
  );
}
