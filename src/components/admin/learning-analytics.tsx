import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Users, 
  Clock, 
  Target, 
  Award,
  TrendingUp,
  Calendar
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockPerformanceData = {
  totalStudents: 1250,
  activeStudents: 980,
  averageCompletionRate: 78,
  averageScore: 85,
  totalCourses: 25,
  totalHours: 450,
  averageEngagement: 72,
  retentionRate: 88,
}

const mockProgressData = [
  { month: "Jan", students: 100, completion: 65 },
  { month: "Feb", students: 150, completion: 70 },
  { month: "Mar", students: 200, completion: 75 },
  { month: "Apr", students: 180, completion: 78 },
  { month: "May", students: 220, completion: 82 },
  { month: "Jun", students: 250, completion: 85 },
]

const mockAssessmentData = [
  { course: "Introduction to Programming", averageScore: 88, passRate: 92 },
  { course: "Data Structures", averageScore: 82, passRate: 85 },
  { course: "Web Development", averageScore: 90, passRate: 95 },
  { course: "Database Design", averageScore: 85, passRate: 88 },
]

export function LearningAnalytics() {
  const [timeRange, setTimeRange] = useState("6m")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Learning Analytics</CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.totalStudents}</div>
                    <p className="text-xs text-muted-foreground">
                      {mockPerformanceData.activeStudents} active
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.averageCompletionRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      Average across all courses
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.averageScore}%</div>
                    <p className="text-xs text-muted-foreground">
                      Across all assessments
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.averageEngagement}%</div>
                    <p className="text-xs text-muted-foreground">
                      Average daily engagement
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Line Chart Component
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Course Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Pie Chart Component
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProgressData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{data.month}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.students} students
                          </p>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${data.completion}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-medium">{data.completion}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAssessmentData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{data.course}</p>
                          <p className="text-sm text-muted-foreground">
                            Pass Rate: {data.passRate}%
                          </p>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${data.averageScore}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-medium">{data.averageScore}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 