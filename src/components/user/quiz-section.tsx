import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Trophy,
  History,
  ArrowRight
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockUpcomingQuizzes = [
  {
    id: 1,
    title: "JavaScript Basics Quiz",
    course: "Introduction to Programming",
    date: "Tomorrow, 2:00 PM",
    duration: "30 mins",
    questions: 10,
  },
  {
    id: 2,
    title: "Data Structures Assessment",
    course: "Computer Science Fundamentals",
    date: "Next Week, Monday 10:00 AM",
    duration: "45 mins",
    questions: 15,
  }
]

const mockQuizHistory = [
  {
    id: 1,
    title: "Web Development Final",
    course: "Web Development 101",
    date: "2 days ago",
    score: 92,
    totalQuestions: 20,
    correctAnswers: 18,
    timeTaken: "45 mins",
  },
  {
    id: 2,
    title: "CSS Layout Quiz",
    course: "Web Development 101",
    date: "1 week ago",
    score: 85,
    totalQuestions: 15,
    correctAnswers: 13,
    timeTaken: "25 mins",
  }
]

export function QuizSection() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Quizzes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {mockUpcomingQuizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground">{quiz.course}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {quiz.duration}
                          </div>
                          <div className="flex items-center">
                            <AlertCircle className="mr-1 h-4 w-4" />
                            {quiz.questions} questions
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {quiz.date}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Start Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {mockQuizHistory.map((quiz) => (
                <Card key={quiz.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground">{quiz.course}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {quiz.timeTaken}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            {quiz.correctAnswers}/{quiz.totalQuestions} correct
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {quiz.date}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant="default" className="text-lg">
                          {quiz.score}%
                        </Badge>
                        <Button variant="ghost" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quiz Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">88.5%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Time</p>
                <p className="text-2xl font-bold">35 mins</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 