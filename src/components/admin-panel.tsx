import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart, 
  Brain, 
  Settings, 
  MessageSquare, 
  CreditCard, 
  Shield, 
  HelpCircle,
  Menu,
  X
} from "lucide-react"
import { useTheme } from "@/lib/theme"

export function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { theme } = useTheme()

  const menuItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", value: "dashboard" },
    { icon: <Users className="h-5 w-5" />, label: "User Management", value: "users" },
    { icon: <BookOpen className="h-5 w-5" />, label: "Content Management", value: "content" },
    { icon: <BarChart className="h-5 w-5" />, label: "Learning Analytics", value: "analytics" },
    { icon: <Brain className="h-5 w-5" />, label: "AI Tutor", value: "ai-tutor" },
    { icon: <Settings className="h-5 w-5" />, label: "System Settings", value: "settings" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Communication", value: "communication" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Financial", value: "financial" },
    { icon: <Shield className="h-5 w-5" />, label: "Security", value: "security" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "Support", value: "support" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => {/* Handle navigation */}}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-200 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Dashboard Overview</h2>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 h-12 gap-px p-1 bg-muted rounded-lg">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Content
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-background rounded-md data-[state=active]:shadow-none"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">892</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Course Completion Rate</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">76%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,345</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">CPU Usage</p>
                          <p className="text-sm text-muted-foreground">45%</p>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-1/2 h-full bg-primary rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Memory Usage</p>
                          <p className="text-sm text-muted-foreground">60%</p>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-3/5 h-full bg-primary rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Storage Usage</p>
                          <p className="text-sm text-muted-foreground">75%</p>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-3/4 h-full bg-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div>
                          <p className="text-sm font-medium">New user registration</p>
                          <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div>
                          <p className="text-sm font-medium">Course completion</p>
                          <p className="text-xs text-muted-foreground">15 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div>
                          <p className="text-sm font-medium">System update</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tab contents will be added here */}
          </Tabs>
        </div>
      </main>
    </div>
  )
} 