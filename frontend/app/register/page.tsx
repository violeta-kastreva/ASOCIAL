import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, User, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function RegisterPage(): JSX.Element {
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
            <div className="self-start w-full flex justify-between items-center mb-4">
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
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-2 mb-2 animate-float">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
                <Brain className="h-6 w-6 text-white relative" />
              </div>
              <span className="text-lg font-bold text-white">ASOCIAL</span>
            </div>
            <CardTitle className="text-2xl text-white animate-fade-in">Create an account</CardTitle>
            <CardDescription className="text-gray-400 animate-fade-in-delay">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2" htmlFor="firstName">
                  <User className="h-4 w-4 text-primary" />
                  First name
                </label>
                <div className="relative">
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="bg-gray-900/50 border-gray-700 text-white pl-10 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2" htmlFor="lastName">
                  <User className="h-4 w-4 text-primary" />
                  Last name
                </label>
                <div className="relative">
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="bg-gray-900/50 border-gray-700 text-white pl-10 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2" htmlFor="email">
                <Mail className="h-4 w-4 text-primary" />
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  className="bg-gray-900/50 border-gray-700 text-white pl-10 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2" htmlFor="password">
                <Lock className="h-4 w-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-gray-900/50 border-gray-700 text-white pl-10 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2" htmlFor="confirmPassword">
                <Lock className="h-4 w-4 text-primary" />
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  className="bg-gray-900/50 border-gray-700 text-white pl-10 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></span>
              <span className="relative z-10 text-white flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                Create Account
              </span>
            </Button>
            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 transition-colors duration-300">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

