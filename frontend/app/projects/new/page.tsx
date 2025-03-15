"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brain, ArrowLeft, Plus, X, Calendar, FileText, Bot, Sparkles, Save, Check, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AgentType {
  id: number
  name: string
  avatar: string
  instructions: string
}

const AVATAR_OPTIONS = [
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100&text=AI",
  "/placeholder.svg?height=100&width=100&text=Bot",
  "/placeholder.svg?height=100&width=100&text=Agent",
  "/placeholder.svg?height=100&width=100&text=ML",
  "/placeholder.svg?height=100&width=100&text=NLP",
]

function AgentCard({ agent, onRemove }: { agent: AgentType; onRemove: (id: number) => void }) {
  return (
    <div className="bg-gray-800/70 border border-gray-700 rounded-md overflow-hidden relative group">
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="h-1 bg-gradient-to-r from-primary/70 to-purple-600/70"></div>
      <div className="p-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-700 bg-gray-900/50">
              <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-medium text-white">{agent.name}</h3>
          </div>
          <Button
            onClick={() => onRemove(agent.id)}
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-red-400 hover:bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function NewProjectPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectDays, setProjectDays] = useState(30)
  const [agents, setAgents] = useState<AgentType[]>([
    {
      id: 1,
      name: "Research Agent",
      avatar: AVATAR_OPTIONS[0],
      instructions: "Analyze data and provide research insights",
    },
    {
      id: 2,
      name: "Assistant Agent",
      avatar: AVATAR_OPTIONS[1],
      instructions: "Help with general tasks and coordination",
    },
    {
      id: 3,
      name: "Creative Agent",
      avatar: AVATAR_OPTIONS[2],
      instructions: "Generate creative ideas and content",
    },
  ])

  const [isAddAgentDialogOpen, setIsAddAgentDialogOpen] = useState(false)
  const [newAgentName, setNewAgentName] = useState("")
  const [newAgentInstructions, setNewAgentInstructions] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0])
  const [customAvatar, setCustomAvatar] = useState<string | null>(null)
  const [avatarTab, setAvatarTab] = useState("preset")

  const addAgent = () => {
    setIsAddAgentDialogOpen(true)
    setNewAgentName("")
    setNewAgentInstructions("")
    setSelectedAvatar(AVATAR_OPTIONS[0])
    setCustomAvatar(null)
    setAvatarTab("preset")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const saveNewAgent = () => {
    if (newAgentName.trim() === "") return

    if (agents.length < 30) {
      const newAgent = {
        id: Date.now(), // Use timestamp for unique ID
        name: newAgentName,
        avatar: avatarTab === "custom" && customAvatar ? customAvatar : selectedAvatar,
        instructions: newAgentInstructions,
      }
      setAgents([...agents, newAgent])
      setIsAddAgentDialogOpen(false)
    }
  }

  const removeAgent = (id: number) => {
    setAgents(agents.filter((agent) => agent.id !== id))
  }

  const createProject = () => {
    if (projectName.trim() === "") {
      return
    }

    // In a real app, you would save this to a database
    // For now, we'll just navigate back to the projects page
    router.push("/projects")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
        <div className="grid-animation"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-70"></div>
      <div className="absolute top-1/3 right-10 w-6 h-6 bg-purple-600 rounded-full animate-float-delay opacity-70"></div>
      <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-blue-500 rounded-full animate-float-delay-long opacity-50"></div>
      <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-indigo-500 rounded-full animate-float opacity-60"></div>

      {/* Header */}
      <header className="border-b border-gray-800 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
                <Brain className="h-8 w-8 text-white relative" />
              </div>
              <span className="text-xl font-bold">ArtificialSN</span>
            </div>

            <Link href="/projects">
              <Button variant="ghost" className="text-gray-400 hover:text-white flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Projects</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-gray-400 mt-1">Set up your new AI project and add agents</p>
          </div>

          <div className="grid gap-8">
            {/* Project Details Card */}
            <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-purple-600"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Project Details</h2>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-white flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        placeholder="Enter project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white pl-10 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-white flex items-center gap-1">
                      <FileText className="h-4 w-4 text-primary" />
                      Description
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="description"
                        placeholder="Describe your project"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white min-h-[120px] pl-10 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <div className="absolute left-3 top-6 pointer-events-none">
                        <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="days" className="text-white flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      Duration (Days)
                    </Label>
                    <div className="relative">
                      <Input
                        id="days"
                        type="number"
                        min={1}
                        max={365}
                        value={projectDays}
                        onChange={(e) => setProjectDays(Number.parseInt(e.target.value))}
                        className="bg-gray-800/50 border-gray-700 text-white pl-10 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agents Card */}
            <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-purple-600"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Agents</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{agents.length}/30</span>
                    <div className="h-6 w-[1px] bg-gray-700"></div>
                    <Button
                      onClick={addAgent}
                      disabled={agents.length >= 30}
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Agent
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1 pr-2">
                  {agents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} onRemove={removeAgent} />
                  ))}

                  {agents.length < 30 && (
                    <button
                      onClick={addAgent}
                      className="bg-gray-800/50 border border-gray-700 border-dashed rounded-md flex flex-col items-center justify-center hover:bg-gray-700/50 transition-colors h-[84px]"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm text-gray-400">Add Agent</span>
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <Link href="/projects">
                <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-800">
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={createProject}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                disabled={projectName.trim() === ""}
              >
                <Save className="h-4 w-4" />
                <span>Create Project</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Agent Dialog */}
      <Dialog open={isAddAgentDialogOpen} onOpenChange={setIsAddAgentDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-xl">Add New Agent</DialogTitle>
            <DialogDescription className="text-gray-400">
              Configure your AI agent with a name, avatar, and instructions.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4 overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label htmlFor="agentName" className="text-white">
                Agent Name
              </Label>
              <Input
                id="agentName"
                placeholder="Enter agent name"
                value={newAgentName}
                onChange={(e) => setNewAgentName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-white">Agent Avatar</Label>
              <Tabs value={avatarTab} onValueChange={setAvatarTab} className="w-full">
                <TabsList className="bg-gray-800 border-gray-700 grid grid-cols-2 mb-4">
                  <TabsTrigger value="preset" className="data-[state=active]:bg-primary/20">
                    Preset Avatars
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="data-[state=active]:bg-primary/20">
                    Custom Image
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preset" className="mt-0">
                  <div className="grid grid-cols-3 gap-2">
                    {AVATAR_OPTIONS.map((avatar, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`
                          w-full aspect-square rounded-md overflow-hidden border cursor-pointer
                          ${
                            avatarTab === "preset" && selectedAvatar === avatar
                              ? "border-primary ring-1 ring-primary"
                              : "border-gray-700 hover:border-gray-500"
                          }
                        `}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={avatar || "/placeholder.svg"}
                            alt={`Avatar ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {avatarTab === "preset" && selectedAvatar === avatar && (
                            <div className="absolute bottom-1 right-1 bg-primary rounded-full p-0.5">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="custom" className="mt-0">
                  <div className="flex flex-col items-center justify-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {customAvatar ? (
                      <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-md overflow-hidden border border-primary">
                          <img
                            src={customAvatar || "/placeholder.svg"}
                            alt="Custom avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full bg-gray-800 border-gray-700"
                          onClick={triggerFileInput}
                        >
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={triggerFileInput}
                        className="w-32 h-32 rounded-md border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors mb-4"
                      >
                        <Upload className="h-8 w-8 text-gray-500 mb-2" />
                        <span className="text-sm text-gray-400">Upload Image</span>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      Upload a JPG, PNG or GIF image for your agent avatar.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="agentInstructions" className="text-white">
                Instructions
              </Label>
              <Textarea
                id="agentInstructions"
                placeholder="What should this agent do?"
                value={newAgentInstructions}
                onChange={(e) => setNewAgentInstructions(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 mt-2">
            <Button
              variant="outline"
              onClick={() => setIsAddAgentDialogOpen(false)}
              className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={saveNewAgent}
              className="bg-primary hover:bg-primary/90"
              disabled={newAgentName.trim() === ""}
            >
              Add Agent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

