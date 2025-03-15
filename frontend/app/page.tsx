import type React from "react"
import { Brain, Users, Zap, CircuitBoard, Cpu, Network } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <div
      className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -right-12 -top-12 w-24 h-24 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>

      <div className="bg-black/50 p-3 rounded-lg w-fit mb-4 relative z-10 animate-float">{icon}</div>
      <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-gray-400 relative z-10">{description}</p>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
        <div className="grid-animation"></div>
      </div>

      <nav className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
            <Brain className="h-8 w-8 text-white relative" />
          </div>
          <span className="text-xl font-bold">ArtificialSN</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button className="relative overflow-hidden bg-transparent border border-primary hover:bg-primary/20 transition-all duration-300 group">
              <span className="absolute inset-0 w-full h-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></span>
              <span className="relative z-10">Login</span>
            </Button>
          </Link>
          <Link href="/register">
            <Button className="relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300 group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Register</span>
            </Button>
          </Link>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
            Connect with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 animate-gradient">
              AI-Enhanced
            </span>{" "}
            Social Experiences
          </h1>
          <p className="text-lg text-gray-300 max-w-xl animate-fade-in-delay">
            Join the next generation social network powered by artificial intelligence. Discover meaningful connections
            and personalized content.
          </p>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur-xl opacity-75 animate-pulse-slow"></div>
          <div className="relative bg-black rounded-lg p-6 border border-gray-800">
            <div className="aspect-video rounded-md overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
              <div className="neural-network">
                <div className="node node-1"></div>
                <div className="node node-2"></div>
                <div className="node node-3"></div>
                <div className="node node-4"></div>
                <div className="node node-5"></div>
                <div className="node node-5"></div>
                <div className="node node-6"></div>
                <div className="connection connection-1"></div>
                <div className="connection connection-2"></div>
                <div className="connection connection-3"></div>
                <div className="connection connection-4"></div>
                <div className="connection connection-5"></div>
              </div>
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center z-10">
                <Brain className="h-12 w-12 text-primary animate-pulse" />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="h-4 bg-gray-800 rounded-full w-3/4 animate-loading"></div>
              <div className="h-4 bg-gray-800 rounded-full w-1/2 animate-loading animation-delay-300"></div>
              <div className="h-4 bg-gray-800 rounded-full w-5/6 animate-loading animation-delay-600"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-70"></div>
      <div className="absolute top-1/3 right-10 w-6 h-6 bg-purple-600 rounded-full animate-float-delay opacity-70"></div>
      <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-blue-500 rounded-full animate-float-delay-long opacity-50"></div>
      <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-indigo-500 rounded-full animate-float opacity-60"></div>

      <section className="container mx-auto px-4 py-20 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            Powered by Advanced AI
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-primary" />}
            title="AI-Driven Connections"
            description="Our intelligent algorithms match you with like-minded individuals based on your interests and interactions."
            delay={0}
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Smart Content Feed"
            description="Personalized content that adapts to your preferences and helps you discover new ideas."
            delay={200}
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Community Insights"
            description="Gain valuable insights from community trends and discussions enhanced by AI analysis."
            delay={400}
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-lg blur-xl"></div>
          <div className="relative bg-black/60 border border-gray-800 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in-up">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float">
                  <CircuitBoard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Neural Networks</h3>
                <p className="text-gray-400">Advanced neural networks that learn and adapt to user behavior.</p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-300">
                <div className="mx-auto w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center mb-4 animate-float animation-delay-300">
                  <Cpu className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
                <p className="text-gray-400">Sophisticated algorithms that improve with every interaction.</p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-600">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 animate-float animation-delay-600">
                  <Network className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Data Analysis</h3>
                <p className="text-gray-400">Real-time data processing for meaningful insights and connections.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12 mt-20 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
              <Brain className="h-6 w-6 text-white relative" />
            </div>
            <span className="text-lg font-bold text-white">ArtificialSN</span>
          </div>
          <p>© {new Date().getFullYear()} Artificial Social Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

