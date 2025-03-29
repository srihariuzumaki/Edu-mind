import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  X,
  LogOut,
  Loader2
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserManagement } from "./user-management"
import { ContentManagement } from "./content-management"
import { LearningAnalytics } from "./learning-analytics"
import { AITutorManagement } from "./ai-tutor-management"
import { SystemSettings } from "./system-settings"
import { CommunicationTools } from "./communication-tools"
import { FinancialManagement } from "./financial-management"
import { SecurityCompliance } from "./security-compliance"
import { SupportHelp } from "./support-help"

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

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("dashboard")
  const { logout, isLoading, isAuthInitialized } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="dark:bg-black dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-white">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">1,234</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-black dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-white">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">892</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">+8% from last month</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-black dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-white">Course Completion Rate</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">76%</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">+5% from last month</p>
                </CardContent>
              </Card>
              <Card className="dark:bg-black dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-white">Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">$12,345</div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">+15% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 dark:bg-black dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium dark:text-white">CPU Usage</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">45%</p>
                      </div>
                      <div className="w-32 h-2 bg-muted dark:bg-gray-800 rounded-full">
                        <div className="w-1/2 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium dark:text-white">Memory Usage</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">60%</p>
                      </div>
                      <div className="w-32 h-2 bg-muted dark:bg-gray-800 rounded-full">
                        <div className="w-3/5 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium dark:text-white">Storage Usage</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">75%</p>
                      </div>
                      <div className="w-32 h-2 bg-muted dark:bg-gray-800 rounded-full">
                        <div className="w-3/4 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 dark:bg-black dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium dark:text-white">New user registration</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium dark:text-white">Course completion</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium dark:text-white">System update</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "users":
        return <UserManagement />
      case "content":
        return <ContentManagement />
      case "analytics":
        return <LearningAnalytics />
      case "ai-tutor":
        return <AITutorManagement />
      case "settings":
        return <SystemSettings />
      case "communication":
        return <CommunicationTools />
      case "financial":
        return <FinancialManagement />
      case "security":
        return <SecurityCompliance />
      case "support":
        return <SupportHelp />
      default:
        return null
    }
  }

  if (!isAuthInitialized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black dark:bg-black border-r transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800 bg-black">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="text-white hover:bg-gray-800">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-1 bg-black">
          {menuItems.map((item) => (
            <Button
              key={item.value}
              variant={activeSection === item.value ? "secondary" : "ghost"}
              className={`w-full justify-start gap-2 ${
                activeSection === item.value 
                  ? 'bg-gray-800 text-white dark:bg-gray-800 dark:text-white' 
                  : 'text-white hover:bg-gray-800 dark:text-white dark:hover:bg-gray-800 dark:bg-black'
              }`}
              onClick={() => setActiveSection(item.value)}
            >
              <span className="text-white">{item.icon}</span>
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-black">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-red-400 hover:bg-gray-800 hover:text-red-300 dark:text-red-400 dark:hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : ''} bg-background dark:bg-black`}>
        <header className="sticky top-0 z-40 h-16 border-b bg-background/95 dark:bg-black backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-800">
          <div className="flex h-16 items-center gap-4 px-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="dark:text-white">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold dark:text-white">
                {menuItems.find(item => item.value === activeSection)?.label || "Dashboard"}
              </h2>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="p-6 dark:bg-black">
          {renderContent()}
        </div>
      </main>
    </div>
  )
} 