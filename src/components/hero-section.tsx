import { Button } from "@/components/ui/button"


export function HeroSection() {
  

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
                Learn Smarter with AI-Powered Education
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                EduMind adapts to your learning style, providing personalized content and AI tutoring to help you
                achieve your educational goals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="px-8">  
                Get Started
              </Button>
              <a
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-indigo-500/20 p-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-sm p-4 bg-card dark:bg-gray-950/90 rounded-lg shadow-lg">
                  <div className="space-y-2 mb-4">
                    <h3 className="text-xl font-bold text-foreground">Your Learning Dashboard</h3>
                    <div className="h-2 w-24 rounded-full bg-primary/70"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 w-full rounded-md bg-muted"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-20 rounded-md bg-muted"></div>
                      <div className="h-20 rounded-md bg-muted"></div>
                    </div>
                    <div className="h-32 w-full rounded-md bg-muted"></div>
                    <div className="flex justify-end">
                      <div className="h-8 w-24 rounded-md bg-primary/70"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

