import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Clock,
  Upload,
  GripVertical,
  Video,
  File,
  Image as ImageIcon,
  Link
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockLessons = [
  {
    id: 1,
    title: "Introduction to Variables",
    chapter: "Getting Started",
    type: "video",
    duration: "15:00",
    status: "Published",
    lastUpdated: "2 days ago",
    content: {
      videoUrl: "https://example.com/video1.mp4",
      description: "Learn about variables and their types",
      resources: [
        { type: "file", name: "Variables Cheat Sheet.pdf", url: "https://example.com/cheatsheet.pdf" },
        { type: "link", name: "Additional Reading", url: "https://example.com/reading" }
      ]
    }
  },
  {
    id: 2,
    title: "Control Structures",
    chapter: "Basic Concepts",
    type: "text",
    duration: "20 mins",
    status: "Draft",
    lastUpdated: "1 day ago",
    content: {
      text: "Learn about if statements, loops, and switch cases...",
      resources: [
        { type: "image", name: "Flowchart.png", url: "https://example.com/flowchart.png" }
      ]
    }
  }
]

export function LessonManagement() {
  const [activeTab, setActiveTab] = useState("lessons")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreatingLesson, setIsCreatingLesson] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  const filteredLessons = mockLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || lesson.type === typeFilter
    const matchesStatus = statusFilter === "all" || lesson.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "file":
        return <File className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "link":
        return <Link className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lesson Management</CardTitle>
            <Button onClick={() => setIsCreatingLesson(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Lesson
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lessons">
                <FileText className="mr-2 h-4 w-4" />
                Lessons
              </TabsTrigger>
              <TabsTrigger value="content">
                <Upload className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-4">
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lessons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Content Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lessons Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Chapter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLessons.map((lesson) => (
                      <TableRow key={lesson.id}>
                        <TableCell className="font-medium">{lesson.title}</TableCell>
                        <TableCell>{lesson.chapter}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getContentIcon(lesson.type)}
                            <span className="ml-2 capitalize">{lesson.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {lesson.duration}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={lesson.status === "Published" ? "default" : "secondary"}>
                            {lesson.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{lesson.lastUpdated}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              {selectedLesson ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {mockLessons.find(l => l.id === selectedLesson)?.title}
                    </h3>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Content
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockLessons.find(l => l.id === selectedLesson)?.content.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-2">
                              {getContentIcon(resource.type)}
                              <span>{resource.name}</span>
                            </div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Select a lesson to manage its content</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create Lesson Dialog */}
      {isCreatingLesson && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Lesson Title</label>
                <Input placeholder="Enter lesson title" />
              </div>
              <div>
                <label className="text-sm font-medium">Chapter</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="getting-started">Getting Started</SelectItem>
                    <SelectItem value="basic-concepts">Basic Concepts</SelectItem>
                    <SelectItem value="advanced-topics">Advanced Topics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Content Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Enter lesson description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingLesson(false)}>
                  Cancel
                </Button>
                <Button>Create Lesson</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 