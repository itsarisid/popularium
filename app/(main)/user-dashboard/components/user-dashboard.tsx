"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserList } from "./user-list"
import { UserForm } from "./user-form"
import { UserStats } from "./user-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserDashboard() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage users and their account settings</p>
        </div>
        <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user to your organization.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger id="role" className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setShowNewUserDialog(false)}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <UserStats />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage and view all users</CardDescription>
          </CardHeader>
          <CardContent>
            <UserList onSelectUser={setSelectedUser} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>View and edit user information</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <UserForm userId={selectedUser} />
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <h3 className="mt-4 text-lg font-semibold">No user selected</h3>
                  <p className="mb-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Select a user from the list to view and edit their details
                  </p>
                  <Button variant="outline" onClick={() => setShowNewUserDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
