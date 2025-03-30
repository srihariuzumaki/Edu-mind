import { Button } from "@/components/ui/button"
import { AITutorPreview } from "@/components/ai-tutor-preview"
import { FeatureCard } from "@/components/feature-card"
import { MainNav } from "@/components/main-nav"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Brain, BookOpen, BarChart, Users, Award, Globe } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function LandingPage() {
  const navigate = useNavigate()

  const handleFeatureClick = (section: string) => {
    navigate(`/dashboard?section=${section}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MainNav />
      </header>
      <main className="flex-1">
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter text-foreground sm:text-3xl md:text-5xl">
              Personalized Learning Experience
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              EduMind adapts to your learning style and pace, providing a tailored educational journey
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
            <div 
              onClick={() => handleFeatureClick('adaptive')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-primary" />}
                title="Adaptive Learning"
                description="Content that adjusts to your knowledge level and learning pace"
              />
            </div>
            <div 
              onClick={() => handleFeatureClick('courses')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FeatureCard
                icon={<BookOpen className="h-6 w-6 text-primary" />}
                title="Comprehensive Lessons"
                description="Well-structured content across various subjects and difficulty levels"
              />
            </div>
            <div 
              onClick={() => handleFeatureClick('progress')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FeatureCard
                icon={<BarChart className="h-6 w-6 text-primary" />}
                title="Progress Tracking"
                description="Visualize your learning journey with detailed analytics"
              />
            </div>
            <div 
              onClick={() => handleFeatureClick('community')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FeatureCard
                icon={<Users className="h-6 w-6 text-primary" />}
                title="Community Learning"
                description="Connect with peers and learn collaboratively"
              />
            </div>
            <div 
              onClick={() => handleFeatureClick('gamification')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FeatureCard
                icon={<Award className="h-6 w-6 text-primary" />}
                title="Gamification"
                description="Earn rewards and achievements as you progress"
              />
            </div>
            <div 
              onClick={() => handleFeatureClick('language')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FeatureCard
                icon={<Globe className="h-6 w-6 text-primary" />}
                title="Multilingual Support"
                description="Learn in your preferred language with our localization options"
              />
            </div>
          </div>
        </section>

        {/* AI Tutor Section */}
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-slate-900">
          <div className="mx-auto grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">Meet Your AI Tutor</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get personalized help whenever you need it with our advanced AI tutoring system
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button 
                  size="lg" 
                  className="px-8"
                  onClick={() => navigate('/ai-tutor')}
                >
                  Try AI Tutor
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <AITutorPreview />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter text-foreground sm:text-3xl md:text-5xl">
              Ready to Transform Your Learning?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of students who have accelerated their education with EduMind
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
              <Button size="lg" className="px-8">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                View Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

