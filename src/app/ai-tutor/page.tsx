import { AITutorPreview } from "@/components/ai-tutor-preview"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function AITutorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MainNav />
      </header>
      <main className="flex-1">
        <div className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[800px]">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Your AI Tutor
            </h1>
            <AITutorPreview />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 