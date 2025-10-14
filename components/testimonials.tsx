"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView, useAnimation } from "framer-motion";
import { Quote, Star, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Executive",
    content:
      "ES Auto provided an exceptional buying experience. Their team was knowledgeable and helped me find the perfect Mercedes that suits my lifestyle. The financing process was smooth and transparent.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    car: "Mercedes-Benz C-Class",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    content:
      "I was looking for a high-performance vehicle and the team at ES Auto delivered beyond my expectations. The BMW M5 they recommended is a dream to drive, and their after-sales service is outstanding.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    car: "BMW M5",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Architect",
    content:
      "The attention to detail and personalized service at ES Auto is unmatched. They made the entire process smooth and enjoyable. I couldn't be happier with my new Audi.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    car: "Audi A4",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Finance Director",
    content:
      "I've purchased multiple vehicles from ES Auto over the years. Their after-sales service is as impressive as their selection of premium cars. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5,
    car: "Lexus ES",
  },
  {
    id: 5,
    name: "Sophia Lee",
    role: "Marketing Executive",
    content:
      "The online shopping experience was seamless. I was able to browse, select, and purchase my dream car without ever leaving my home. The delivery was prompt and professional.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    car: "Tesla Model 3",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 bg-primary/3 rounded-full blur-3xl"
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
              What Our <span className="text-primary">Customers</span> Say
            </h2>
          </motion.div>
          <motion.p
            className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Don't just take our word for it. Hear from our satisfied customers
            who found their dream cars with us and experienced our exceptional
            service firsthand.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative overflow-hidden"
        >
          <div className="infinite-scroll-container">
            <div className="infinite-scroll-track">
              {[...testimonials, ...testimonials, ...testimonials].map(
                (testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="w-80 mr-8 flex-shrink-0 flex"
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover={{
                        y: -10,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      className="h-full"
                    >
                      <Card className="min-h-[420px] h-full bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                        <CardContent className="p-6 relative h-full flex flex-col">
                          {/* Decorative quote background */}
                          <motion.div
                            className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                            initial={{ rotate: -15, scale: 0.8 }}
                            whileHover={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Quote className="h-20 w-20 text-primary" />
                          </motion.div>

                          {/* Rating stars */}
                          <motion.div
                            className="flex items-center mb-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.1 + 0.6 + i * 0.1,
                                  type: "spring",
                                  stiffness: 200,
                                }}
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    i < testimonial.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              </motion.div>
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground font-medium">
                              {testimonial.rating}.0
                            </span>
                          </motion.div>

                          {/* Content wrapper */}
                          <div className="flex-1 flex flex-col">
                            {/* Testimonial content */}
                            <motion.p
                              className="mb-6 text-gray-700 leading-relaxed text-sm relative z-10 flex-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.7 }}
                            >
                              "{testimonial.content}"
                            </motion.p>

                            {/* Car purchased */}
                            <motion.div
                              className="mb-4 p-2 bg-primary/5 rounded-lg border-l-4 border-primary"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.8 }}
                            >
                              <p className="text-xs text-primary font-semibold">
                                Purchased: {testimonial.car}
                              </p>
                            </motion.div>
                          </div>

                          {/* Customer info */}
                          <motion.div
                            className="flex items-center relative z-10 mt-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.9 }}
                          >
                            <motion.div
                              className="mr-3 relative"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <img
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="h-12 w-12 rounded-full object-cover border-2 border-primary shadow-lg"
                              />
                              <motion.div
                                className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </motion.div>
                            <div>
                              <h4 className="font-bold text-base text-gray-900">
                                {testimonial.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {testimonial.role}
                              </p>
                            </div>
                          </motion.div>

                          {/* Hover gradient overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ChevronRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
