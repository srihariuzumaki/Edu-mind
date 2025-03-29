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
  FileText, 
  HelpCircle, 
  Search, 
  Filter, 
  MoreHorizontal,
} from "lucide-react"
import { CourseManagement } from "./course-management"
import { LessonManagement } from "./lesson-management"

// Mock data - replace with actual data from your backend
const mockQuizzes = [
  {
    id: 1,
    title: "Programming Basics Quiz",
    course: "Introduction to Programming",
    questions: 10,
    status: "Published",
    lastUpdated: "1 day ago",
  },
  {
    id: 2,
    title: "Data Types Assessment",
    course: "Introduction to Programming",
    questions: 5,
    status: "Draft",
    lastUpdated: "2 days ago",
  },
]

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState("courses")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Content Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="lessons">
                <FileText className="mr-2 h-4 w-4" />
                Lessons
              </TabsTrigger>
              <TabsTrigger value="quizzes">
                <HelpCircle className="mr-2 h-4 w-4" />
                Quizzes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <CourseManagement />
            </TabsContent>

            <TabsContent value="lessons">
              <LessonManagement />
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search quizzes..."
                    className="pl-8"
                  />
                </div>
                <Select>
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

              {/* Quizzes Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockQuizzes.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell className="font-medium">{quiz.title}</TableCell>
                        <TableCell>{quiz.course}</TableCell>
                        <TableCell>{quiz.questions}</TableCell>
                        <TableCell>
                          <Badge variant={quiz.status === "Published" ? "default" : "secondary"}>
                            {quiz.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{quiz.lastUpdated}</TableCell>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 