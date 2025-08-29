import { Cpu } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-serif text-foreground">
                  NavyanTech
                </span>
              </Link>
              <p className="text-muted-foreground">
                Your trusted partner for premium computers, laptops, and
                components. Building the future of technology, one PC at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/category/gaming-laptops"
                    className="hover:text-primary transition-colors"
                  >
                    Gaming Laptops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/desktop-pcs"
                    className="hover:text-primary transition-colors"
                  >
                    Desktop PCs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/components"
                    className="hover:text-primary transition-colors"
                  >
                    Components
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/accessories"
                    className="hover:text-primary transition-colors"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
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
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025 NavyanTech. All rights reserved. Built with precision
              and passion.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
