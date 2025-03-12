"use client"

import { Button } from "@/components/ui/button"
import { Car, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface BookTestDriveButtonProps {
  carId: number
  className?: string
}

export default function BookTestDriveButton({ carId, className }: BookTestDriveButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={`/booking/${carId}`}>
        <Button className={`bg-primary hover:bg-primary/90 group ${className}`} size="lg">
          <Car className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Book Test Drive
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </motion.div>
  )
}

