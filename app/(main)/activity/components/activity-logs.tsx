"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CalendarIcon, Download, RefreshCw, Filter } from "lucide-react"
import { format } from "date-fns"

// Mock data for demonstration
const mockActivityLogs = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    action: "User Login",
    details: "Successful login from 192.168.1.1",
    timestamp: "2023-05-08T10:30:00",
    ipAddress: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    status: "success",
  },
  {
    id: "2",
    userId: "2",
    userName: "Jane Smith",
    action: "Password Reset",
    details: "Password reset requested",
    timestamp: "2023-05-07T14:45:00",
    ipAddress: "192.168.1.2",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
    status: "success",
  },
  {
    id: "3",
    userId: "3",
    userName: "Bob Johnson",
    action: "User Login",
    details: "Failed login attempt",
    timestamp: "2023-05-07T09:15:00",
    ipAddress: "192.168.1.3",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    status: "error",
  },
  {
    id: "4",
    userId: "1",
    userName: "John Doe",
    action: "User Update",
    details: "Profile information updated",
    timestamp: "2023-05-06T16:20:00",
    ipAddress: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    status: "success",
  },
  {
    id: "5",
    userId: "4",
    userName: "Alice Williams",
    action: "Role Change",
    details: "Role changed from Viewer to Editor",
    timestamp: "2023-05-05T11:10:00",
    ipAddress: "192.168.1.4",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    status: "success",
  },
  {
    id: "6",
    userId: "3",
    userName: "Bob Johnson",
    action: "Account Locked",
    details: "Account locked due to multiple failed login attempts",
    timestamp: "2023-05-05T09:30:00",
    ipAddress: "192.168.1.3",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    status: "warning",
  },
]

export function ActivityLogs() {
  const [logs, setLogs] = useState(mockActivityLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [showFilters, setShowFilters] = useState(false)

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm)

    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    const matchesDate = !date || new Date(log.timestamp).toDateString() === date.toDateString()

    return matchesSearch && matchesAction && matchesStatus && matchesDate
  })

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)))

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-slate-500 dark:text-slate-400">Monitor user activity and system events</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.filter((log) => log.action === "User Login" && log.status === "error").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Account Lockouts</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.filter((log) => log.action === "Account Locked").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Activity Log</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="hidden sm:flex">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showFilters && (
            <div className="flex flex-wrap gap-4 mb-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
              <div className="w-full sm:w-auto">
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    {uniqueActions.map((action) => (
                      <SelectItem key={action} value={action}>
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-[180px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full sm:w-auto sm:ml-auto">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActionFilter("all")
                    setStatusFilter("all")
                    setDate(undefined)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Details</TableHead>
                  <TableHead className="hidden md:table-cell">IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No logs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.userName}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">{log.details}</TableCell>
                      <TableCell className="hidden md:table-cell">{log.ipAddress}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "success" ? "default" : log.status === "error" ? "destructive" : "outline"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
