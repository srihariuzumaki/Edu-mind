import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Settings, 
  BarChart, 
  Database, 
  MessageSquare,
  Zap,
  Clock,
  Users,
  Target,
  AlertCircle
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockPerformanceData = {
  totalInteractions: 12500,
  averageResponseTime: "1.2s",
  accuracyRate: 92,
  userSatisfaction: 4.8,
  activeUsers: 850,
  dailyQueries: 450,
  errorRate: 0.5,
  uptime: 99.9,
}

const mockUsageData = [
  { date: "2024-01", queries: 1200, users: 150 },
  { date: "2024-02", queries: 1500, users: 180 },
  { date: "2024-03", queries: 1800, users: 220 },
  { date: "2024-04", queries: 2000, users: 250 },
  { date: "2024-05", queries: 2200, users: 280 },
  { date: "2024-06", queries: 2500, users: 300 },
]

export function AITutorManagement() {
  const [activeTab, setActiveTab] = useState("settings")
  const [modelVersion, setModelVersion] = useState("gpt-4")
  const [temperature, setTemperature] = useState("0.7")
  const [maxTokens, setMaxTokens] = useState("2000")
  const [enableCustomTraining, setEnableCustomTraining] = useState(true)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI Tutor Management</CardTitle>
            <Button>
              <Zap className="mr-2 h-4 w-4" />
              Update Model
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="performance">
                <BarChart className="mr-2 h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="training">
                <Database className="mr-2 h-4 w-4" />
                Training
              </TabsTrigger>
              <TabsTrigger value="templates">
                <MessageSquare className="mr-2 h-4 w-4" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Model Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="model">Model Version</Label>
                      <Select value={modelVersion} onValueChange={setModelVersion}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude-2">Claude 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input
                        id="temperature"
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        min="0"
                        max="1"
                        step="0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxTokens">Max Tokens</Label>
                      <Input
                        id="maxTokens"
                        type="number"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(e.target.value)}
                        min="100"
                        max="4000"
                        step="100"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Custom Training</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable custom training data
                        </p>
                      </div>
                      <Switch
                        checked={enableCustomTraining}
                        onCheckedChange={setEnableCustomTraining}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Response Templates</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="concise">Concise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.totalInteractions}</div>
                    <p className="text-xs text-muted-foreground">
                      All-time interactions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.averageResponseTime}</div>
                    <p className="text-xs text-muted-foreground">
                      Average response time
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.accuracyRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      Response accuracy
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockPerformanceData.userSatisfaction}/5</div>
                    <p className="text-xs text-muted-foreground">
                      Average rating
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Line Chart Component
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Data Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Training Dataset Size</p>
                        <p className="text-sm text-muted-foreground">
                          25,000 examples
                        </p>
                      </div>
                      <Button variant="outline">Upload Data</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Last Training</p>
                        <p className="text-sm text-muted-foreground">
                          2 days ago
                        </p>
                      </div>
                      <Button variant="outline">Retrain Model</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Training Status</p>
                        <p className="text-sm text-muted-foreground">
                          Ready for training
                        </p>
                      </div>
                      <Button>Start Training</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Default Template</p>
                        <p className="text-sm text-muted-foreground">
                          Standard response format
                        </p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Detailed Template</p>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive explanations
                        </p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Concise Template</p>
                        <p className="text-sm text-muted-foreground">
                          Brief and direct responses
                        </p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
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