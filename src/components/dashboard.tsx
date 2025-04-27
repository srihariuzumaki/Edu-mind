import { useState, useEffect } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
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
  Star,
  Menu,
  LayoutDashboard,
  Book,
  FileCheck,
  Sun,
  Moon,
  User,
  X
} from "lucide-react"
import { CourseSection } from "./user/course-section"
import { LessonSection } from "./user/lesson-section"
import { QuizSection } from "./user/quiz-section"
import { useTheme } from "next-themes"

// Mock data for dashboard overview
const mockOverview = {
  totalCourses: 12,
  activeStudents: 450,
  averageCompletionRate: 78,
  averageRating: 4.8,
}

export function Dashboard() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      switch (section) {
        case 'courses':
          setActiveTab('courses')
          break
        case 'adaptive':
        case 'progress':
        case 'community':
        case 'gamification':
        case 'language':
          setActiveTab('overview')
          break
        default:
          setActiveTab('overview')
      }
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="dark:bg-black dark:text-white dark:hover:bg-black/80"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
              Vocal-Mind
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/ai-tutor')}
              className="hidden md:flex items-center gap-2 bg-black text-white hover:bg-gray-800"
            >
              Try AI Tutor
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="dark:bg-black dark:text-white dark:hover:bg-black/80"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="dark:bg-black dark:text-white dark:hover:bg-black/80"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-card shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">
            Vocal-Mind
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(false)}
            className="dark:bg-black dark:text-white dark:hover:bg-black/80"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-1 p-4">
          <Button 
            variant={activeTab === "overview" ? "secondary" : "ghost"} 
            className="w-full justify-start dark:bg-black dark:text-white dark:hover:bg-black/80"
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button 
            variant={activeTab === "courses" ? "secondary" : "ghost"} 
            className="w-full justify-start dark:bg-black dark:text-white dark:hover:bg-black/80"
            onClick={() => setActiveTab("courses")}
          >
            <Book className="mr-2 h-4 w-4" />
            Courses
          </Button>
          <Button 
            variant={activeTab === "lessons" ? "secondary" : "ghost"} 
            className="w-full justify-start dark:bg-black dark:text-white dark:hover:bg-black/80"
            onClick={() => setActiveTab("lessons")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Lessons
          </Button>
          <Button 
            variant={activeTab === "quizzes" ? "secondary" : "ghost"} 
            className="w-full justify-start dark:bg-black dark:text-white dark:hover:bg-black/80"
            onClick={() => setActiveTab("quizzes")}
          >
            <FileCheck className="mr-2 h-4 w-4" />
            Quizzes
          </Button>
         
          
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-background pt-24">
        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Overview Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card hover:bg-accent/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockOverview.totalCourses}</div>
                    <p className="text-xs text-muted-foreground">Active courses</p>
                  </CardContent>
                </Card>
                <Card className="bg-card hover:bg-accent/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockOverview.activeStudents}</div>
                    <p className="text-xs text-muted-foreground">Currently enrolled</p>
                  </CardContent>
                </Card>
                <Card className="bg-card hover:bg-accent/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockOverview.averageCompletionRate}%</div>
                    <p className="text-xs text-muted-foreground">Average across courses</p>
                  </CardContent>
                </Card>
                <Card className="bg-card hover:bg-accent/50 transition-colors">
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
              <Card className="bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Content Management</CardTitle>
                    <Button className="dark:bg-black dark:text-white dark:hover:bg-black/80">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Content
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 bg-muted">
                      <TabsTrigger value="courses" className="dark:bg-black dark:text-white dark:hover:bg-black/80">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Courses
                      </TabsTrigger>
                      <TabsTrigger value="lessons" className="dark:bg-black dark:text-white dark:hover:bg-black/80">
                        <FileText className="mr-2 h-4 w-4" />
                        Lessons
                      </TabsTrigger>
                      <TabsTrigger value="quizzes" className="dark:bg-black dark:text-white dark:hover:bg-black/80">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Quizzes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="courses">
                      <CourseSection />
                    </TabsContent>

                    <TabsContent value="lessons">
                      <LessonSection />
                    </TabsContent>

                    <TabsContent value="quizzes">
                      <QuizSection />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "courses" && <CourseSection />}
          {activeTab === "lessons" && <LessonSection />}
          {activeTab === "quizzes" && <QuizSection />}
          {activeTab === "settings" && (
            <div className="text-center text-muted-foreground">
              Settings page coming soon...
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 