"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Lock } from "lucide-react"

// Mock data for demonstration
const mockPermissions = {
  "User Management": [
    { id: "users.view", name: "View Users", description: "Can view user list and profiles" },
    { id: "users.create", name: "Create Users", description: "Can create new user accounts" },
    { id: "users.edit", name: "Edit Users", description: "Can edit user information" },
    { id: "users.delete", name: "Delete Users", description: "Can delete user accounts" },
  ],
  "Role Management": [
    { id: "roles.view", name: "View Roles", description: "Can view role list and details" },
    { id: "roles.create", name: "Create Roles", description: "Can create new roles" },
    { id: "roles.edit", name: "Edit Roles", description: "Can edit role information" },
    { id: "roles.delete", name: "Delete Roles", description: "Can delete roles" },
  ],
  "Content Management": [
    { id: "content.view", name: "View Content", description: "Can view all content" },
    { id: "content.create", name: "Create Content", description: "Can create new content" },
    { id: "content.edit", name: "Edit Content", description: "Can edit existing content" },
    { id: "content.publish", name: "Publish Content", description: "Can publish content" },
    { id: "content.delete", name: "Delete Content", description: "Can delete content" },
  ],
  "System Settings": [
    { id: "settings.view", name: "View Settings", description: "Can view system settings" },
    { id: "settings.edit", name: "Edit Settings", description: "Can modify system settings" },
  ],
}

const mockRolePermissions = {
  Administrator: [
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
    "roles.view",
    "roles.create",
    "roles.edit",
    "roles.delete",
    "content.view",
    "content.create",
    "content.edit",
    "content.publish",
    "content.delete",
    "settings.view",
    "settings.edit",
  ],
  Manager: [
    "users.view",
    "users.create",
    "users.edit",
    "roles.view",
    "content.view",
    "content.create",
    "content.edit",
    "content.publish",
    "content.delete",
  ],
  User: ["content.view", "content.create", "content.edit"],
  Guest: ["content.view"],
  "Content Editor": ["content.view", "content.create", "content.edit"],
  Reviewer: ["content.view", "content.publish"],
}

export function PermissionManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPermissionDialog, setShowNewPermissionDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState("Administrator")
  const [rolePermissions, setRolePermissions] = useState(mockRolePermissions)

  const handleTogglePermission = (permissionId: string) => {
    setRolePermissions((prev) => {
      const updatedPermissions = { ...prev }
      if (updatedPermissions[selectedRole].includes(permissionId)) {
        updatedPermissions[selectedRole] = updatedPermissions[selectedRole].filter((id) => id !== permissionId)
      } else {
        updatedPermissions[selectedRole] = [...updatedPermissions[selectedRole], permissionId]
      }
      return updatedPermissions
    })
  }

  const filteredPermissions = Object.entries(mockPermissions).reduce(
    (acc, [category, perms]) => {
      const filtered = perms.filter(
        (perm) =>
          perm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perm.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, (typeof mockPermissions)[keyof typeof mockPermissions]>,
  )

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permission Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage permissions for different roles</p>
        </div>
        <Dialog open={showNewPermissionDialog} onOpenChange={setShowNewPermissionDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Permission</DialogTitle>
              <DialogDescription>Add a new permission to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="permission-id">Permission ID</Label>
                <Input id="permission-id" placeholder="e.g. reports.export" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permission-name">Name</Label>
                <Input id="permission-name" placeholder="e.g. Export Reports" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permission-category">Category</Label>
                <Input id="permission-category" placeholder="e.g. Reporting" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permission-description">Description</Label>
                <Input id="permission-description" placeholder="Describe what this permission allows" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setShowNewPermissionDialog(false)}>
                Create Permission
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Select a role to manage permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(mockRolePermissions).map((role) => (
                <div
                  key={role}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    selectedRole === role ? "bg-slate-100 dark:bg-slate-800" : ""
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{role}</h4>
                  </div>
                  <Badge variant="outline">{rolePermissions[role].length} permissions</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Permissions for {selectedRole}</CardTitle>
                <CardDescription>Manage which permissions this role has</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search permissions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All Permissions
                </TabsTrigger>
                <TabsTrigger value="granted" className="flex-1">
                  Granted ({rolePermissions[selectedRole].length})
                </TabsTrigger>
                <TabsTrigger value="not-granted" className="flex-1">
                  Not Granted ({Object.values(mockPermissions).flat().length - rolePermissions[selectedRole].length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(filteredPermissions).map(([category, permissions]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="font-medium text-lg">{category}</h3>
                        <Separator />
                        <div className="space-y-2 mt-2">
                          {permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              <Checkbox
                                id={permission.id}
                                checked={rolePermissions[selectedRole].includes(permission.id)}
                                onCheckedChange={() => handleTogglePermission(permission.id)}
                              />
                              <div className="space-y-1">
                                <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                                  {permission.name}
                                </Label>
                                <p className="text-sm text-slate-500">{permission.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {Object.keys(filteredPermissions).length === 0 && (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <Lock className="mx-auto h-8 w-8 text-slate-400" />
                          <h3 className="mt-2 text-sm font-medium">No permissions found</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Try a different search term or create a new permission.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="granted" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(filteredPermissions).map(([category, permissions]) => {
                      const grantedPermissions = permissions.filter((permission) =>
                        rolePermissions[selectedRole].includes(permission.id),
                      )

                      if (grantedPermissions.length === 0) return null

                      return (
                        <div key={category} className="space-y-2">
                          <h3 className="font-medium text-lg">{category}</h3>
                          <Separator />
                          <div className="space-y-2 mt-2">
                            {grantedPermissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                <Checkbox
                                  id={`granted-${permission.id}`}
                                  checked={true}
                                  onCheckedChange={() => handleTogglePermission(permission.id)}
                                />
                                <div className="space-y-1">
                                  <Label htmlFor={`granted-${permission.id}`} className="font-medium cursor-pointer">
                                    {permission.name}
                                  </Label>
                                  <p className="text-sm text-slate-500">{permission.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}

                    {rolePermissions[selectedRole].length === 0 && (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <Lock className="mx-auto h-8 w-8 text-slate-400" />
                          <h3 className="mt-2 text-sm font-medium">No permissions granted</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            This role doesn't have any permissions assigned yet.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="not-granted" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(filteredPermissions).map(([category, permissions]) => {
                      const notGrantedPermissions = permissions.filter(
                        (permission) => !rolePermissions[selectedRole].includes(permission.id),
                      )

                      if (notGrantedPermissions.length === 0) return null

                      return (
                        <div key={category} className="space-y-2">
                          <h3 className="font-medium text-lg">{category}</h3>
                          <Separator />
                          <div className="space-y-2 mt-2">
                            {notGrantedPermissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                <Checkbox
                                  id={`not-granted-${permission.id}`}
                                  checked={false}
                                  onCheckedChange={() => handleTogglePermission(permission.id)}
                                />
                                <div className="space-y-1">
                                  <Label
                                    htmlFor={`not-granted-${permission.id}`}
                                    className="font-medium cursor-pointer"
                                  >
                                    {permission.name}
                                  </Label>
                                  <p className="text-sm text-slate-500">{permission.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}

                    {Object.values(mockPermissions).flat().length - rolePermissions[selectedRole].length === 0 && (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <Lock className="mx-auto h-8 w-8 text-slate-400" />
                          <h3 className="mt-2 text-sm font-medium">All permissions granted</h3>
                          <p className="mt-1 text-sm text-slate-500">This role has all available permissions.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Permission Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
