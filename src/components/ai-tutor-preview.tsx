import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { SendHorizontal } from "lucide-react"

export function AITutorPreview() {
  return (
    <Card className="w-full max-w-md mx-auto border-2">
      <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Tutor" />
          <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Vocal-Mind AI Tutor</h3>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 h-[300px] overflow-y-auto">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
          </Avatar>
          <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
            <p className="text-sm">Hi there! I'm your AI tutor. How can I help with your learning today?</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
            <p className="text-sm">I'm struggling with quadratic equations. Can you explain them in a simple way?</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
          </Avatar>
          <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
            <p className="text-sm">
              Of course! A quadratic equation is one that can be written in the form: ax² + bx + c = 0, where a, b, and
              c are numbers and a ≠ 0.
            </p>
            <p className="text-sm mt-2">
              Think of it like this: it's an equation where the highest power of x is 2 (that's the x² part).
            </p>
            <p className="text-sm mt-2">Would you like me to show you how to solve these equations step by step?</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            placeholder="Ask your question..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button size="icon" className="h-10 w-10">
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

