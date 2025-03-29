import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { SendHorizontal } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { getAIResponse } from "@/lib/gemini"
import { useAuth } from "@/lib/auth"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Message {
  content: string
  isUser: boolean
  timestamp: Date
}

export function AITutorPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm your AI tutor. How can I help with your learning today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Count user messages (excluding the initial greeting)
  const userMessageCount = messages.filter(msg => msg.isUser).length

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!user && userMessageCount >= 3) {
      setShowLoginDialog(true)
    }
  }, [user, userMessageCount])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Check if user has reached the limit
    if (!user && userMessageCount >= 3) {
      setShowLoginDialog(true)
      return
    }

    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Convert messages to chat history format
      const chatHistory = messages.map(msg => ({
        role: msg.isUser ? "user" : "model",
        content: msg.content,
      }))

      // Get AI response
      const aiResponse = await getAIResponse(input, chatHistory)

      const aiMessage: Message = {
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      const errorMessage: Message = {
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MainNav />
      </header>
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">AI Tutor</h1>
          <Card className="w-full border-2">
            <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Tutor" />
                <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">EduMind AI Tutor</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 h-[500px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.isUser ? "justify-end" : ""}`}
                >
                  {!message.isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.isUser
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted rounded-tl-none text-left"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap text-left">{message.content}</p>
                  </div>
                  {message.isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex w-full items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask your question..."
                  disabled={isLoading || (!user && userMessageCount >= 3)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button 
                  size="icon" 
                  className="h-10 w-10" 
                  onClick={handleSendMessage}
                  disabled={isLoading || (!user && userMessageCount >= 3)}
                >
                  <SendHorizontal className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Continue with AI Tutor</DialogTitle>
            <DialogDescription>
              You've reached the limit for non-logged-in users. Log in to continue using the AI tutor and unlock unlimited conversations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="default"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 