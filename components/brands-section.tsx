"use client";
import { fetchBrands } from "@/hooks/ApiHooks";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function BrandsSection() {
  const [brands, setBrands] = useState<any[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const brandsData = await fetchBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching Brands:", error);
      }
    };
    loadData();
  }, []);

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Premium <span className="text-primary">Brands</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with the world's most prestigious automotive
            manufacturers to bring you the finest vehicles.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand._id}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-12 md:h-16 object-contain"
              />
              <p className="mt-2 text-center text-sm font-medium">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
