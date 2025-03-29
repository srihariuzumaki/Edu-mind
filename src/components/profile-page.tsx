import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/lib/theme"
import { MainNav } from "@/components/main-nav"


export function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const { setTheme, theme } = useTheme()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MainNav />
      </header>
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-12 gap-px p-1 bg-muted rounded-lg">
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="statistics" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Statistics
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileImage || ""} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        id="profile-image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button variant="outline" asChild>
                        <label htmlFor="profile-image">Update Profile Picture</label>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" placeholder="Your display name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" readOnly value="user@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Tell us about yourself" />
                    </div>
                    <div>
                      <Label htmlFor="learningPreferences">Learning Preferences</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your learning style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visual">Visual</SelectItem>
                          <SelectItem value="auditory">Auditory</SelectItem>
                          <SelectItem value="reading">Reading/Writing</SelectItem>
                          <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col justify-between p-6 rounded-lg bg-muted">
                        <h3 className="font-semibold text-lg">Total Study Time</h3>
                        <p className="text-3xl font-bold mt-2">120 hours</p>
                      </div>
                      <div className="flex flex-col justify-between p-6 rounded-lg bg-muted">
                        <h3 className="font-semibold text-lg">Completed Courses</h3>
                        <p className="text-3xl font-bold mt-2">5</p>
                      </div>
                      <div className="flex flex-col justify-between p-6 rounded-lg bg-muted">
                        <h3 className="font-semibold text-lg">Average Quiz Score</h3>
                        <p className="text-3xl font-bold mt-2">85%</p>
                      </div>
                      <div className="flex flex-col justify-between p-6 rounded-lg bg-muted">
                        <h3 className="font-semibold text-lg">Achievement Badges</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">Perfect Score</Badge>
                          <Badge variant="secondary">Streak Master</Badge>
                          <Badge variant="secondary">Early Bird</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between p-6 rounded-lg bg-muted">
                        <h3 className="font-semibold text-lg">Learning Streak</h3>
                        <p className="text-3xl font-bold mt-2">7 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <Switch id="emailNotifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <Switch id="pushNotifications" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Recently Viewed Courses</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium">Introduction to Programming</h4>
                        <p className="text-sm text-muted-foreground">Last viewed: 2 days ago</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium">Data Structures</h4>
                        <p className="text-sm text-muted-foreground">Last viewed: 1 week ago</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Saved Content</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium">Algorithm Notes</h4>
                        <p className="text-sm text-muted-foreground">Saved: 3 days ago</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Learning Progress</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium">Web Development</h4>
                        <div className="w-full bg-primary/20 rounded-full h-2.5 mt-2">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">75% Complete</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Quiz History</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-medium">JavaScript Basics</h4>
                        <p className="text-sm text-muted-foreground">Score: 90% | Date: 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
    </div>
  )
} 