"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  cta: string
  highlighted?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, cta, highlighted = false }) => {
  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50 border ${
        highlighted ? "bg-purple-900 border-purple-500" : "bg-gray-800 border-gray-700"
      }`}
      whileHover={{ scale: highlighted ? 1.1 : 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        {title}
      </h3>
      <p className="text-4xl font-bold mb-6 text-white">
        {price}
        <span className="text-lg text-gray-400">/mo</span>
      </p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <Check className="h-5 w-5 mr-2 text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        {cta}
      </Button>
    </motion.div>
  )
}

export default PricingCard

