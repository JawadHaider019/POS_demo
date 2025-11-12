"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Plus } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

interface Product {
  _id: string
  name: string
  sku: string
  price: number
  stock: number
  unit: string
}

export function ProductSearch() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    if (!search) {
      setProducts([])
      return
    }

    const timer = setTimeout(() => {
      searchProducts()
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const searchProducts = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/products?search=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error("Error searching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert("Product out of stock")
      return
    }

    addItem({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      unit: product.unit,
    })

    setSearch("")
    setProducts([])
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search products by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          autoFocus
        />
      </div>

      {products.length > 0 && (
        <Card className="absolute z-50 top-14 w-full">
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            <div className="space-y-1">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                  onClick={() => handleAddToCart(product)}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sku} • Stock: {product.stock} {product.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
