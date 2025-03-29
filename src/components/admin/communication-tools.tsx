import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Megaphone, 
  Mail, 
  Bell, 
  MessageSquare,
  Plus,
  Calendar,
  Users,
  Target,
  Send,
  Clock,
  CheckCircle
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockAnnouncements = [
  {
    id: 1,
    title: "New Course Available",
    content: "Introduction to Machine Learning is now available!",
    status: "Active",
    date: "2024-03-15",
    audience: "All Users",
  },
  {
    id: 2,
    title: "System Maintenance",
    content: "Scheduled maintenance on March 20th",
    status: "Scheduled",
    date: "2024-03-20",
    audience: "All Users",
  },
]

const mockCampaigns = [
  {
    id: 1,
    name: "Welcome Series",
    status: "Active",
    subscribers: 1200,
    openRate: 85,
    lastSent: "2 days ago",
  },
  {
    id: 2,
    name: "Course Recommendations",
    status: "Draft",
    subscribers: 0,
    openRate: 0,
    lastSent: "Never",
  },
]

const mockNotifications = [
  {
    id: 1,
    title: "Course Reminder",
    content: "Don't forget to complete your assignments!",
    status: "Active",
    type: "Push",
    sent: 850,
  },
  {
    id: 2,
    title: "New Message",
    content: "You have a new message from your instructor",
    status: "Active",
    type: "In-App",
    sent: 1200,
  },
]

export function CommunicationTools() {
  const [activeTab, setActiveTab] = useState("announcements")
  const [announcementTitle, setAnnouncementTitle] = useState("")
  const [announcementContent, setAnnouncementContent] = useState("")
  const [announcementAudience, setAnnouncementAudience] = useState("all")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Communication Tools</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="announcements">
                <Megaphone className="mr-2 h-4 w-4" />
                Announcements
              </TabsTrigger>
              <TabsTrigger value="campaigns">
                <Mail className="mr-2 h-4 w-4" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="announcements" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Announcement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={announcementTitle}
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                        placeholder="Enter announcement title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Input
                        id="content"
                        value={announcementContent}
                        onChange={(e) => setAnnouncementContent(e.target.value)}
                        placeholder="Enter announcement content"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select value={announcementAudience} onValueChange={setAnnouncementAudience}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="students">Students Only</SelectItem>
                          <SelectItem value="teachers">Teachers Only</SelectItem>
                          <SelectItem value="admins">Admins Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Announcement
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnnouncements.map((announcement) => (
                        <div key={announcement.id} className="flex items-start justify-between p-4 rounded-lg bg-muted">
                          <div className="space-y-1">
                            <p className="font-medium">{announcement.title}</p>
                            <p className="text-sm text-muted-foreground">{announcement.content}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {announcement.date}
                              <Users className="h-3 w-3" />
                              {announcement.audience}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={announcement.status === "Active" ? "default" : "secondary"}>
                              {announcement.status}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div className="space-y-1">
                          <p className="font-medium">{campaign.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {campaign.subscribers} subscribers
                            <Target className="h-3 w-3" />
                            {campaign.openRate}% open rate
                            <Clock className="h-3 w-3" />
                            Last sent: {campaign.lastSent}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div className="space-y-1">
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.content}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Bell className="h-3 w-3" />
                            {notification.type}
                            <CheckCircle className="h-3 w-3" />
                            Sent to {notification.sent} users
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={notification.status === "Active" ? "default" : "secondary"}>
                            {notification.status}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 