"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, ChevronDown, Search, UserPlus, Users, Shield, Lock, User, Plus, X } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    roles: ["Administrator", "Content Editor"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    roles: ["Manager"],
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    roles: ["User"],
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    roles: ["Content Editor", "Reviewer"],
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    roles: ["Guest"],
  },
]

const mockRoles = {
  Administrator: [
    "user-management", // This implies all user management permissions
    "role-management", // This implies all role management permissions
    "content-management", // This implies all content management permissions
    "system-settings", // This implies all system settings permissions
  ],
  Manager: [
    "users.view",
    "users.create",
    "users.edit",
    "roles.view",
    "content-management", // All content permissions
  ],
  User: ["content.view", "content.create", "content.edit"],
  Guest: ["content.view"],
  "Content Editor": ["content.view", "content.create", "content.edit"],
  Reviewer: ["content.view", "content.publish"],
}

// Mock permissions tree structure
const mockPermissionsTree = [
  {
    id: "user-management",
    name: "User Management",
    description: "All user management permissions",
    children: [
      { id: "users.view", name: "View Users", description: "Can view user list and profiles" },
      { id: "users.create", name: "Create Users", description: "Can create new user accounts" },
      { id: "users.edit", name: "Edit Users", description: "Can edit user information" },
      { id: "users.delete", name: "Delete Users", description: "Can delete user accounts" },
    ],
  },
  {
    id: "role-management",
    name: "Role Management",
    description: "All role management permissions",
    children: [
      { id: "roles.view", name: "View Roles", description: "Can view role list and details" },
      { id: "roles.create", name: "Create Roles", description: "Can create new roles" },
      { id: "roles.edit", name: "Edit Roles", description: "Can edit role information" },
      { id: "roles.delete", name: "Delete Roles", description: "Can delete roles" },
    ],
  },
  {
    id: "content-management",
    name: "Content Management",
    description: "All content management permissions",
    children: [
      { id: "content.view", name: "View Content", description: "Can view all content" },
      { id: "content.create", name: "Create Content", description: "Can create new content" },
      { id: "content.edit", name: "Edit Content", description: "Can edit existing content" },
      { id: "content.publish", name: "Publish Content", description: "Can publish content" },
      { id: "content.delete", name: "Delete Content", description: "Can delete content" },
    ],
  },
  {
    id: "system-settings",
    name: "System Settings",
    description: "All system settings permissions",
    children: [
      { id: "settings.view", name: "View Settings", description: "Can view system settings" },
      { id: "settings.edit", name: "Edit Settings", description: "Can modify system settings" },
    ],
  },
]

// Flatten the permissions tree for easier lookup
const flattenedPermissions = mockPermissionsTree.reduce(
  (acc, category) => {
    acc[category.id] = { ...category, isCategory: true }
    category.children.forEach((perm) => {
      acc[perm.id] = { ...perm, categoryId: category.id }
    })
    return acc
  },
  {} as Record<string, any>,
)

// Helper function to get all child permission IDs for a category
const getAllChildPermissionIds = (categoryId: string) => {
  const category = mockPermissionsTree.find((cat) => cat.id === categoryId)
  return category ? category.children.map((child) => child.id) : []
}

// Helper function to get all permissions for a role, including child permissions
const getAllPermissionsForRole = (roleName: string) => {
  const rolePermissions = mockRoles[roleName] || []
  const allPermissions = [...rolePermissions]

  // Add all child permissions for category permissions
  rolePermissions.forEach((permId) => {
    if (flattenedPermissions[permId]?.isCategory) {
      allPermissions.push(...getAllChildPermissionIds(permId))
    }
  })

  return [...new Set(allPermissions)] // Remove duplicates
}

interface TreeNodeProps {
  label: string
  icon?: React.ReactNode
  children?: React.ReactNode
  defaultExpanded?: boolean
  badge?: string | number
  actions?: React.ReactNode
  level?: number
  highlight?: boolean
}

function TreeNode({
  label,
  icon,
  children,
  defaultExpanded = false,
  badge,
  actions,
  level = 0,
  highlight = false,
}: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const hasChildren = Boolean(children)

  return (
    <div className="select-none">
      <div
        className={`flex items-center p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md ${
          level > 0 ? "ml-6" : ""
        } ${highlight ? "bg-yellow-50 dark:bg-yellow-900/20" : ""}`}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 text-slate-500 mr-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        ) : (
          <div className="w-6" />
        )}

        {icon && <span className="mr-2">{icon}</span>}

        <span className={`flex-1 font-medium text-sm ${highlight ? "text-yellow-800 dark:text-yellow-200" : ""}`}>
          {label}
        </span>

        {badge && (
          <Badge variant="outline" className="ml-2">
            {badge}
          </Badge>
        )}

        {actions && <div className="ml-2">{actions}</div>}
      </div>

      {hasChildren && expanded && (
        <div className="ml-6 border-l border-slate-200 dark:border-slate-700 pl-2">{children}</div>
      )}
    </div>
  )
}

interface PermissionNodeProps {
  permissionId: string
  level?: number
  searchTerm?: string
  searchScope?: "all" | "users" | "roles" | "permissions"
}

function PermissionNode({ permissionId, level = 0, searchTerm = "", searchScope = "all" }: PermissionNodeProps) {
  const permission = flattenedPermissions[permissionId]

  if (!permission) return null

  const isCategory = permission.isCategory

  // Check if permission matches search
  const permissionMatches =
    (searchScope === "all" || searchScope === "permissions") &&
    searchTerm &&
    (permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description?.toLowerCase().includes(searchTerm.toLowerCase()))

  // For categories, check if any children match
  const childrenMatch =
    isCategory &&
    permission.children.some((childPerm: any) => {
      if (!searchTerm || (searchScope !== "all" && searchScope !== "permissions")) return false

      return (
        childPerm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        childPerm.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

  // Only expand categories by default if there's a search and something matches
  const shouldExpand = isCategory && searchTerm && (permissionMatches || childrenMatch)

  if (isCategory) {
    return (
      <TreeNode
        label={permission.name}
        icon={<Lock className="h-4 w-4 text-slate-500" />}
        level={level}
        defaultExpanded={shouldExpand}
        highlight={permissionMatches}
      >
        {permission.children.map((childPerm: any) => (
          <PermissionNode
            key={childPerm.id}
            permissionId={childPerm.id}
            level={level + 1}
            searchTerm={searchTerm}
            searchScope={searchScope}
          />
        ))}
      </TreeNode>
    )
  }

  return (
    <TreeNode
      label={permission.name}
      icon={<Lock className="h-4 w-4 text-slate-500" />}
      level={level}
      highlight={permissionMatches}
    />
  )
}

interface RoleNodeProps {
  roleName: string
  level?: number
  onRemoveRole?: (roleName: string) => void
  searchTerm?: string
  searchScope?: "all" | "users" | "roles" | "permissions"
}

function RoleNode({ roleName, level = 0, onRemoveRole, searchTerm = "", searchScope = "all" }: RoleNodeProps) {
  const permissions = getAllPermissionsForRole(roleName)

  // Check if role matches search
  const roleMatches =
    (searchScope === "all" || searchScope === "roles") &&
    searchTerm &&
    roleName.toLowerCase().includes(searchTerm.toLowerCase())

  // Check if any permissions match search
  const permissionMatches = permissions.some((permId) => {
    if (!searchTerm || (searchScope !== "all" && searchScope !== "permissions")) return false

    const permission = flattenedPermissions[permId]
    return (
      permission &&
      (permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  // Only expand by default if there's a search and something matches
  const shouldExpand = searchTerm && (roleMatches || permissionMatches)

  return (
    <TreeNode
      label={roleName}
      icon={<Shield className="h-4 w-4 text-blue-500" />}
      level={level}
      badge={permissions.length}
      highlight={roleMatches}
      defaultExpanded={shouldExpand}
      actions={
        onRemoveRole && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 text-slate-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation()
              onRemoveRole(roleName)
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )
      }
    >
      {permissions.map((permId) => (
        <PermissionNode
          key={permId}
          permissionId={permId}
          level={level + 1}
          searchTerm={searchTerm}
          searchScope={searchScope}
        />
      ))}
    </TreeNode>
  )
}

interface UserNodeProps {
  user: (typeof mockUsers)[0]
  onAddRole: (userId: string) => void
  onRemoveRole: (userId: string, roleName: string) => void
  searchTerm: string
  searchScope: "all" | "users" | "roles" | "permissions"
}

function UserNode({ user, onAddRole, onRemoveRole, searchTerm, searchScope }: UserNodeProps) {
  // Determine if this node or any children match the search
  const searchLower = searchTerm.toLowerCase()

  // Check if user matches
  const userMatches =
    searchScope === "all" || searchScope === "users"
      ? user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower)
      : false

  // Check if any roles match
  const roleMatches = user.roles.some(
    (role) => (searchScope === "all" || searchScope === "roles") && role.toLowerCase().includes(searchLower),
  )

  // Check if any permissions match
  const permissionMatches = user.roles.some((roleName) => {
    if (searchScope !== "all" && searchScope !== "permissions") return false

    const permissions = getAllPermissionsForRole(roleName)
    return permissions.some((permId) => {
      const permission = flattenedPermissions[permId]
      return (
        permission &&
        (permission.name.toLowerCase().includes(searchLower) ||
          permission.description?.toLowerCase().includes(searchLower))
      )
    })
  })

  // Only expand by default if there's a search and something matches
  const shouldExpand = searchTerm && (userMatches || roleMatches || permissionMatches)

  return (
    <TreeNode
      label={user.name}
      icon={
        <Avatar className="h-6 w-6">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      }
      defaultExpanded={shouldExpand}
      badge={user.roles.length}
      highlight={userMatches && searchTerm.length > 0}
      actions={
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 text-slate-500" onClick={() => onAddRole(user.id)}>
          <Plus className="h-4 w-4" />
        </Button>
      }
    >
      {user.roles.map((roleName) => (
        <RoleNode
          key={roleName}
          roleName={roleName}
          level={1}
          onRemoveRole={(role) => onRemoveRole(user.id, role)}
          searchTerm={searchTerm}
          searchScope={searchScope}
        />
      ))}
    </TreeNode>
  )
}

export function UserRoleAssignment() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchScope, setSearchScope] = useState<"all" | "users" | "roles" | "permissions">("all")
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")

  // New filtering logic that searches across users, roles, and permissions
  const filteredUsers = users.filter((user) => {
    // Always include if search is empty
    if (!searchTerm.trim()) return true

    const searchLower = searchTerm.toLowerCase()

    // Search in user data
    if (searchScope === "users" || searchScope === "all") {
      if (user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower)) {
        return true
      }
    }

    // Search in roles
    if (searchScope === "roles" || searchScope === "all") {
      if (user.roles.some((role) => role.toLowerCase().includes(searchLower))) {
        return true
      }
    }

    // Search in permissions
    if (searchScope === "permissions" || searchScope === "all") {
      // Check if any of the user's roles have permissions that match the search
      return user.roles.some((roleName) => {
        const permissions = getAllPermissionsForRole(roleName)
        return permissions.some((permId) => {
          const permission = flattenedPermissions[permId]
          return (
            permission &&
            (permission.name.toLowerCase().includes(searchLower) ||
              permission.description?.toLowerCase().includes(searchLower))
          )
        })
      })
    }

    return false
  })

  const handleAddRole = (userId: string) => {
    setSelectedUserId(userId)
    setSelectedRole("")
    setShowAddRoleDialog(true)
  }

  const handleRemoveRole = (userId: string, roleName: string) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, roles: user.roles.filter((r) => r !== roleName) } : user)),
    )
  }

  const handleSaveRole = () => {
    if (!selectedUserId || !selectedRole) return

    setUsers(
      users.map((user) =>
        user.id === selectedUserId && !user.roles.includes(selectedRole)
          ? { ...user, roles: [...user.roles, selectedRole] }
          : user,
      ),
    )

    setShowAddRoleDialog(false)
  }

  const availableRoles = Object.keys(mockRoles)

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Role Assignment</h1>
          <p className="text-slate-500 dark:text-slate-400">Assign roles and view permissions for each user</p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search users, roles, permissions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 text-xs">
              <Button
                variant={searchScope === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchScope("all")}
                className="h-7 px-2 text-xs"
              >
                All
              </Button>
              <Button
                variant={searchScope === "users" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchScope("users")}
                className="h-7 px-2 text-xs"
              >
                <User className="h-3 w-3 mr-1" />
                Users
              </Button>
              <Button
                variant={searchScope === "roles" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchScope("roles")}
                className="h-7 px-2 text-xs"
              >
                <Shield className="h-3 w-3 mr-1" />
                Roles
              </Button>
              <Button
                variant={searchScope === "permissions" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchScope("permissions")}
                className="h-7 px-2 text-xs"
              >
                <Lock className="h-3 w-3 mr-1" />
                Permissions
              </Button>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Add a new user and assign roles.</DialogDescription>
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
                      {availableRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users and Assigned Roles</CardTitle>
          <CardDescription>View and manage user roles and their associated permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">User</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Role</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Lock className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">Permission</span>
            </div>
          </div>

          <ScrollArea className="h-[500px] pr-4 border rounded-md p-2">
            <div className="space-y-1">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserNode
                    key={user.id}
                    user={user}
                    onAddRole={handleAddRole}
                    onRemoveRole={handleRemoveRole}
                    searchTerm={searchTerm}
                    searchScope={searchScope}
                  />
                ))
              ) : (
                <div className="flex h-40 items-center justify-center">
                  <div className="text-center">
                    <Users className="mx-auto h-8 w-8 text-slate-400" />
                    <h3 className="mt-2 text-sm font-medium">No results found</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Try a different search term or change the search scope.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={showAddRoleDialog} onOpenChange={setShowAddRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>Assign a role to {users.find((u) => u.id === selectedUserId)?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="select-role">Select Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="select-role" className="mt-1">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles
                  .filter((role) => !users.find((u) => u.id === selectedUserId)?.roles.includes(role))
                  .map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {selectedRole && (
              <div className="mt-4">
                <Label>Role Permissions</Label>
                <div className="mt-2 border rounded-md p-2 max-h-[200px] overflow-auto">
                  <RoleNode roleName={selectedRole} />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRoleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole} disabled={!selectedRole}>
              Assign Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
