"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  vendor?: any;
}

export default function Navbar({ vendor }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">DevX</span>Cars
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Home
            </Link>
            <Link
              href="/cars"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/cars" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Cars
            </Link>
            <Link
              href="/financing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/financing"
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              Financing
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-primary" : "text-foreground/80"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/financing"
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center mr-4">
              <Phone className="h-4 w-4 text-primary mr-2" />+
              {vendor?.phoneNo?.[0] ? vendor.phoneNo[0] : ""}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-1 px-4 pb-3 pt-2 bg-background/95 backdrop-blur-md">
              <Link
                href="/"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === "/"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/cars"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === "/cars"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cars
              </Link>
              <Link
                href="/about"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === "/about"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/financing"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === "/financing"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Financing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
