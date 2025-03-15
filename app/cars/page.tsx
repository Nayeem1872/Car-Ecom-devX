"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Heart, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { fetchBrands, fetchCategories } from "@/hooks/ApiHooks";
import axios from "axios";

const years = ["All", "2023", "2022", "2021", "2020"];

export default function CarsPage() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 250000]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Fetch brands and categories then transform the data to a simple string array
      try {
        const brandsData = await fetchBrands();
        const brandNames = [
          "All",
          ...brandsData.map((brand: any) => brand.name),
        ];
        setBrands(brandNames);
      } catch (error) {
        console.error("Error fetching Brands:", error);
      }

      try {
        const categoriesData = await fetchCategories();
        const categoryNames = [
          "All",
          ...categoriesData.map((cat: any) => cat.name),
        ];
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }

      // Fetch products from your API
      try {
        const response = await axios.get("/api/ecom/product/get?all=true");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      // Use the first image if available
      image:
        product.images && product.images.length
          ? product.images[0]
          : "/placeholder.svg",
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter products using API data.
  const filteredCars = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category.name === selectedCategory;
    const matchesBrand =
      selectedBrand === "All" || product.brand.name === selectedBrand;
    // Derive year from createdAt date
    const productYear = new Date(product.createdAt).getFullYear().toString();
    const matchesYear = selectedYear === "All" || productYear === selectedYear;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesYear &&
      matchesPrice
    );
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Our Car Collection
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Browse our extensive collection of premium vehicles. Use the
              filters to find the perfect car that matches your preferences.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden w-full mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search with these filters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    {/* Mobile Filters */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Category</h3>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Brand</h3>
                      <Select
                        value={selectedBrand}
                        onValueChange={setSelectedBrand}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Year</h3>
                      <Select
                        value={selectedYear}
                        onValueChange={setSelectedYear}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-4">Price Range</h3>
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={250000}
                        step={5000}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0].toLocaleString()}</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Filters</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategory === category}
                            onCheckedChange={() =>
                              setSelectedCategory(category)
                            }
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm font-medium leading-none"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Brand</h4>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrand === brand}
                            onCheckedChange={() => setSelectedBrand(brand)}
                          />
                          <label
                            htmlFor={`brand-${brand}`}
                            className="ml-2 text-sm font-medium leading-none"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Year</h4>
                    <div className="space-y-2">
                      {years.map((year) => (
                        <div key={year} className="flex items-center">
                          <Checkbox
                            id={`year-${year}`}
                            checked={selectedYear === year}
                            onCheckedChange={() => setSelectedYear(year)}
                          />
                          <label
                            htmlFor={`year-${year}`}
                            className="ml-2 text-sm font-medium leading-none"
                          >
                            {year}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-4">Price Range</h4>
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={250000}
                      step={5000}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search cars..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12">Loading...</div>
              ) : filteredCars.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No cars found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link href={`/cars/${product._id}`} className="block">
                        <Card className="car-card h-full overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={
                                  product.images && product.images.length
                                    ? product.images[0]
                                    : "/placeholder.svg"
                                }
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleFavorite(product._id);
                                }}
                              >
                                <Heart
                                  className={`h-5 w-5 ${
                                    favorites.includes(product._id)
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }`}
                                />
                              </Button>
                              <Badge className="absolute top-2 left-2">
                                {product.category.name}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                              {product.name}
                            </h3>
                            <p className="text-2xl font-bold text-primary mb-3">
                              ${product.price.toLocaleString()}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {product.features.map(
                                (feature: any, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="font-normal"
                                  >
                                    {feature}
                                  </Badge>
                                )
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex gap-2">
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
