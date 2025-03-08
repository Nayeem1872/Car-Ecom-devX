"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Phone } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import ShoppingCartSidebar from "./shopping-cart-sidebar"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const { cartItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
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
                pathname === "/contact" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center mr-4">
              <Phone className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">+1 (555) 123-4567</span>
            </div>

            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart} aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs animate-fade-in bg-primary"
                  variant="default"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button variant="default" className="hidden md:inline-flex bg-primary hover:bg-primary/90">
              Sign In
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                href="/contact"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === "/contact"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2">
                <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ShoppingCartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

