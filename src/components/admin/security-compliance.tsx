import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  Lock, 
  FileText, 
  Activity,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockAccessLogs = [
  {
    id: 1,
    timestamp: "2024-03-15 14:30:00",
    user: "admin@example.com",
    action: "Login",
    ip: "192.168.1.100",
    status: "Success",
    location: "New York, US",
  },
  {
    id: 2,
    timestamp: "2024-03-15 14:25:00",
    user: "user@example.com",
    action: "Failed Login",
    ip: "192.168.1.101",
    status: "Failed",
    location: "London, UK",
  },
  {
    id: 3,
    timestamp: "2024-03-15 14:20:00",
    user: "admin@example.com",
    action: "Password Change",
    ip: "192.168.1.100",
    status: "Success",
    location: "New York, US",
  },
]

const mockSecuritySettings = {
  twoFactorAuth: true,
  passwordExpiry: 90,
  maxLoginAttempts: 5,
  sessionTimeout: 30,
  ipWhitelist: ["192.168.1.100", "192.168.1.101"],
  sslEnabled: true,
  backupEnabled: true,
  backupFrequency: "Daily",
  lastBackup: "2024-03-15 00:00:00",
}

const mockComplianceDocuments = [
  {
    id: 1,
    name: "Privacy Policy",
    version: "2.1",
    lastUpdated: "2024-03-01",
    status: "Active",
    author: "Legal Team",
  },
  {
    id: 2,
    name: "Terms of Service",
    version: "1.5",
    lastUpdated: "2024-02-15",
    status: "Active",
    author: "Legal Team",
  },
  {
    id: 3,
    name: "Data Protection Policy",
    version: "1.0",
    lastUpdated: "2024-01-20",
    status: "Draft",
    author: "Security Team",
  },
]

export function SecurityCompliance() {
  const [activeTab, setActiveTab] = useState("security")
  const [selectedDocument, setSelectedDocument] = useState("privacy")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Security & Compliance</CardTitle>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="security">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="logs">
                <Activity className="mr-2 h-4 w-4" />
                Access Logs
              </TabsTrigger>
              <TabsTrigger value="compliance">
                <FileText className="mr-2 h-4 w-4" />
                Compliance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="security" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Require 2FA for all admin accounts
                        </p>
                      </div>
                      <Switch checked={mockSecuritySettings.twoFactorAuth} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Password Expiry</Label>
                        <p className="text-sm text-muted-foreground">
                          Days until password must be changed
                        </p>
                      </div>
                      <Input
                        type="number"
                        value={mockSecuritySettings.passwordExpiry}
                        className="w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Max Login Attempts</Label>
                        <p className="text-sm text-muted-foreground">
                          Maximum failed login attempts before lockout
                        </p>
                      </div>
                      <Input
                        type="number"
                        value={mockSecuritySettings.maxLoginAttempts}
                        className="w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Minutes until session expires
                        </p>
                      </div>
                      <Input
                        type="number"
                        value={mockSecuritySettings.sessionTimeout}
                        className="w-20"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Backup & Recovery</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable automatic system backups
                        </p>
                      </div>
                      <Switch checked={mockSecuritySettings.backupEnabled} />
                    </div>
                    <div className="space-y-2">
                      <Label>Backup Frequency</Label>
                      <Select defaultValue={mockSecuritySettings.backupFrequency.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last Backup</span>
                      <span>{mockSecuritySettings.lastBackup}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Create Backup
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Restore Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAccessLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div className="space-y-1">
                          <p className="font-medium">{log.user}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {log.timestamp}
                            <Globe className="h-3 w-3" />
                            {log.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{log.action}</p>
                            <p className="text-xs text-muted-foreground">{log.ip}</p>
                          </div>
                          <Badge variant={log.status === "Success" ? "default" : "destructive"}>
                            {log.status}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockComplianceDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                          <div className="space-y-1">
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              v{doc.version}
                              <Calendar className="h-3 w-3" />
                              Updated {doc.lastUpdated}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={doc.status === "Active" ? "default" : "secondary"}>
                              {doc.status}
                            </Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>GDPR Compliance</span>
                        </div>
                        <Badge variant="default">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Data Encryption</span>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>Cookie Policy</span>
                        </div>
                        <Badge variant="secondary">Needs Update</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>Data Retention Policy</span>
                        </div>
                        <Badge variant="destructive">Missing</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 