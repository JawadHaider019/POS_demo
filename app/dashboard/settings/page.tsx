"use client"

import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/lib/stores"
import { BackupSection } from "@/components/dashboard/backup-section"

export default function SettingsPage() {
  const router = useRouter()
  const { clearAuth } = useAuthStore()

  const handleLogout = () => {
    clearAuth()
    localStorage.removeItem("token")
    localStorage.removeItem("organizationId")
    router.push("/")
  }

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-xl font-semibold mb-4">Business Settings</h2>

          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <Input placeholder="Your Store Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" placeholder="business@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <Input placeholder="USD" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
                <Input type="number" placeholder="10" />
              </div>
              <Button disabled>Save Changes (Demo Mode)</Button>
            </CardContent>
          </Card>
        </div>

        <BackupSection />

        <div>
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <Card>
            <CardHeader>
              <CardTitle>Logout</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
