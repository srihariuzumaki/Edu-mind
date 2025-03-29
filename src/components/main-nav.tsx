"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="container flex h-16 items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-[15px]">
      <div className="flex items-center gap-6 md:gap-10">
        <a href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
            EduMind
          </span>
        </a>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
            Courses
          </a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
            Community
          </a>
        </nav>
      </div>
      <div className="hidden md:flex gap-4">
        <ThemeToggle />
        <Button variant="outline" size="sm" className="bg-white hover:bg-gray-100">
          Log In
        </Button>
        <Button size="sm">Sign Up</Button>
      </div>
      <button className="flex items-center space-x-2 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Courses
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Community
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center mb-2">
                <ThemeToggle />
                <span className="ml-2 text-sm">Toggle theme</span>
              </div>
              <Button variant="ghost" size="sm" className="justify-start">
                Log In
              </Button>
              <Button size="sm" className="justify-start">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

