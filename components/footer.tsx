import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">DevXCars</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for finding the perfect luxury vehicle. We
              offer a premium selection of cars with exceptional service.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Car Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cars?category=sedan"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Luxury Sedans
                </Link>
              </li>
              <li>
                <Link
                  href="/cars?category=suv"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Premium SUVs
                </Link>
              </li>
              <li>
                <Link
                  href="/cars?category=sports"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sports Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/cars?category=electric"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Electric Vehicles
                </Link>
              </li>
              <li>
                <Link
                  href="/cars?category=hybrid"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Hybrid Cars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  123 Luxury Lane, Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@DevXCars.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DevXCars. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
