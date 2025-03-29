import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, userData, isLoading, isAuthInitialized } = useAuth()
  const location = useLocation()

  if (!isAuthInitialized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location, message: "Please sign in to access this page" }} replace />
  }

  if (requireAdmin && userData?.role !== "admin") {
    return <Navigate to="/" state={{ message: "You don't have permission to access this page" }} replace />
  }

  return <>{children}</>
} 