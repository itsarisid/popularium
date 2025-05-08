"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Lock, Unlock, Key, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2023-05-08T10:30:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
    lastActive: "2023-05-07T14:45:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Locked",
    lastActive: "2023-04-28T09:15:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Manager",
    status: "Active",
    lastActive: "2023-05-08T08:20:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "Inactive",
    lastActive: "2023-03-15T11:10:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "User",
    status: "Active",
    lastActive: "2023-05-01T16:45:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "7",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Guest",
    status: "Active",
    lastActive: "2023-05-03T09:30:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

interface UserListProps {
  onSelectUser: (userId: string) => void
}

export function UserList({ onSelectUser }: UserListProps) {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleLockUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Locked" ? "Active" : "Locked" } : user,
      ),
    )
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-2">
          {filteredUsers.length === 0 ? (
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-slate-500">No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                onClick={() => onSelectUser(user.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      user.status === "Active" ? "default" : user.status === "Locked" ? "destructive" : "secondary"
                    }
                    className="hidden sm:inline-flex"
                  >
                    {user.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectUser(user.id)
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLockUser(user.id)
                        }}
                      >
                        {user.status === "Locked" ? (
                          <>
                            <Unlock className="mr-2 h-4 w-4" />
                            Unlock Account
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Lock Account
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteUser(user.id)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
