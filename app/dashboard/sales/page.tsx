"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProductStore, useSalesStore } from "@/lib/stores"
import { ProductSearch } from "@/components/pos/product-search"
import { ShoppingCart } from "@/components/pos/shopping-cart"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from "lucide-react"

export default function SalesPage() {
  const { products } = useProductStore()
  const { sales } = useSalesStore()
  const [items, setItems] = useState<any[]>([])

  const handleClearCart = () => {
    if (confirm("Clear cart?")) setItems([])
  }

  return (
    <DashboardLayout title="Point of Sale">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Products to Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductSearch />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {items.length > 0 && (
                <Button variant="outline" className="w-full text-destructive bg-transparent" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              )}
              <Button variant="outline" className="w-full bg-transparent">
                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                View Sales History
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <ShoppingCart />
        </div>
      </div>

      {/* Recent Sales */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {sales.length === 0 ? (
              <p className="text-muted-foreground">No transactions yet</p>
            ) : (
              <div className="space-y-2">
                {sales
                  .slice(-5)
                  .reverse()
                  .map((sale) => (
                    <div key={sale._id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{sale.saleNumber}</p>
                        <p className="text-sm text-muted-foreground">{sale.createdAt.toLocaleTimeString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${sale.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{sale.paymentMethod}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
