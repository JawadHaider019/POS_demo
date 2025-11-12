"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBackupStore } from "@/lib/stores"
import { Download, Upload, RotateCcw } from "lucide-react"

export function BackupSection() {
  const { createBackup, exportBackup, importBackup } = useBackupStore()
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCreateBackup = () => {
    createBackup()
    alert("Backup created successfully!")
  }

  const handleExportBackup = () => {
    exportBackup()
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      await importBackup(file)
      alert("Backup restored successfully!")
      window.location.reload()
    } catch (error) {
      alert("Failed to restore backup. Please ensure the file is valid.")
      console.error(error)
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Data Backup & Recovery</h2>
      <Card>
        <CardHeader>
          <CardTitle>Backup Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Backup your products, customers, sales, and purchase data. You can download backups and restore them at any
            time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleCreateBackup} className="w-full" variant="default">
              <RotateCcw className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
            <Button onClick={handleExportBackup} className="w-full bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Backup
            </Button>
            <Button
              onClick={handleImportClick}
              className="w-full bg-transparent"
              variant="outline"
              disabled={isLoading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? "Restoring..." : "Import Backup"}
            </Button>
          </div>

          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />

          <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
            <p className="font-semibold mb-2">How it works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Click "Create Backup" to save all your data</li>
              <li>Click "Export Backup" to download a backup file</li>
              <li>Click "Import Backup" to restore from a downloaded file</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
