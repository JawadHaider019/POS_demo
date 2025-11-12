"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface Product {
  _id: string
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  unit: string
}

interface ProductsTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted">
          <tr className="text-muted-foreground">
            <th className="text-left py-3 px-4">Product Name</th>
            <th className="text-left py-3 px-4">SKU</th>
            <th className="text-left py-3 px-4">Category</th>
            <th className="text-right py-3 px-4">Cost</th>
            <th className="text-right py-3 px-4">Price</th>
            <th className="text-right py-3 px-4">Stock</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-muted/50 transition">
              <td className="py-3 px-4 font-medium">{product.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{product.sku}</td>
              <td className="py-3 px-4">{product.category}</td>
              <td className="py-3 px-4 text-right">${product.cost.toFixed(2)}</td>
              <td className="py-3 px-4 text-right font-semibold">${product.price.toFixed(2)}</td>
              <td className="py-3 px-4 text-right">
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock} {product.unit}
                </span>
              </td>
              <td className="py-3 px-4 text-right flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete(product._id)}
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
