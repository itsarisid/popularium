"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Check,
  Facebook,
  Github,
  Globe,
  Instagram,
  Layout,
  Moon,
  Pencil,
  Save,
  Settings,
  Shield,
  Sun,
  Twitter,
  User,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner";
import icon from "@/assets/pilot.png";

// Define the form schema with validation
const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  mobile: z.string().min(6, { message: "Please enter a valid mobile number." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Default values for the form
const defaultValues: ProfileFormValues = {
  fullName: "Sajid Khan",
  email: "example@example.com",
  phone: "(097) 234-5678",
  mobile: "(098) 765-4321",
  address: "Bay Area, San Francisco, CA",
  jobTitle: "Full Stack Developer",
  location: "Bay Area, San Francisco, CA",
}

// Roles and privileges data
const rolesAndPrivileges = [
  {
    role: "Administrator",
    level: "System",
    privileges: [
      { name: "User Management", description: "Create, edit, and delete users", granted: true },
      { name: "Role Management", description: "Create, edit, and delete roles", granted: true },
      { name: "System Configuration", description: "Configure system settings", granted: true },
    ],
  },
  {
    role: "Project Manager",
    level: "Application",
    privileges: [
      { name: "Project Creation", description: "Create new projects", granted: true },
      { name: "Team Management", description: "Add and remove team members", granted: true },
      { name: "Budget Approval", description: "Approve project budgets", granted: false },
    ],
  },
  {
    role: "Developer",
    level: "Application",
    privileges: [
      { name: "Code Repository", description: "Access to code repositories", granted: true },
      { name: "Deployment", description: "Deploy to staging environments", granted: true },
      { name: "Production Access", description: "Access production environments", granted: false },
    ],
  },
]

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [theme, setTheme] = useState("light")
  const [colorScheme, setColorScheme] = useState("default")
  const [layout, setLayout] = useState("comfortable")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    inApp: true,
  })
  const [language, setLanguage] = useState("english")
  const [timezone, setTimezone] = useState("(GMT-08:00) Pacific Time")

  // Initialize the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  // Handle form submission
  function onSubmit(data: ProfileFormValues) {
    toast("Profile updated",{
      description: "Your profile information has been updated successfully.",
    })
    setIsEditing(false)
    console.log(data)
  }

  // Cancel editing and reset form
  function cancelEdit() {
    form.reset()
    setIsEditing(false)
  }

  // Save settings
  function saveSettings() {
    toast("Settings saved",{
      description: "Your settings have been updated successfully.",
    })
    console.log({ theme, colorScheme, layout, notifications, language, timezone })
  }

  return (
    <>
      {/* Left Column - Profile Card */}
      <Card className="">
        <CardContent className="flex flex-col items-center pt-6">
          <div className="w-32 h-32 relative mb-4">
            <Image
              src={icon}
              alt="Profile avatar"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold">John Smith</h2>
          <p className="text-muted-foreground">{form.watch("jobTitle")}</p>
          <p className="text-muted-foreground text-sm mb-4">{form.watch("location")}</p>

          <div className="flex gap-3 w-full mb-6">
            <Button className="flex-1">FOLLOW</Button>
            <Button variant="outline" className="flex-1">
              MESSAGE
            </Button>
          </div>

          {/* Social Links */}
          <div className="w-full">
            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span>Website</span>
              </div>
              <Link href="https://example.com" className="text-primary">
                https://example.com
              </Link>
            </div>
            <Separator />

            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-muted-foreground" />
                <span>GitHub</span>
              </div>
              <Link href="https://github.com/username" className="text-primary">
                username
              </Link>
            </div>
            <Separator />

            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <Twitter className="h-5 w-5 text-muted-foreground" />
                <span>Twitter</span>
              </div>
              <Link href="https://twitter.com/username" className="text-primary">
                @username
              </Link>
            </div>
            <Separator />

            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-muted-foreground" />
                <span>Instagram</span>
              </div>
              <Link href="https://instagram.com/username" className="text-primary">
                username
              </Link>
            </div>
            <Separator />

            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <Facebook className="h-5 w-5 text-muted-foreground" />
                <span>Facebook</span>
              </div>
              <Link href="https://facebook.com/username" className="text-primary">
                username
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Info and Projects */}
      <div className="col-span-2 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="roles">
              <Shield className="h-4 w-4 mr-2" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Layout className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-medium">Personal Information</h3>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-3 items-center">
                      <h3 className="text-muted-foreground">Full Name</h3>
                      <div className="col-span-2">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>{form.watch("fullName")}</p>
                        )}
                      </div>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-3 items-center">
                      <h3 className="text-muted-foreground">Job Title</h3>
                      <div className="col-span-2">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>{form.watch("jobTitle")}</p>
                        )}
                      </div>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-3 items-center">
                      <h3 className="text-muted-foreground">Email</h3>
                      <div className="col-span-2">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>{form.watch("email")}</p>
                        )}
                      </div>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-3 items-center">
                      <h3 className="text-muted-foreground">Phone</h3>
                      <div className="col-span-2">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>{form.watch("phone")}</p>
                        )}
                      </div>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-3 items-center">
                      <h3 className="text-muted-foreground">Mobile</h3>
                      <div className="col-span-2">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>{form.watch("mobile")}</p>
                        )}
                      </div>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-3 items-center">
                      <h3 className="text-muted-foreground">Address</h3>
                      <div className="col-span-2">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea {...field} rows={2} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>{form.watch("address")}</p>
                        )}
                      </div>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-3 items-center">
                      <h3 className="text-muted-foreground">Location</h3>
                      <div className="col-span-2">
                        {isEditing ? (
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <p>{form.watch("location")}</p>
                        )}
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Roles and Privileges</h3>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {rolesAndPrivileges.map((roleGroup, index) => (
                    <AccordionItem key={index} value={`role-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <span>{roleGroup.role}</span>
                          <Badge variant={roleGroup.level === "System" ? "destructive" : "default"}>
                            {roleGroup.level}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pl-9">
                          {roleGroup.privileges.map((privilege, privIndex) => (
                            <div key={privIndex} className="flex items-start justify-between">
                              <div>
                                <p className="font-medium">{privilege.name}</p>
                                <p className="text-sm text-muted-foreground">{privilege.description}</p>
                              </div>
                              {privilege.granted ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <Check className="h-3 w-3 mr-1" /> Granted
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  <X className="h-3 w-3 mr-1" /> Not Granted
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Application Settings</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Theme Settings */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Theme</h4>
                    <RadioGroup value={theme} onValueChange={setTheme} className="flex space-x-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="flex items-center">
                          <Sun className="h-4 w-4 mr-1" /> Light
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="flex items-center">
                          <Moon className="h-4 w-4 mr-1" /> Dark
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system">System</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Color Scheme */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Color Scheme</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {["default", "purple", "green", "orange"].map((color) => (
                        <div
                          key={color}
                          className={`h-10 rounded-md cursor-pointer border-2 ${
                            colorScheme === color ? "border-primary" : "border-transparent"
                          }`}
                          style={{
                            backgroundColor:
                              color === "default"
                                ? "rgb(99, 102, 241)"
                                : color === "purple"
                                  ? "rgb(147, 51, 234)"
                                  : color === "green"
                                    ? "rgb(16, 185, 129)"
                                    : "rgb(249, 115, 22)",
                          }}
                          onClick={() => setColorScheme(color)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Layout Density */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Layout Density</h4>
                    <RadioGroup value={layout} onValueChange={setLayout} className="flex space-x-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="layout-compact" />
                        <Label htmlFor="layout-compact">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="layout-comfortable" />
                        <Label htmlFor="layout-comfortable">Comfortable</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* System Settings */}
                  <div className="space-y-4">
                    <h4 className="font-medium">System Settings</h4>

                    {/* Notifications */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium">Notifications</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <Switch
                            id="email-notifications"
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <Switch
                            id="push-notifications"
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <Switch
                            id="sms-notifications"
                            checked={notifications.sms}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="inapp-notifications">In-App Notifications</Label>
                          <Switch
                            id="inapp-notifications"
                            checked={notifications.inApp}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, inApp: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language" className="w-full">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Timezone */}
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone" className="w-full">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific Time</SelectItem>
                          <SelectItem value="(GMT-07:00) Mountain Time">(GMT-07:00) Mountain Time</SelectItem>
                          <SelectItem value="(GMT-06:00) Central Time">(GMT-06:00) Central Time</SelectItem>
                          <SelectItem value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</SelectItem>
                          <SelectItem value="(GMT+00:00) UTC">(GMT+00:00) UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Privacy Settings */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Privacy Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="profile-visibility">Public Profile Visibility</Label>
                        <Switch id="profile-visibility" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="activity-tracking">Activity Tracking</Label>
                        <Switch id="activity-tracking" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-collection">Data Collection</Label>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={saveSettings}>
                      <Save className="h-4 w-4 mr-2" /> Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Status 1 */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium">
                    <span className="text-primary">assignment</span> Project Status
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Web Design</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Website Markup</span>
                      <span>50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>One Page</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Mobile Template</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Backend API</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Project Status 2 */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium">
                    <span className="text-primary">assignment</span> Project Status
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Web Design</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Website Markup</span>
                      <span>55%</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>One Page</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Mobile Template</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Backend API</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
