"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/utils-store"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BoxesIcon,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
}

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <Package className="h-5 w-5" />,
    label: "Products",
    href: "/dashboard/products",
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    label: "Sales",
    href: "/dashboard/sales",
  },
  {
    icon: <BoxesIcon className="h-5 w-5" />,
    label: "Purchases",
    href: "/dashboard/purchases",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Customers",
    href: "/dashboard/customers",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: "Reports",
    href: "/dashboard/reports",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/dashboard/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { clearAuth } = useAuthStore()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    clearAuth()
    localStorage.removeItem("token")
    localStorage.removeItem("organizationId")
    router.push("/")
  }

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 px-4 py-6 border-b border-sidebar-border">
        <BarChart3 className="h-8 w-8 text-sidebar-primary" />
        <h1 className="text-lg font-bold text-sidebar-foreground">POS Pro</h1>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant={pathname === item.href ? "default" : "ghost"} className="w-full justify-start" asChild>
              <span className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
        <span className="text-black text-sm font-medium">Deveopled by <Link href='www.jawumitech.com'>Jawumitech</Link></span>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="hidden max-md:flex md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setOpen(!open)} className="p-2 rounded-md bg-sidebar hover:bg-sidebar-accent">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <aside className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">{sidebarContent}</div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </aside>
      )}
    </>
  )
}
