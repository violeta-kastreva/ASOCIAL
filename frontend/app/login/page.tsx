"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Lock, Mail, ArrowLeft } from "lucide-react"

const USER_CREDENTIALS = {
  email: "test",
  password: "12345678",
}

export default function LoginPage(): JSX.Element {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (email === USER_CREDENTIALS.email && password === USER_CREDENTIALS.password) {
      router.push("/projects")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
        <div className="grid-animation"></div>
      </div>

      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-70"></div>
      <div className="absolute top-1/3 right-10 w-6 h-6 bg-purple-600 rounded-full animate-float-delay opacity-70"></div>
      <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-blue-500 rounded-full animate-float-delay-long opacity-50"></div>
      <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-indigo-500 rounded-full animate-float opacity-60"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur-xl opacity-75 animate-pulse-slow"></div>
        <Card className="w-full max-w-md bg-black/80 border-gray-800 backdrop-blur-sm relative">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="self-start mb-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white group flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 mb-2 animate-float">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
                <Brain className="h-6 w-6 text-white relative" />
              </div>
              <span className="text-lg font-bold text-white">ArtificialSN</span>
            </div>
            <CardTitle className="text-2xl text-white animate-fade-in">Welcome back</CardTitle>
            <CardDescription className="text-gray-400 animate-fade-in-delay">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded text-sm animate-fade-in">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2" htmlFor="email">
                  <Mail className="h-4 w-4 text-primary" />
                  Username
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    placeholder="Enter username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white pl-10 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2" htmlFor="password">
                    <Lock className="h-4 w-4 text-primary" />
                    Password
                  </label>
                  <span
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 cursor-pointer"
                  >
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white pl-10 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></span>
                <span className="relative z-10 text-white">Sign In</span>
              </Button>
              <div className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:text-primary/80 transition-colors duration-300">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

