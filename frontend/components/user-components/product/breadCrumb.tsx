import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  productName: string;
  productCategory: string;
}

export default function Breadcrumb({ productName, productCategory }: BreadcrumbProps) {
  // Limit product name to 20 characters
  const truncatedProductName =
    productName.length > 20 ? productName.slice(0, 20) + "..." : productName;

  return (
    <div className="container mx-auto px-4 py-4">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/search?categoryId=${productCategory}`} className="hover:text-primary">
          Laptops
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">{truncatedProductName}</span>
      </nav>
    </div>
  );
}

