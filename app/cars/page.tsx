"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, Heart, Search, SlidersHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const cars = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    category: "Luxury Sedan",
    price: 110000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["Leather Interior", "Panoramic Roof", "Advanced Safety"],
    year: 2023,
    brand: "Mercedes-Benz",
  },
  {
    id: 2,
    name: "BMW X7",
    category: "Premium SUV",
    price: 85000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["7 Seats", "All-Wheel Drive", "Premium Sound System"],
    year: 2023,
    brand: "BMW",
  },
  {
    id: 3,
    name: "Audi e-tron GT",
    category: "Electric",
    price: 99000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["Electric", "Fast Charging", "Quattro AWD"],
    year: 2023,
    brand: "Audi",
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports Car",
    price: 120000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["Twin-Turbo", "Rear-Wheel Drive", "Sport Chrono Package"],
    year: 2023,
    brand: "Porsche",
  },
  {
    id: 5,
    name: "Tesla Model S",
    category: "Electric",
    price: 89000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["Autopilot", "Long Range", "Minimalist Interior"],
    year: 2023,
    brand: "Tesla",
  },
  {
    id: 6,
    name: "Lexus LS",
    category: "Luxury Sedan",
    price: 78000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["Hybrid Option", "Mark Levinson Audio", "Shiatsu Massage Seats"],
    year: 2023,
    brand: "Lexus",
  },
  {
    id: 7,
    name: "Range Rover",
    category: "Premium SUV",
    price: 95000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["Off-Road Capability", "Air Suspension", "Meridian Sound System"],
    year: 2022,
    brand: "Land Rover",
  },
  {
    id: 8,
    name: "Bentley Continental GT",
    category: "Luxury Coupe",
    price: 202000,
    image: "/placeholder.svg?height=600&width=800",
    features: ["Handcrafted Interior", "W12 Engine", "Dynamic Ride System"],
    year: 2023,
    brand: "Bentley",
  },
]

const categories = ["All", "Luxury Sedan", "Premium SUV", "Electric", "Sports Car", "Luxury Coupe"]
const brands = ["All", "Mercedes-Benz", "BMW", "Audi", "Porsche", "Tesla", "Lexus", "Land Rover", "Bentley"]
const years = ["All", "2023", "2022", "2021", "2020"]

export default function CarsPage() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 250000])

  const handleAddToCart = (car: (typeof cars)[0]) => {
    addToCart({
      id: car.id,
      name: car.name,
      price: car.price,
      image: car.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${car.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory
    const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand
    const matchesYear = selectedYear === "All" || car.year.toString() === selectedYear
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesBrand && matchesYear && matchesPrice
  })

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Car Collection</h1>
          <p className="text-muted-foreground max-w-3xl">
            Browse our extensive collection of premium vehicles. Use the filters to find the perfect car that matches
            your preferences.
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
                  <SheetDescription>Refine your search with these filters</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  {/* Mobile Filters */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Category</h3>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
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
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
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
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-[200px]">
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
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

            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No cars found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="car-card h-full overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                            onClick={() => toggleFavorite(car.id)}
                          >
                            <Heart
                              className={`h-5 w-5 ${favorites.includes(car.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                          <Badge className="absolute top-2 left-2">{car.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-3">${car.price.toLocaleString()}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {car.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button variant="default" className="w-full" onClick={() => handleAddToCart(car)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

