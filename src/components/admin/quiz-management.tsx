import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockQuizzes = [
  {
    id: 1,
    title: "JavaScript Basics Quiz",
    course: "Introduction to Programming",
    questions: 10,
    duration: "30 mins",
    status: "Published",
    averageScore: 85,
    attempts: 120,
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Data Structures Assessment",
    course: "Computer Science Fundamentals",
    questions: 15,
    duration: "45 mins",
    status: "Draft",
    averageScore: 0,
    attempts: 0,
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Web Development Final",
    course: "Web Development 101",
    questions: 20,
    duration: "60 mins",
    status: "Published",
    averageScore: 78,
    attempts: 85,
    lastUpdated: "3 days ago",
  }
]

export function QuizManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false)

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || quiz.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quiz Management</CardTitle>
            <Button onClick={() => setIsCreatingQuiz(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
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

          {/* Quizzes Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.course}</TableCell>
                    <TableCell>{quiz.questions}</TableCell>
                    <TableCell>{quiz.duration}</TableCell>
                    <TableCell>
                      <Badge variant={quiz.status === "Published" ? "default" : "secondary"}>
                        {quiz.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{quiz.averageScore}%</TableCell>
                    <TableCell>{quiz.attempts}</TableCell>
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
        </CardContent>
      </Card>

      {/* Create Quiz Dialog */}
      {isCreatingQuiz && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Quiz Title</label>
                <Input placeholder="Enter quiz title" />
              </div>
              <div>
                <label className="text-sm font-medium">Course</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intro-programming">Introduction to Programming</SelectItem>
                    <SelectItem value="cs-fundamentals">Computer Science Fundamentals</SelectItem>
                    <SelectItem value="web-dev">Web Development 101</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Number of Questions</label>
                <Input type="number" placeholder="Enter number of questions" />
              </div>
              <div>
                <label className="text-sm font-medium">Duration (minutes)</label>
                <Input type="number" placeholder="Enter duration in minutes" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Enter quiz description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingQuiz(false)}>
                  Cancel
                </Button>
                <Button>Create Quiz</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 