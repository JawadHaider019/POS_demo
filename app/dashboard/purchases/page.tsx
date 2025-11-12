"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye } from "lucide-react"
import { PurchaseForm } from "@/components/purchases/purchase-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { usePurchaseStore, useProductStore } from "@/lib/stores"

export default function PurchasesPage() {
  const { purchases, addPurchase } = usePurchaseStore()
  const { updateProduct, products } = useProductStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null)

  const handleAddPurchase = async (formData: any) => {
    addPurchase(formData)

    // Update product stock
    formData.items?.forEach((item: any) => {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        updateProduct(item.productId, {
          stock: product.stock + item.quantity,
        })
      }
    })

    setIsDialogOpen(false)
  }

  return (
    <DashboardLayout title="Purchases">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Stock Purchases</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Purchase
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Record New Purchase</DialogTitle>
              </DialogHeader>
              <PurchaseForm onSubmit={handleAddPurchase} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {purchases.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No purchases recorded yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="text-muted-foreground">
                      <th className="text-left py-3 px-4">Purchase #</th>
                      <th className="text-left py-3 px-4">Supplier</th>
                      <th className="text-left py-3 px-4">Invoice #</th>
                      <th className="text-right py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-right py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {purchases.map((purchase) => (
                      <tr key={purchase._id} className="hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{purchase.purchaseNumber}</td>
                        <td className="py-3 px-4">{purchase.supplier}</td>
                        <td className="py-3 px-4">{purchase.invoiceNumber}</td>
                        <td className="text-right py-3 px-4 font-semibold">${purchase.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                            {purchase.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {purchase.createdAt.toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedPurchase(purchase)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Purchase Details */}
      <Dialog open={!!selectedPurchase} onOpenChange={() => setSelectedPurchase(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Details</DialogTitle>
          </DialogHeader>
          {selectedPurchase && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Purchase #</p>
                  <p className="font-semibold">{selectedPurchase.purchaseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Supplier</p>
                  <p className="font-semibold">{selectedPurchase.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Invoice #</p>
                  <p className="font-semibold">{selectedPurchase.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-semibold">${selectedPurchase.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
