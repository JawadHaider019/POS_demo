"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, Plus, Trash2 } from "lucide-react"

interface PurchaseItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  unitCost: number
}

interface PurchaseFormProps {
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
}

export function PurchaseForm({ onSubmit, isLoading = false }: PurchaseFormProps) {
  const [error, setError] = useState("")
  const [items, setItems] = useState<PurchaseItem[]>([
    { productId: "", productName: "", sku: "", quantity: 0, unitCost: 0 },
  ])
  const [formData, setFormData] = useState({
    supplier: "",
    invoiceNumber: "",
    tax: "",
    notes: "",
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { productId: "", productName: "", sku: "", quantity: 0, unitCost: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.supplier || !formData.invoiceNumber) {
      setError("Please fill in supplier and invoice number")
      return
    }

    if (items.some((item) => !item.productName || !item.quantity || !item.unitCost)) {
      setError("Please fill in all item details")
      return
    }

    try {
      await onSubmit({
        supplier: formData.supplier,
        invoiceNumber: formData.invoiceNumber,
        items: items.map((item) => ({
          ...item,
          subtotal: item.quantity * item.unitCost,
        })),
        tax: Number.parseFloat(formData.tax) || 0,
        notes: formData.notes,
      })
    } catch (err: any) {
      setError(err.message || "An error occurred")
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0)
  const total = subtotal + (Number.parseFloat(formData.tax) || 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Stock Purchase</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Supplier Name *</label>
              <Input
                name="supplier"
                placeholder="Supplier name"
                value={formData.supplier}
                onChange={handleFormChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Invoice Number *</label>
              <Input
                name="invoiceNumber"
                placeholder="Invoice #"
                value={formData.invoiceNumber}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-2">
            <h3 className="font-semibold">Purchase Items</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2 p-3 border border-border rounded-lg">
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <Input
                      placeholder="Product name"
                      value={item.productName}
                      onChange={(e) => handleItemChange(index, "productName", e.target.value)}
                    />
                    <Input
                      placeholder="SKU"
                      value={item.sku}
                      onChange={(e) => handleItemChange(index, "sku", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value) || 0)}
                    />
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Unit Cost"
                      value={item.unitCost}
                      onChange={(e) => handleItemChange(index, "unitCost", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium min-w-24 text-right">
                      ${(item.quantity * item.unitCost).toFixed(2)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button type="button" variant="outline" onClick={addItem} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tax ($)</label>
            <Input
              name="tax"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.tax}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              placeholder="Additional notes"
              value={formData.notes}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-input rounded-md text-sm"
              rows={3}
            />
          </div>

          {/* Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>${(Number.parseFloat(formData.tax) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Record Purchase"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
