"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Car, Award, ThumbsUp } from "lucide-react"

const counters = [
  { icon: <Users className="h-10 w-10 text-primary" />, value: 10000, label: "Happy Customers", suffix: "+" },
  { icon: <Car className="h-10 w-10 text-primary" />, value: 500, label: "Premium Cars", suffix: "+" },
  { icon: <Award className="h-10 w-10 text-primary" />, value: 15, label: "Years Experience", suffix: "" },
  { icon: <ThumbsUp className="h-10 w-10 text-primary" />, value: 100, label: "Quality Assurance", suffix: "%" },
]

export default function CounterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [counts, setCounts] = useState(counters.map(() => 0))

  useEffect(() => {
    if (isInView) {
      const intervals = counters.map((counter, index) => {
        const duration = 2000 // 2 seconds
        const steps = 50
        const increment = counter.value / steps
        let count = 0

        return setInterval(() => {
          count += increment
          if (count >= counter.value) {
            count = counter.value
            clearInterval(intervals[index])
          }

          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(count)
            return newCounts
          })
        }, duration / steps)
      })

      return () => intervals.forEach((interval) => clearInterval(interval))
    }
  }, [isInView])

  return (
    <section className="counter-section py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{counter.icon}</div>
              <h3 className="text-4xl font-bold text-white mb-2">
                {counts[index]}
                {counter.suffix}
              </h3>
              <p className="text-white/80">{counter.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

