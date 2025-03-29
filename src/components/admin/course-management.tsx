import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Clock,
  Users,
  Star,
  FileText,
  Upload,
  FolderPlus,
  GripVertical
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Programming",
    category: "Programming",
    status: "Published",
    students: 120,
    rating: 4.8,
    lastUpdated: "2 days ago",
    chapters: [
      { id: 1, title: "Getting Started", lessons: 5 },
      { id: 2, title: "Basic Concepts", lessons: 8 },
      { id: 3, title: "Advanced Topics", lessons: 6 }
    ]
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    category: "Computer Science",
    status: "Draft",
    students: 0,
    rating: 0,
    lastUpdated: "1 week ago",
    chapters: [
      { id: 1, title: "Arrays and Lists", lessons: 4 },
      { id: 2, title: "Trees and Graphs", lessons: 7 }
    ]
  }
]

export function CourseManagement() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreatingCourse, setIsCreatingCourse] = useState(false)
  const [isCreatingChapter, setIsCreatingChapter] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Course Management</CardTitle>
            <Button onClick={() => setIsCreatingCourse(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="content">
                <FileText className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4">
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
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

              {/* Courses Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Chapters</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.chapters.length} chapters</TableCell>
                        <TableCell>
                          <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            {course.students}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            {course.rating}
                          </div>
                        </TableCell>
                        <TableCell>{course.lastUpdated}</TableCell>
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
              {selectedCourse ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {mockCourses.find(c => c.id === selectedCourse)?.title}
                    </h3>
                    <Button onClick={() => setIsCreatingChapter(true)}>
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Add Chapter
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {mockCourses.find(c => c.id === selectedCourse)?.chapters.map((chapter) => (
                      <Card key={chapter.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                              <CardTitle className="text-base">{chapter.title}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                {chapter.lessons} Lessons
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Select a course to manage its content</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create Course Dialog */}
      {isCreatingCourse && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Course Title</label>
                <Input placeholder="Enter course title" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Enter course description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingCourse(false)}>
                  Cancel
                </Button>
                <Button>Create Course</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Chapter Dialog */}
      {isCreatingChapter && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Chapter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Chapter Title</label>
                <Input placeholder="Enter chapter title" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Enter chapter description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingChapter(false)}>
                  Cancel
                </Button>
                <Button>Add Chapter</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 