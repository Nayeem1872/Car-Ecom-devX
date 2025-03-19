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
import { fetchCategories } from "@/hooks/ApiHooks";
import { useEffect, useState } from "react";
interface FooterProps {
  vendor?: any;
}

export default function Footer({ vendor }: FooterProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  console.log("Vendor", vendor);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  console.log("Categories", categories);

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
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/cars`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  {vendor?.vendorAddress?.[0] ? (
                    <>
                      {vendor.vendorAddress[0].street &&
                        `${vendor.vendorAddress[0].street}, `}
                      {vendor.vendorAddress[0].city &&
                        `${vendor.vendorAddress[0].city}, `}
                      {vendor.vendorAddress[0].state &&
                        `${vendor.vendorAddress[0].state}, `}
                      {vendor.vendorAddress[0].country &&
                        `${vendor.vendorAddress[0].country}, `}
                      {vendor.vendorAddress[0].postalCode}
                    </>
                  ) : (
                    "Address not available"
                  )}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  + {vendor?.phoneNo?.[0] ? vendor.phoneNo[0] : ""}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  {" "}
                  {vendor?.serviceEmail ? vendor.serviceEmail : ""}
                </span>
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
