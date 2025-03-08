"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus, ShoppingBag, CreditCard, Truck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ShoppingCartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShoppingCartSidebar({ isOpen, onClose }: ShoppingCartSidebarProps) {
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const cartRef = useRef<HTMLDivElement>(null)

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          <motion.div
            ref={cartRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full sm:w-96 bg-background shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close cart">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">Looks like you haven't added any cars to your cart yet.</p>
                  <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-muted-foreground hover:text-destructive"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between py-2">
                  <p>Subtotal</p>
                  <p className="font-medium">${totalPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between py-2">
                  <p>Shipping</p>
                  <p className="font-medium">Calculated at checkout</p>
                </div>
                <div className="flex justify-between py-2">
                  <p>Tax</p>
                  <p className="font-medium">Calculated at checkout</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-2">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-semibold">${totalPrice.toLocaleString()}</p>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 group" size="lg">
                  <CreditCard className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Checkout
                </Button>
                <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>Free shipping on all orders</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

