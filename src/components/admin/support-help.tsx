import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  HelpCircle, 
  FileText, 
  MessageSquare, 
  Search,
  Plus,
  Clock,
  User,
  Tag,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockTickets = [
  {
    id: 1,
    subject: "Course Access Issue",
    user: "student@example.com",
    priority: "High",
    status: "Open",
    category: "Technical",
    lastUpdated: "2 hours ago",
    assignedTo: "John Smith",
  },
  {
    id: 2,
    subject: "Payment Question",
    user: "user@example.com",
    priority: "Medium",
    status: "In Progress",
    category: "Billing",
    lastUpdated: "5 hours ago",
    assignedTo: "Sarah Johnson",
  },
  {
    id: 3,
    subject: "Content Request",
    user: "teacher@example.com",
    priority: "Low",
    status: "Resolved",
    category: "Content",
    lastUpdated: "1 day ago",
    assignedTo: "Mike Wilson",
  },
]

const mockFAQs = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer: "Click on the 'Forgot Password' link on the login page...",
    category: "Account",
    views: 1250,
    helpful: 980,
    lastUpdated: "2024-03-01",
  },
  {
    id: 2,
    question: "How do I enroll in a course?",
    answer: "Browse the course catalog, select a course, and click 'Enroll'...",
    category: "Courses",
    views: 850,
    helpful: 720,
    lastUpdated: "2024-02-15",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers...",
    category: "Billing",
    views: 650,
    helpful: 580,
    lastUpdated: "2024-01-20",
  },
]

const mockHelpDocs = [
  {
    id: 1,
    title: "Getting Started Guide",
    category: "User Guide",
    author: "Support Team",
    lastUpdated: "2024-03-15",
    views: 3200,
    status: "Published",
  },
  {
    id: 2,
    title: "Teacher Dashboard Guide",
    category: "Teacher Guide",
    author: "Support Team",
    lastUpdated: "2024-03-10",
    views: 1500,
    status: "Published",
  },
  {
    id: 3,
    title: "API Integration Guide",
    category: "Developer Guide",
    author: "Technical Team",
    lastUpdated: "2024-03-05",
    views: 800,
    status: "Draft",
  },
]

export function SupportHelp() {
  const [activeTab, setActiveTab] = useState("tickets")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Support & Help</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tickets">
                <MessageSquare className="mr-2 h-4 w-4" />
                Support Tickets
              </TabsTrigger>
              <TabsTrigger value="faqs">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="docs">
                <FileText className="mr-2 h-4 w-4" />
                Help Docs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div className="space-y-1">
                      <p className="font-medium">{ticket.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {ticket.user}
                        <Clock className="h-3 w-3" />
                        {ticket.lastUpdated}
                        <Tag className="h-3 w-3" />
                        {ticket.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{ticket.assignedTo}</p>
                        <Badge variant={ticket.status === "Resolved" ? "default" : "secondary"}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <Badge variant={ticket.priority === "High" ? "destructive" : ticket.priority === "Medium" ? "default" : "secondary"}>
                        {ticket.priority}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </div>

              <div className="space-y-4">
                {mockFAQs.map((faq) => (
                  <div key={faq.id} className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="font-medium">{faq.question}</p>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Tag className="h-3 w-3" />
                          {faq.category}
                          <Search className="h-3 w-3" />
                          {faq.views} views
                          <CheckCircle className="h-3 w-3" />
                          {faq.helpful} found helpful
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="docs" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="user-guide">User Guide</SelectItem>
                    <SelectItem value="teacher-guide">Teacher Guide</SelectItem>
                    <SelectItem value="developer-guide">Developer Guide</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Document
                </Button>
              </div>

              <div className="space-y-4">
                {mockHelpDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div className="space-y-1">
                      <p className="font-medium">{doc.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Tag className="h-3 w-3" />
                        {doc.category}
                        <User className="h-3 w-3" />
                        {doc.author}
                        <Clock className="h-3 w-3" />
                        Updated {doc.lastUpdated}
                        <Search className="h-3 w-3" />
                        {doc.views} views
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === "Published" ? "default" : "secondary"}>
                        {doc.status}
                      </Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 