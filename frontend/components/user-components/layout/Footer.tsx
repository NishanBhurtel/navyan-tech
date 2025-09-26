"use client";
import { useCategories } from "@/hooks/categories/getCategories";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import ErrorState from "./ErrorPage";
import DataLoading from "./LoadingPage";

const Footer = () => {
  const { data: categories, isError, isLoading } = useCategories();

  if (isLoading)
    return <DataLoading  />;
  if (isError || !categories)
    return <ErrorState />

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
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

          {/* Social Icons */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="space-y-2 text-muted-foreground">
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  {" "}
                  <Link
                    href="https://www.facebook.com/navyantechstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors flex items-center w-28"
                  >
                    Facebook <Facebook className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    href="https://www.instagram.com/navyantech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-600 transition-colors gap-1 flex items-center w-28"
                  >
                    Instagram <Instagram className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    href="https://www.youtube.com/@navyantechstore9923/featured"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 transition-colors gap-1 flex items-center w-28"
                  >
                    Youtube <Youtube className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.tiktok.com/@navyantratrading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors gap-1 flex items-center w-28"
                  >
                    Tiktok <FaTiktok className="w-4 h-4" />{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>
            &copy; 2025 NavYantra. All rights reserved. Built with precision
            and passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
