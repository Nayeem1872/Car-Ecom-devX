"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const brands = [
  { name: "Mercedes-Benz", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.svg" },
  { name: "BMW", logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.svg" },
  { name: "Audi", logo: "https://www.carlogos.org/logo/Audi-logo-2016-1920x1080.png" },
  { name: "Porsche", logo: "https://www.carlogos.org/car-logos/porsche-logo-2008.svg" },
  { name: "Ferrari", logo: "https://www.carlogos.org/car-logos/ferrari-logo-2002.svg" },
  { name: "Lamborghini", logo: "https://www.carlogos.org/car-logos/lamborghini-logo-2014.svg" },
  { name: "Bentley", logo: "https://www.carlogos.org/car-logos/bentley-logo-2002.svg" },
  { name: "Rolls-Royce", logo: "https://www.carlogos.org/car-logos/rolls-royce-logo-2020.svg" },
]

export default function BrandsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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
            We partner with the world's most prestigious automotive manufacturers to bring you the finest vehicles.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-12 md:h-16 object-contain brand-logo"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

