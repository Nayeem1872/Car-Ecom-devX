"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface RelatedCar {
  id: number;
  name: string;
  images: string[];
  category: string;
  price: number;
  year: number;
  mileage: number;
}

interface RelatedCarsSectionProps {
  relatedCars: RelatedCar[];
}

export default function RelatedCarsSection({
  relatedCars,
}: RelatedCarsSectionProps) {
  return (
    <section className="container mx-auto px-4 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedCars.map((relatedCar, index) => (
            <motion.div
              key={relatedCar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/cars/${relatedCar.id}`}>
                <Card className="car-card h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative h-48 car-image-container">
                      <img
                        src={relatedCar.images[0] || "/placeholder.svg"}
                        alt={relatedCar.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary/90 z-10">
                        {relatedCar.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {relatedCar.name}
                    </h3>
                    <p className="text-xl font-bold text-primary mb-3">
                      ${relatedCar.price.toLocaleString()}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{relatedCar.year}</span>
                      <span className="mx-2">•</span>
                      <Gauge className="h-4 w-4 mr-1" />
                      <span>{relatedCar.mileage.toLocaleString()} miles</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
