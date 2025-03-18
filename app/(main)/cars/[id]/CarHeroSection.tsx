"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, Gauge } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  car: any;
  currentImageIndex: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  car,
  currentImageIndex,
}) => {
  const router = useRouter();

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.1, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ backgroundImage: `url(${car.images[currentImageIndex]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10"></div>
      </motion.div>

      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col justify-end h-full pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="mb-4 bg-white/20 backdrop-blur-sm"
              onClick={() => router.back()}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Badge className="mb-2 bg-primary hover:bg-primary/90">
              {car.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {car.name}
            </h1>
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <Calendar className="h-4 w-4" />
              <span>{car.year}</span>
              <span className="mx-2">•</span>
              <Gauge className="h-4 w-4" />
              <span>{car.mileage.toLocaleString()} miles</span>
              <span className="mx-2">•</span>
              <span>{car.condition}</span>
            </div>
            <p className="text-3xl font-bold text-white">
              ${car.price.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
