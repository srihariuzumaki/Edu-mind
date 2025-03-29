"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, userData, logout } = useAuth()
  const isAITutorPage = location.pathname === "/ai-tutor"
  const isProfilePage = location.pathname === "/profile"
  const isAdminPage = location.pathname.startsWith("/admin")

  const handleLogout = async () => {
    try {
      await logout()
      if (isAITutorPage || isAdminPage) {
        navigate('/')
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const userInitials = user?.email?.split('@')[0].slice(0, 2).toUpperCase() || '?'

  return (
    <div className={`container flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out ${isMenuOpen ? 'md:ml-8' : ''}`}>
      <div className="flex items-center gap-6 md:gap-10">
        <a href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
            EduMind
          </span>
        </a>
        {!isAITutorPage && !isProfilePage && !isAdminPage && (
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
          </nav>
        )}
      </div>
      <div className="hidden md:flex items-center gap-4">
        {!isProfilePage && <ThemeToggle />}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.email || ""} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {userData?.role === "admin" && (
                <DropdownMenuItem onClick={() => navigate('/admin')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button size="sm" onClick={() => navigate('/signup')}>Sign Up</Button>
          </>
        )}
      </div>
      <button 
        className="flex items-center space-x-2 md:hidden" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 cursor-pointer" />
        ) : (
          <Menu className="h-6 w-6 cursor-pointer" />
        )}
      </button>
      {isMenuOpen && (
        <div 
          className="fixed top-16 left-0 right-0 bg-background border-b p-4 md:hidden z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col space-y-4">
            {!isAITutorPage && !isProfilePage && !isAdminPage && (
              <>
                <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
                  Features
                </a>
              </>
            )}
            <div className="flex flex-col gap-2 pt-2">
              {!isProfilePage && (
                <div className="flex items-center mb-2">
                  <ThemeToggle />
                  <span className="ml-2 text-sm">Toggle theme</span>
                </div>
              )}
              {user ? (
                <>
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.email || ""} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.email}</span>
                      <span className="text-xs text-muted-foreground">{user.displayName || 'User'}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="justify-start" onClick={() => navigate('/login')}>
                    Log In
                  </Button>
                  <Button size="sm" className="justify-start" onClick={() => navigate('/signup')}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

