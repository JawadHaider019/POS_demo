"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useState } from "react"

interface CheckoutModalProps {
  onClose: () => void
  onComplete: () => void
}

export function ShoppingCart() {
  const {
    items,
    discount,
    taxRate,
    paymentMethod,
    removeItem,
    updateItem,
    setDiscount,
    setTaxRate,
    setPaymentMethod,
    getSubtotal,
    getTax,
    getTotal,
  } = useCartStore()

  const [showCheckout, setShowCheckout] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
          })),
          discount,
          taxRate,
          paymentMethod,
        }),
      })

      if (!response.ok) throw new Error("Failed to complete sale")

      const sale = await response.json()
      alert(`Sale completed! Sale #${sale.saleNumber}`)
      setShowCheckout(false)
    } catch (error) {
      console.error("Error completing sale:", error)
      alert("Failed to complete sale")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">Cart is empty</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart ({items.length} items)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} × {item.quantity} {item.unit}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => updateItem(item.productId, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button size="sm" variant="ghost" onClick={() => updateItem(item.productId, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => removeItem(item.productId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {!showCheckout ? (
          <>
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax ({taxRate}%):</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount:</span>
                <span>${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={() => setShowCheckout(true)}>
              Proceed to Checkout
            </Button>
          </>
        ) : (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <label className="text-sm font-medium">Discount ($)</label>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Tax Rate (%)</label>
              <Input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as "cash" | "card" | "online")}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowCheckout(false)}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Complete Sale"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
