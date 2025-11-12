"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSalesStore, useProductStore, useCustomerStore } from "@/lib/stores"

export default function ReportsPage() {
  const { sales } = useSalesStore()
  const { products } = useProductStore()
  const { customers } = useCustomerStore()

  const totalSales = sales.reduce((sum, s) => sum + s.total, 0)
  const totalProfit = sales.reduce((sum, s) => {
    const itemCosts = s.items.reduce((itemSum, item) => {
      const product = products.find((p) => p.id === item.productId)
      return itemSum + (product?.cost || 0) * item.quantity
    }, 0)
    return sum + (s.total - itemCosts)
  }, 0)

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

  return (
    <DashboardLayout title="Reports">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reports & Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-2">{sales.length} transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalProfit.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-2">
                {totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0}% margin
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Active customers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sales data visualization coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monthly analytics coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Product performance metrics coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">P&L analysis coming soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
