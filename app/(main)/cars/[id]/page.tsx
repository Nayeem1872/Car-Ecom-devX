"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import RelatedCarsSection from "./RelatedCarsSection";
import CarDetailsContent from "./CarDetailsSection";
import HeroSection from "./CarHeroSection";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedCars, setRelatedCars] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/ecom/product/get?all=true");
      const productsData: any[] = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];

      console.log("Products Data:", productsData);
      console.log("ID from Params:", id);

      const found = productsData.find((c) => String(c._id) === String(id));
      console.log("Found Car:", found);
      if (!found) {
        setCar(null);
        return;
      }

      // merge your defaults & rest
      const { category, brand, ...rest } = found;
      const defaults = {
        specs: found.features?.length
          ? found.features.map((f: any) => ({
              fieldLabel: f.fieldLabel,
              fieldValue: f.fieldValue,
            }))
          : [],
        features: [
          "Leather Interior",
          "Panoramic Roof",
          "Advanced Safety",
          "Heated Seats",
          "Ambient Lighting",
        ],
        year: 2023,
        mileage: 0,
        condition: "New",
        exteriorColor: "Obsidian Black",
        interiorColor: "Black Nappa Leather",
        vin: "WDDUG8DB1LA456789",
        stockNumber: "MB12345",
        // relatedCars: getRandomRelatedCars(productsData),
      };
      const mergedCar = {
        id: found._id,
        ...defaults,
        ...rest,
        specs: {
          ...defaults.specs,
          ...(rest.specs || {}),
        },
        features: rest.features?.length ? rest.features : defaults.features,
      };
      console.log("Merged Car:", mergedCar);

      setCar(mergedCar);
      // if (mergedCar.relatedCars?.length) {
      //   setRelatedCars(
      //     productsData.filter((c) =>
      //       mergedCar.relatedCars.includes(String(c._id))
      //     )
      //   );
      // }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products data.",
        variant: "destructive",
      });
      setCar(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const getRandomRelatedCars = (productsData: any[]): string[] => {
    const randomCars: string[] = []; // Explicitly type as string array
    while (randomCars.length < 3) {
      const randomIndex = Math.floor(Math.random() * productsData.length);
      const randomCarId = productsData[randomIndex]._id;
      if (!randomCars.includes(randomCarId)) {
        randomCars.push(randomCarId);
      }
    }
    return randomCars;
  };

  const handlePrevImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Car Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/cars")}
            className="bg-primary hover:bg-primary/90"
          >
            Browse All Cars
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen pb-20" ref={containerRef}>
        <HeroSection car={car} currentImageIndex={currentImageIndex} />

        <CarDetailsContent
          car={car}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          handlePrevImage={handlePrevImage}
          handleNextImage={handleNextImage}
        />

        {/* Related Cars Section */}
        {/* {relatedCars.length > 0 && (
          <RelatedCarsSection relatedCars={relatedCars} />
        )} */}
      </main>
    </>
  );
}
