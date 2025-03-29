import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlayCircle, 
  CheckCircle, 
  Clock,
  BookOpen,
  Star,
  ArrowRight,
  Video,
  FileText,
  Image as ImageIcon,
  Link,
  ThumbsUp,
  Users
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockCurrentLessons = [
  {
    id: 1,
    title: "Functions and Methods",
    course: "Introduction to Programming",
    type: "video",
    duration: "15:00",
    progress: 0,
    lastAccessed: "Never",
    resources: [
      { type: "file", name: "Functions Cheat Sheet.pdf" },
      { type: "link", name: "Additional Reading" }
    ]
  },
  {
    id: 2,
    title: "CSS Layouts",
    course: "Web Development 101",
    type: "text",
    duration: "20 mins",
    progress: 0,
    lastAccessed: "Never",
    resources: [
      { type: "image", name: "Layout Examples.png" }
    ]
  }
]

const mockCompletedLessons = [
  {
    id: 3,
    title: "Variables and Data Types",
    course: "Introduction to Programming",
    type: "video",
    duration: "12:00",
    completedDate: "2 days ago",
    rating: 5,
    resources: [
      { type: "file", name: "Variables Guide.pdf" }
    ]
  },
  {
    id: 4,
    title: "HTML Basics",
    course: "Web Development 101",
    type: "text",
    duration: "25 mins",
    completedDate: "1 week ago",
    rating: 4,
    resources: [
      { type: "link", name: "HTML Documentation" }
    ]
  }
]

const mockRecommendedLessons = [
  {
    id: 5,
    title: "Object-Oriented Programming",
    course: "Introduction to Programming",
    type: "video",
    duration: "18:00",
    rating: 4.8,
    enrolledStudents: 150,
    resources: [
      { type: "file", name: "OOP Guide.pdf" }
    ]
  },
  {
    id: 6,
    title: "Responsive Design",
    course: "Web Development 101",
    type: "text",
    duration: "30 mins",
    rating: 4.6,
    enrolledStudents: 120,
    resources: [
      { type: "image", name: "Responsive Examples.png" }
    ]
  }
]

export function LessonSection() {
  const [activeTab, setActiveTab] = useState("current")

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "file":
        return <FileText className="h-4 w-4" />
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
            <CardTitle>My Lessons</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">
                <PlayCircle className="mr-2 h-4 w-4" />
                Current
              </TabsTrigger>
              <TabsTrigger value="completed">
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="recommended">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Recommended
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              {mockCurrentLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          {getContentIcon(lesson.type)}
                          <h3 className="font-semibold">{lesson.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{lesson.course}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {lesson.duration}
                          </div>
                          <div className="flex items-center">
                            <PlayCircle className="mr-1 h-4 w-4" />
                            {lesson.progress}% Complete
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          Last accessed: {lesson.lastAccessed}
                        </div>
                        {lesson.resources.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {lesson.resources.map((resource, index) => (
                              <Badge key={index} variant="secondary">
                                {getContentIcon(resource.type)} {resource.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {mockCompletedLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          {getContentIcon(lesson.type)}
                          <h3 className="font-semibold">{lesson.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{lesson.course}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {lesson.duration}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Completed
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {lesson.completedDate}
                        </div>
                        {lesson.resources.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {lesson.resources.map((resource, index) => (
                              <Badge key={index} variant="secondary">
                                {getContentIcon(resource.type)} {resource.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{lesson.rating}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommended" className="space-y-4">
              {mockRecommendedLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          {getContentIcon(lesson.type)}
                          <h3 className="font-semibold">{lesson.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{lesson.course}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {lesson.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {lesson.enrolledStudents} students
                          </div>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4" />
                            {lesson.rating}
                          </div>
                        </div>
                        {lesson.resources.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {lesson.resources.map((resource, index) => (
                              <Badge key={index} variant="secondary">
                                {getContentIcon(resource.type)} {resource.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button variant="default" size="sm" className="ml-4">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Learning Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours Watched</p>
                <p className="text-2xl font-bold">12.5</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 