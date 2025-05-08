"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2, Users, Copy, ChevronRight, ChevronDown, Search } from "lucide-react"

// Mock data for demonstration - restructured as a tree
const mockRolesTree = [
  {
    id: "admin-roles",
    name: "Administrative Roles",
    description: "Roles with administrative privileges",
    children: [
      {
        id: "1",
        name: "Administrator",
        description: "Full system access with all permissions",
        usersCount: 3,
        isSystem: true,
        createdAt: "2022-01-01T00:00:00",
      },
      {
        id: "2",
        name: "Manager",
        description: "Can manage users and content, but cannot modify system settings",
        usersCount: 8,
        isSystem: true,
        createdAt: "2022-01-01T00:00:00",
      },
    ],
  },
  {
    id: "standard-roles",
    name: "Standard Roles",
    description: "Regular user roles",
    children: [
      {
        id: "3",
        name: "User",
        description: "Standard user with basic permissions",
        usersCount: 24,
        isSystem: true,
        createdAt: "2022-01-01T00:00:00",
      },
      {
        id: "4",
        name: "Guest",
        description: "Limited access for temporary users",
        usersCount: 12,
        isSystem: true,
        createdAt: "2022-01-01T00:00:00",
      },
    ],
  },
  {
    id: "content-roles",
    name: "Content Roles",
    description: "Roles focused on content management",
    children: [
      {
        id: "5",
        name: "Content Editor",
        description: "Can create and edit content but cannot publish",
        usersCount: 6,
        isSystem: false,
        createdAt: "2022-03-15T00:00:00",
      },
      {
        id: "6",
        name: "Reviewer",
        description: "Can review and approve content but cannot create",
        usersCount: 4,
        isSystem: false,
        createdAt: "2022-05-20T00:00:00",
      },
    ],
  },
]

// Flatten the tree for easier reference
const flattenedRoles = mockRolesTree.reduce(
  (acc, category) => {
    acc[category.id] = { ...category, isCategory: true }
    category.children.forEach((role) => {
      acc[role.id] = { ...role, categoryId: category.id }
    })
    return acc
  },
  {} as Record<string, any>,
)

interface RoleTreeItemProps {
  item: any
  level?: number
  selectedRole: string | null
  onSelectRole: (roleId: string) => void
  expandedCategories: Record<string, boolean>
  onToggleCategory: (categoryId: string) => void
  onDeleteRole: (roleId: string) => void
}

function RoleTreeItem({
  item,
  level = 0,
  selectedRole,
  onSelectRole,
  expandedCategories,
  onToggleCategory,
  onDeleteRole,
}: RoleTreeItemProps) {
  const isCategory = Boolean(item.children)
  const isExpanded = isCategory ? expandedCategories[item.id] : false

  return (
    <div className="space-y-1">
      {isCategory ? (
        <div
          className={`flex items-center justify-between p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 ${
            level > 0 ? "ml-6" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 text-slate-500"
              onClick={() => onToggleCategory(item.id)}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <h4 className="font-medium">{item.name}</h4>
          </div>
          <Badge variant="outline">{item.children.length} roles</Badge>
        </div>
      ) : (
        <div
          className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 ${
            selectedRole === item.id ? "bg-slate-100 dark:bg-slate-800" : ""
          } ${level > 0 ? "ml-6" : ""}`}
          onClick={() => onSelectRole(item.id)}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{item.name}</h4>
              {item.isSystem && (
                <Badge variant="outline" className="text-xs">
                  System
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:flex">
              <Users className="mr-1 h-3 w-3" />
              {item.usersCount}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectRole(item.id)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Role
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!item.isSystem && (
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteRole(item.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
      {isCategory && isExpanded && (
        <div className="ml-6 border-l border-slate-200 dark:border-slate-700 pl-2">
          {item.children.map((child: any) => (
            <RoleTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              selectedRole={selectedRole}
              onSelectRole={onSelectRole}
              expandedCategories={expandedCategories}
              onToggleCategory={onToggleCategory}
              onDeleteRole={onDeleteRole}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showNewRoleDialog, setShowNewRoleDialog] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDescription, setNewRoleDescription] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    mockRolesTree.reduce(
      (acc, category) => {
        acc[category.id] = true // All categories expanded by default
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleDeleteRole = (roleId: string) => {
    // In a real app, you would update the tree structure
    // For this demo, we'll just deselect the role if it was selected
    if (selectedRole === roleId) {
      setSelectedRole(null)
    }
  }

  const handleCreateRole = () => {
    // In a real app, you would update the tree structure
    setShowNewRoleDialog(false)
    setNewRoleName("")
    setNewRoleDescription("")
  }

  // Filter the roles tree based on search term
  const filteredRolesTree = searchTerm
    ? (mockRolesTree
        .map((category) => {
          const filteredChildren = category.children.filter(
            (role) =>
              role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              role.description.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          if (
            filteredChildren.length > 0 ||
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return {
              ...category,
              children: filteredChildren,
            }
          }
          return null
        })
        .filter(Boolean) as typeof mockRolesTree)
    : mockRolesTree

  const selectedRoleData = selectedRole ? flattenedRoles[selectedRole] : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Role Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Create and manage user roles</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search roles..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={showNewRoleDialog} onOpenChange={setShowNewRoleDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>Add a new role to assign to users.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    placeholder="e.g. Project Manager"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-category">Category</Label>
                  <Input id="role-category" placeholder="e.g. Content Roles" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Textarea
                    id="role-description"
                    placeholder="Describe the role's purpose and responsibilities"
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateRole}>
                  Create Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Available Roles</CardTitle>
            <CardDescription>Select a role to view or edit</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-2">
                {filteredRolesTree.length > 0 ? (
                  filteredRolesTree.map((category) => (
                    <RoleTreeItem
                      key={category.id}
                      item={category}
                      selectedRole={selectedRole}
                      onSelectRole={handleSelectRole}
                      expandedCategories={expandedCategories}
                      onToggleCategory={toggleCategory}
                      onDeleteRole={handleDeleteRole}
                    />
                  ))
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                    <div className="text-center">
                      <Users className="mx-auto h-8 w-8 text-slate-400" />
                      <h3 className="mt-2 text-sm font-medium">No roles found</h3>
                      <p className="mt-1 text-sm text-slate-500">Try a different search term or create a new role.</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          {selectedRoleData ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedRoleData.name}</CardTitle>
                    <CardDescription>Manage role details and permissions</CardDescription>
                  </div>
                  {selectedRoleData.isSystem && <Badge variant="outline">System Role</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role-name">Role Name</Label>
                    <Input
                      id="edit-role-name"
                      defaultValue={selectedRoleData.name}
                      disabled={selectedRoleData.isSystem}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-role-description">Description</Label>
                    <Textarea
                      id="edit-role-description"
                      defaultValue={selectedRoleData.description}
                      className="min-h-[100px]"
                      disabled={selectedRoleData.isSystem}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Users with this role</h3>
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Total Users</span>
                      <span className="font-medium">{selectedRoleData.usersCount}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Role Information</h3>
                  <div className="rounded-md border p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Created</span>
                      <span className="text-sm">{new Date(selectedRoleData.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Type</span>
                      <span className="text-sm">{selectedRoleData.isSystem ? "System Role" : "Custom Role"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Category</span>
                      <span className="text-sm">
                        {flattenedRoles[selectedRoleData.categoryId]?.name || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedRole(null)}>
                  Cancel
                </Button>
                <Button disabled={selectedRoleData.isSystem}>Save Changes</Button>
              </CardFooter>
            </>
          ) : (
            <div className="flex h-[600px] items-center justify-center">
              <div className="text-center space-y-2">
                <Users className="h-12 w-12 mx-auto text-slate-400" />
                <h3 className="text-lg font-medium">No Role Selected</h3>
                <p className="text-slate-500 max-w-md">
                  Select a role from the list to view or edit its details, or create a new role to assign to users.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setShowNewRoleDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Role
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
