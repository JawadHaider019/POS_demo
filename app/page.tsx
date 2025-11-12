"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { BarChart3, Lock, Zap } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">POS Pro</h1>
          </div>
          <div className="flex gap-4">
            {isLoggedIn ? (
              <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => router.push("/login")}>
                  Login
                </Button>
                <Button onClick={() => router.push("/signup")}>Try Free</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-balance mb-4">Modern Point of Sale System for Your Business</h2>
        <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
          Manage products, sales, inventory, and customers with a modern, cloud-based POS system. Perfect for retail,
          restaurants, and small businesses.
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Button size="lg" onClick={() => router.push("/signup")}>
            Try Free
          </Button>
          <Button size="lg" variant="outline">
            View Pricing
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 rounded-lg border border-border bg-card">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-sm text-muted-foreground">Real-time reports on sales, profits, and top products</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-sm text-muted-foreground">Enterprise-grade security with automatic backups</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Optimized for speed and performance on any device</p>
          </div>
        </div>
      </section>
    </div>
  )
}
