import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Clock, 
  Users,
  Star,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Bookmark,
  GraduationCap
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockEnrolledCourses = [
  {
    id: 1,
    title: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    progress: 75,
    lastAccessed: "2 days ago",
    nextLesson: "Functions and Methods",
    totalLessons: 24,
    completedLessons: 18,
    rating: 4.8,
    enrolledStudents: 120,
  },
  {
    id: 2,
    title: "Web Development 101",
    instructor: "Prof. Mike Chen",
    progress: 45,
    lastAccessed: "1 week ago",
    nextLesson: "CSS Layouts",
    totalLessons: 30,
    completedLessons: 14,
    rating: 4.6,
    enrolledStudents: 85,
  }
]

const mockAvailableCourses = [
  {
    id: 3,
    title: "Data Structures and Algorithms",
    instructor: "Dr. Emily Brown",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$49.99",
    rating: 4.7,
    enrolledStudents: 250,
    description: "Master fundamental data structures and algorithms with practical examples.",
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    instructor: "Prof. David Wilson",
    duration: "10 weeks",
    level: "Advanced",
    price: "$79.99",
    rating: 4.9,
    enrolledStudents: 180,
    description: "Learn the fundamentals of machine learning and artificial intelligence.",
  }
]

export function CourseSection() {
  const [activeTab, setActiveTab] = useState("enrolled")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Courses</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enrolled">
                <BookOpen className="mr-2 h-4 w-4" />
                Enrolled
              </TabsTrigger>
              <TabsTrigger value="available">
                <GraduationCap className="mr-2 h-4 w-4" />
                Available
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled" className="space-y-4">
              {mockEnrolledCourses.map((course) => (
                <Card key={course.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{course.title}</h3>
                          <Badge variant="default" className="text-lg">
                            {course.progress}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {course.completedLessons}/{course.totalLessons} lessons
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {course.enrolledStudents} students
                          </div>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4" />
                            {course.rating}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <PlayCircle className="mr-1 h-4 w-4" />
                          Next: {course.nextLesson}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          Last accessed: {course.lastAccessed}
                        </div>
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

            <TabsContent value="available" className="space-y-4">
              {mockAvailableCourses.map((course) => (
                <Card key={course.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {course.enrolledStudents} students
                          </div>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4" />
                            {course.rating}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{course.level}</Badge>
                          <span className="text-lg font-semibold">{course.price}</span>
                        </div>
                      </div>
                      <Button variant="default" size="sm" className="ml-4">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Course Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours Learned</p>
                <p className="text-2xl font-bold">48</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">4.7</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 