import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  DollarSign, 
  Users, 
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  MoreHorizontal
} from "lucide-react"

// Mock data - replace with actual data from your backend
const mockRevenue = {
  total: 125000,
  monthly: 25000,
  yearly: 125000,
  growth: 15,
  subscriptions: 850,
  averageOrderValue: 147,
}

const mockSubscriptionPlans = [
  {
    id: 1,
    name: "Basic",
    price: 29,
    period: "month",
    features: ["Access to all courses", "Basic support", "Mobile app access"],
    subscribers: 450,
    revenue: 13050,
    status: "Active",
  },
  {
    id: 2,
    name: "Pro",
    price: 49,
    period: "month",
    features: ["Everything in Basic", "Priority support", "Offline access", "Certificates"],
    subscribers: 250,
    revenue: 12250,
    status: "Active",
  },
  {
    id: 3,
    name: "Enterprise",
    price: 199,
    period: "month",
    features: ["Everything in Pro", "Custom branding", "API access", "Dedicated support"],
    subscribers: 150,
    revenue: 29850,
    status: "Active",
  },
]

const mockTransactions = [
  {
    id: 1,
    date: "2024-03-15",
    user: "John Doe",
    amount: 49,
    status: "Completed",
    type: "Subscription",
    plan: "Pro",
  },
  {
    id: 2,
    date: "2024-03-14",
    user: "Jane Smith",
    amount: 29,
    status: "Completed",
    type: "Subscription",
    plan: "Basic",
  },
  {
    id: 3,
    date: "2024-03-13",
    user: "Mike Johnson",
    amount: 199,
    status: "Refunded",
    type: "Subscription",
    plan: "Enterprise",
  },
]

export function FinancialManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPlan, setSelectedPlan] = useState("basic")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Financial Management</CardTitle>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">
                <DollarSign className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="plans">
                <CreditCard className="mr-2 h-4 w-4" />
                Plans
              </TabsTrigger>
              <TabsTrigger value="transactions">
                <TrendingUp className="mr-2 h-4 w-4" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="refunds">
                <ArrowDownRight className="mr-2 h-4 w-4" />
                Refunds
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${mockRevenue.total.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      {mockRevenue.growth}% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${mockRevenue.monthly.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      8% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockRevenue.subscriptions}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      5% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${mockRevenue.averageOrderValue}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      3% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="plans" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {mockSubscriptionPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{plan.period}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {plan.subscribers} subscribers
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4" />
                            ${plan.revenue}/month
                          </div>
                        </div>
                        <Button className="w-full">Edit Plan</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div className="space-y-1">
                          <p className="font-medium">{transaction.user}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {transaction.date}
                            <CreditCard className="h-3 w-3" />
                            {transaction.plan} Plan
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">${transaction.amount}</p>
                            <p className="text-xs text-muted-foreground">{transaction.type}</p>
                          </div>
                          <Badge variant={transaction.status === "Completed" ? "default" : "destructive"}>
                            {transaction.status}
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

            <TabsContent value="refunds" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Refund Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions
                      .filter((t) => t.status === "Refunded")
                      .map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                          <div className="space-y-1">
                            <p className="font-medium">{transaction.user}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {transaction.date}
                              <CreditCard className="h-3 w-3" />
                              {transaction.plan} Plan
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium text-red-500">-${transaction.amount}</p>
                              <p className="text-xs text-muted-foreground">Refunded</p>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
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