"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Brain, User, Search, LogOut, Plus, MoreHorizontal, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface ExperimentCardProps {
  _id: string
  title: string
  description: string
  progress: number
  agents: Array<{
    name: string
    avatar: string
    instructions: string
  }>
  onDelete: (id: string) => void
}

function ExperimentCard({ _id, title, description, progress, agents, onDelete }: ExperimentCardProps) {
  const router = useRouter()

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
      <div className="h-3 bg-gray-800 relative">
        <div className="h-full bg-gradient-to-r from-primary to-purple-600" style={{ width: `${progress}%` }}></div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-200">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">View Details</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Edit Experiment</DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-800 cursor-pointer text-red-400"
                onClick={() => onDelete(_id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="h-4 w-4 text-primary" />
              <span>{agents.length} agents</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-black/30 p-4 border-t border-gray-800">
        <Button
          className="w-full bg-transparent border border-primary hover:bg-primary/20 transition-all duration-300 text-primary"
          onClick={() => router.push(`/forum?experimentId=${_id}`)}
        >
          Open Experiment
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<ExperimentCardProps[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchExperiments = async () => {
    try {
      // TODO: Replace with actual user ID from auth
      const userId = "your-user-id"
      const response = await fetch(`http://localhost:8080/api/experiments?userId=${userId}`)
      const data = await response.json()
      setExperiments(data)
    } catch (error) {
      console.error('Error fetching experiments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/experiments/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setExperiments(experiments.filter(exp => exp._id !== id))
      } else {
        throw new Error('Failed to delete experiment')
      }
    } catch (error) {
      console.error('Error deleting experiment:', error)
    }
  }

  useEffect(() => {
    fetchExperiments()
  }, [])

  const filteredExperiments = experiments.filter(
    (experiment) =>
      experiment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experiment.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
        <div className="grid-animation"></div>
      </div>

      <header className="border-b border-gray-800 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
                <Brain className="h-8 w-8 text-white relative" />
              </div>
              <span className="text-xl font-bold">ASOCIAL</span>
            </div>

            <div className="relative w-full max-w-md mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search experiments..."
                className="bg-gray-900/50 border-gray-800 pl-10 text-white focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-900">
                    <div className="relative w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span>Test</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-200">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <Link href="/login">
                    <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Experiments</h1>
            <p className="text-gray-400 mt-1">Manage and track your AI experiments</p>
          </div>
          <Link href="/experiments/new">
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Experiment</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiments.map((experiment) => (
            <ExperimentCard 
              key={experiment._id} 
              {...experiment} 
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredExperiments.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-300">No experiments found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search query</p>
          </div>
        )}
      </main>
    </div>
  )
}

