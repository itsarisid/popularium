"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Bell, Key } from "lucide-react"

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2023-05-08T10:30:00",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "System administrator with 5+ years of experience.",
    department: "IT",
    location: "New York",
    phone: "+1 (555) 123-4567",
    twoFactorEnabled: true,
    emailVerified: true,
    createdAt: "2022-01-15T08:30:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
    lastActive: "2023-05-07T14:45:00",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Marketing team lead with expertise in digital campaigns.",
    department: "Marketing",
    location: "San Francisco",
    phone: "+1 (555) 987-6543",
    twoFactorEnabled: false,
    emailVerified: true,
    createdAt: "2022-03-22T11:15:00",
  },
]

interface UserFormProps {
  userId: string
}

export function UserForm({ userId }: UserFormProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch user details
    setLoading(true)
    setTimeout(() => {
      const foundUser = mockUsers.find((u) => u.id === userId)
      setUser(foundUser || null)
      setLoading(false)
    }, 500)
  }, [userId])

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading user details...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-slate-500">User not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{user.role}</Badge>
            <Badge
              variant={user.status === "Active" ? "default" : user.status === "Locked" ? "destructive" : "secondary"}
            >
              {user.status}
            </Badge>
            {user.emailVerified && (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                Verified
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={user.department} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={user.location} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue={user.phone} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={user.bio} className="min-h-[100px]" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Profile</Button>
          </div>
        </TabsContent>

        <TabsContent value="account" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Account Status</Label>
              <Select defaultValue={user.status.toLowerCase()}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="locked">Locked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <Select defaultValue={user.role.toLowerCase()}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="created-at">Account Created</Label>
              <Input id="created-at" defaultValue={new Date(user.createdAt).toLocaleDateString()} disabled />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Verification</h4>
                <p className="text-sm text-slate-500">User's email verification status</p>
              </div>
              <div className="flex items-center gap-2">
                {user.emailVerified ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    Unverified
                  </Badge>
                )}
                {!user.emailVerified && (
                  <Button variant="outline" size="sm">
                    Send Verification
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Account Settings</Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Password Management</h4>
              <div className="flex items-center gap-2">
                <Button variant="outline">Reset Password</Button>
                <Button variant="outline">Force Password Change</Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-500">Add an extra layer of security to the account</p>
                </div>
                <Switch defaultChecked={user.twoFactorEnabled} />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Account Lockout</h4>
                  <p className="text-sm text-slate-500">Lock this account to prevent access</p>
                </div>
                <Button variant={user.status === "Locked" ? "default" : "destructive"}>
                  {user.status === "Locked" ? "Unlock Account" : "Lock Account"}
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium">Login History</h4>
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Last Login</span>
                  <span className="text-sm font-medium">{new Date(user.lastActive).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">IP Address</span>
                  <span className="text-sm font-medium">192.168.1.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Device</span>
                  <span className="text-sm font-medium">Chrome on Windows</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Email Notifications</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="security-emails" className="flex-1">
                    Security Alerts
                  </Label>
                  <Switch id="security-emails" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-emails" className="flex-1">
                    Product Updates
                  </Label>
                  <Switch id="product-emails" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="newsletter-emails" className="flex-1">
                    Newsletter
                  </Label>
                  <Switch id="newsletter-emails" />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium">System Notifications</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-notifications" className="flex-1">
                    Login Alerts
                  </Label>
                  <Switch id="login-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="permission-changes" className="flex-1">
                    Permission Changes
                  </Label>
                  <Switch id="permission-changes" defaultChecked />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Notification Preferences</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
