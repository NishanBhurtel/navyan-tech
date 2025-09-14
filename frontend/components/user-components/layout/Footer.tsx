"use client";
import { useCategories } from "@/hooks/categories/getCategories";
import Link from "next/link";

const Footer = () => {
  const { data: categories, isError, isLoading } = useCategories();

  if (isLoading)
    return <div className="p-12 text-center">Loading categories...</div>;
  if (isError || !categories)
    return <div className="p-12 text-center">Categories Not Found</div>;

  return (
    <footer className="bg-card border-t border-border py-16 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-28 h-15 rounded-lg flex items-center justify-center">
                <img src="/NavYantra-Logo.png" alt="NavYantra Logo" />
              </div>
            </Link>
            <p className="text-muted-foreground">
              Your trusted partner for premium computers, laptops, and
              components. Building the future of technology, one PC at a time.
            </p>
          </div>

          {/* Dynamic Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2 text-muted-foreground">
              {categories?.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/search?categoryId=${cat._id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Customer Service
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Press
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>
            &copy; 2025 NavyanTech. All rights reserved. Built with precision
            and passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
