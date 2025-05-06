"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Facebook, Github, Globe, Instagram, Pencil, Save, Twitter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

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
  fullName: "Johnatan Smith",
  email: "example@example.com",
  phone: "(097) 234-5678",
  mobile: "(098) 765-4321",
  address: "Bay Area, San Francisco, CA",
  jobTitle: "Full Stack Developer",
  location: "Bay Area, San Francisco, CA",
}

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false)

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

  return (
    <>
      {/* Left Column - Profile Card */}
      <Card className="md:col-span-1">
        <CardContent className="flex flex-col items-center pt-6">
          <div className="w-32 h-32 relative mb-4">
            <Image
              src="/placeholder.svg?height=128&width=128"
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
      <div className="md:col-span-2 space-y-6">
        {/* Personal Information */}
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

        {/* Project Status Cards */}
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
      </div>
    </>
  )
}
