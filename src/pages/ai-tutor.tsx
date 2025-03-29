import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { SendHorizontal, VolumeX, Mic } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { getAIResponse } from "@/lib/gemini"
import { useAuth } from "@/lib/auth"
import { useNavigate } from "react-router-dom"
import { textToSpeech, SUPPORTED_LANGUAGES, SPEAKERS, type TextToSpeechOptions } from "@/lib/sarvam"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Message {
  content: string
  isUser: boolean
  timestamp: Date
  audioUrl?: string
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
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN")
  const [selectedSpeaker, setSelectedSpeaker] = useState("meera")
  const [isPlaying, setIsPlaying] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentPlayingMessageId, setCurrentPlayingMessageId] = useState<number | null>(null);

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

      // Add language preference to the user's message
      const languagePrompt = selectedLanguage !== 'en-IN' 
        ? `Please respond in ${SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage)?.name || 'the selected language'}.`
        : '';

      // Get AI response
      const aiResponse = await getAIResponse(`${languagePrompt} ${input}`, chatHistory)

      let audioUrl: string | undefined;
      
      // Try to convert to speech, but don't block the AI response if it fails
      try {
        console.log("Starting text-to-speech conversion...");
        console.log("Selected language:", selectedLanguage);
        console.log("Selected speaker:", selectedSpeaker);
        console.log("Text to convert:", aiResponse);
        
        const audioOptions: TextToSpeechOptions = {
          targetLanguageCode: selectedLanguage,
          speaker: selectedSpeaker,
        }
        console.log("TTS Options:", audioOptions);
        
        const audioBase64 = await textToSpeech(aiResponse, audioOptions)
        console.log("Received audio base64 data length:", audioBase64?.length);
        console.log("First 50 chars of audio data:", audioBase64?.substring(0, 50) + "...");
        
        audioUrl = `data:audio/wav;base64,${audioBase64}`
        console.log("Audio URL created successfully");
      } catch (error) {
        console.error("Text-to-speech conversion failed:", error);
        if (error instanceof Error) {
          console.error("Error details:", error.message);
          console.error("Error stack:", error.stack);
        }
        // Don't throw the error, just continue without audio
      }

      console.log("Creating AI message with audio URL:", audioUrl ? "present" : "absent");
      const aiMessage: Message = {
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        audioUrl,
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

  const handlePlayAudio = (audioUrl: string, messageId: number) => {
    if (audioRef.current) {
      console.log("Starting audio playback for message:", messageId);
      console.log("Audio URL length:", audioUrl.length);
      
      if (isPlaying && currentPlayingMessageId === messageId) {
        console.log("Stopping current playback");
        handleStopAudio();
        return;
      }
      
      // Stop any currently playing audio
      handleStopAudio();
      
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      
      console.log("Attempting to play audio...");
      audioRef.current.play().then(() => {
        console.log("Audio playback started successfully");
        setIsPlaying(true);
        setCurrentPlayingMessageId(messageId);
      }).catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
        setCurrentPlayingMessageId(null);
      });
    } else {
      console.error("Audio element reference is null");
    }
  }

  const handleStopAudio = () => {
    if (audioRef.current) {
      console.log("Stopping audio playback");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentPlayingMessageId(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MainNav />
      </header>
      <main className="flex-1 flex items-center justify-center py-4">
        <div className="container max-w-4xl h-[calc(100vh-4rem)]">
          <h1 className="text-3xl font-bold mb-4 text-center">AI Tutor</h1>
          <Card className="w-full border-2 h-[calc(100%-4rem)] flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/bot-avatar.svg" alt="AI Tutor" />
                <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">EduMind AI Tutor</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 flex-1 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.isUser ? "justify-end" : ""}`}
                >
                  {!message.isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/bot-avatar.svg" alt="AI Tutor" />
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
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm whitespace-pre-wrap text-left flex-1">{message.content}</p>
                      {!message.isUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-0 flex-shrink-0 bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/80"
                          onClick={() => {
                            console.log("Audio URL:", message.audioUrl);
                            if (message.audioUrl) {
                              isPlaying && currentPlayingMessageId === index 
                                ? handleStopAudio() 
                                : handlePlayAudio(message.audioUrl, index);
                            }
                          }}
                        >
                          {isPlaying && currentPlayingMessageId === index ? (
                            <VolumeX className="h-4 w-4 text-white dark:text-black" />
                          ) : (
                            <Mic className="h-4 w-4 text-white dark:text-black" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {message.isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
                      <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex w-full items-center gap-2">
                <div className="flex gap-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Speaker" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPEAKERS.map((speaker) => (
                        <SelectItem key={speaker.id} value={speaker.id}>
                          {speaker.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
        }}
      />
    </div>
  )
} 