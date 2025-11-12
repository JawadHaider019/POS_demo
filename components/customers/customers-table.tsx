"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"

interface Customer {
  _id: string
  name: string
  phone: string
  email: string
  creditLimit: number
  totalPurchases: number
}

interface CustomersTableProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (id: string) => void
  onView: (customer: Customer) => void
}

export function CustomersTable({ customers, onEdit, onDelete, onView }: CustomersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted">
          <tr className="text-muted-foreground">
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4">Phone</th>
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-right py-3 px-4">Credit Limit</th>
            <th className="text-right py-3 px-4">Total Purchases</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-muted/50 transition">
              <td className="py-3 px-4 font-medium">{customer.name}</td>
              <td className="py-3 px-4">{customer.phone}</td>
              <td className="py-3 px-4 text-muted-foreground">{customer.email || "-"}</td>
              <td className="py-3 px-4 text-right">${customer.creditLimit.toFixed(2)}</td>
              <td className="py-3 px-4 text-right">${customer.totalPurchases.toFixed(2)}</td>
              <td className="py-3 px-4 text-right flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => onView(customer)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(customer)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete(customer._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
