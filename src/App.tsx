import './App.css'
import { LandingPage } from "./components/landing-page"
import { AITutorPage } from "./pages/ai-tutor"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./lib/auth"
import { ThemeProvider } from "./lib/theme"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ai-tutor" element={<AITutorPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
