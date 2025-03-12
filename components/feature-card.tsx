"use client"

import type React from "react"

import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50 border border-purple-500/30"
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          {title}
        </h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

export default FeatureCard

