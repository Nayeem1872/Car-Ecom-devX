"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<"password" | "sso" | "mfa">("password")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <Icons.logo className="h-12 w-auto text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome back</h2>
            <p className="text-center text-gray-600 mb-8">Log in to your SecureID account</p>

            <div className="space-y-4 mb-8">
              <Button
                variant={authMethod === "password" ? "default" : "outline"}
                className="w-full"
                onClick={() => setAuthMethod("password")}
              >
                <Icons.mail className="mr-2 h-4 w-4" /> Email & Password
              </Button>
              <Button
                variant={authMethod === "sso" ? "default" : "outline"}
                className="w-full"
                onClick={() => setAuthMethod("sso")}
              >
                <Icons.gitHub className="mr-2 h-4 w-4" /> Single Sign-On (SSO)
              </Button>
              <Button
                variant={authMethod === "mfa" ? "default" : "outline"}
                className="w-full"
                onClick={() => setAuthMethod("mfa")}
              >
                <Icons.smartphone className="mr-2 h-4 w-4" /> Multi-Factor Auth (MFA)
              </Button>
            </div>

            {authMethod === "password" && (
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" disabled={isLoading} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </div>
              </form>
            )}

            {authMethod === "sso" && (
              <div className="text-center">
                <p className="mb-4">Select your organization to continue with SSO:</p>
                <select className="w-full p-2 border rounded mb-4">
                  <option>Choose your organization</option>
                  <option>Acme Corp</option>
                  <option>Globex Corporation</option>
                  <option>Initech</option>
                </select>
                <Button className="w-full" onClick={() => setIsLoading(true)} disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Continue with SSO
                </Button>
              </div>
            )}

            {authMethod === "mfa" && (
              <div className="text-center">
                <p className="mb-4">Enter the code from your authenticator app:</p>
                <Input className="text-center text-2xl tracking-widest mb-4" maxLength={6} placeholder="000000" />
                <Button className="w-full" onClick={() => setIsLoading(true)} disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Verify
                </Button>
              </div>
            )}
          </div>
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/help" className="font-medium text-blue-600 hover:underline">
            Forgot password?
          </Link>{" "}
          ·{" "}
          <Link href="/help" className="font-medium text-blue-600 hover:underline">
            Help
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

