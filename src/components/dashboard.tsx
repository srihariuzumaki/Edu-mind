import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Plus,
  Clock,
  Users,
  Star
} from "lucide-react"
import { CourseManagement } from "./admin/course-management"
import { LessonManagement } from "./admin/lesson-management"

// Mock data for dashboard overview
const mockOverview = {
  totalCourses: 12,
  activeStudents: 450,
  averageCompletionRate: 78,
  averageRating: 4.8,
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOverview.totalCourses}</div>
                <p className="text-xs text-muted-foreground">Active courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOverview.activeStudents}</div>
                <p className="text-xs text-muted-foreground">Currently enrolled</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOverview.averageCompletionRate}%</div>
                <p className="text-xs text-muted-foreground">Average across courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOverview.averageRating}</div>
                <p className="text-xs text-muted-foreground">Based on student feedback</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Content Management</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Content
                </Button>
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

                <TabsContent value="quizzes">
                  <div className="text-center text-muted-foreground">
                    Quiz management coming soon...
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 