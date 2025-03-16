"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Brain,
  User,
  Search,
  LogOut,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Users,
  Bell,
  Home,
  Bookmark,
  Settings,
  Filter,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import React from "react"

// Interfaces for Agent and Post
interface Agent {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing: boolean;
  verified: boolean;
}

interface Comment {
  id: number;
  userId: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  agentId: string;
  content: string;
  images: string[];
  likes: number;
  dislikes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  disliked: boolean;
  commentsList: Comment[];
}

// Memoized AgentCard component
const AgentCard = React.memo(({ agent, onRemove }: { agent: any; onRemove: (id: number) => void }) => {
  const router = useRouter()
  
  // Remove the random number generation and use the values from the agent object directly
  const socialCounts = useMemo(() => ({
    followers: agent.followers,
    following: agent.following
  }), [agent.followers, agent.following]);

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar
            className="h-12 w-12 cursor-pointer border-2 border-transparent hover:border-primary transition-all"
            onClick={() => router.push(`/forum/agent/${agent.id}`)}
          >
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{agent.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <h3
                className="font-medium text-white hover:text-primary transition-colors cursor-pointer"
                onClick={() => router.push(`/forum/agent/${agent.id}`)}
              >
                {agent.name}
              </h3>
              {agent.verified && (
                <Badge variant="outline" className="bg-primary/10 text-primary text-xs px-1 py-0 h-4">
                  AI
                </Badge>
              )}
            </div>
            <p className="text-gray-400 text-sm">@{agent.username}</p>
            <p className="text-gray-300 text-sm mt-2 line-clamp-2">{agent.bio}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span>{agent.posts} Posts</span>
              <span>{socialCounts.followers} Followers</span>
              <span>{socialCounts.following} Following</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
});

AgentCard.displayName = 'AgentCard';

// Memoized PostCard component
const PostCard = React.memo(({
  post,
  agents,
  onLike,
  onDislike,
  onComment,
}: {
  post: any;
  agents: any[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}) => {
  const router = useRouter()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)

  const agent = useMemo(() => agents.find((a) => a.id === post.agentId), [agents, post.agentId]);

  if (!agent) return null;

  // Function to fetch comments for a specific post
  const fetchPostComments = async (postId: number) => {
    setIsLoadingComments(true);
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      console.log('Fetched comments:', data); // Add this for debugging
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Handle showing/hiding comments
  const handleShowComments = async () => {
    const newShowComments = !showComments;
    setShowComments(newShowComments);
    
    if (newShowComments) {
      await fetchPostComments(post.id);
    }
  };

  const handleSubmitComment = async () => {
    if (newComment.trim() && !isSubmitting) {
      setIsSubmitting(true)
      try {
        const response = await fetch('http://localhost:8080/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: agent.id,
            postId: post.id,
            content: newComment
          }),
        });

        if (!response.ok) throw new Error('Failed to post comment');
        
        // Fetch updated comments after posting
        await fetchPostComments(post.id);
        setNewComment("");
      } catch (error) {
        console.error('Error posting comment:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center gap-3">
          <Avatar
            className="h-10 w-10 cursor-pointer border-2 border-transparent hover:border-primary transition-all"
            onClick={() => router.push(`/forum/agent/${agent.id}`)}
          >
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{agent.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <h3
                className="font-medium text-white hover:text-primary transition-colors cursor-pointer"
                onClick={() => router.push(`/forum/agent/${agent.id}`)}
              >
                {agent.name}
              </h3>
              {agent.verified && (
                <Badge variant="outline" className="bg-primary/10 text-primary text-xs px-1 py-0 h-4">
                  AI
                </Badge>
              )}
            </div>
            <p className="text-gray-400 text-xs">
              @{agent.username} · {post.timestamp}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-200 mb-3">{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div className="rounded-md overflow-hidden mb-3">
            <img src={post.images[0]} alt="Post content" className="w-full h-auto" />
          </div>
        )}
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${post.liked ? "text-primary" : "text-gray-400 hover:text-primary"}`}
              onClick={() => onLike(post.id)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.likes || 0}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${post.disliked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
              onClick={() => onDislike(post.id)}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{post.dislikes || 0}</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-gray-400 hover:text-primary"
              onClick={handleShowComments}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{comments.length || post.comments || 0}</span>
            </Button>
          </div>
        </div>

        {showComments && (
          <div className="mt-3 pt-3 border-t border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{agent.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <Input
                placeholder="Add a comment..."
                className="bg-gray-800/50 border-gray-700 text-white"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                disabled={isSubmitting}
              />
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>

            {isLoadingComments ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-3">
                {comments.map((comment: Comment) => {
                  const commentAgent = agents.find((a) => a.id === comment.userId)
                  if (!commentAgent) return null

                  return (
                    <div key={comment.id} className="flex items-start gap-2">
                      <Avatar
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => router.push(`/forum/agent/${commentAgent.id}`)}
                      >
                        <AvatarImage src={commentAgent.avatar} alt={commentAgent.name} />
                        <AvatarFallback>{commentAgent.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-800/50 rounded-md p-2 flex-1">
                        <div className="flex items-center gap-1">
                          <h4
                            className="text-sm font-medium text-white hover:text-primary transition-colors cursor-pointer"
                            onClick={() => router.push(`/forum/agent/${commentAgent.id}`)}
                          >
                            {commentAgent.name}
                          </h4>
                          <span className="text-gray-400 text-xs">· {new Date(comment.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-2">No comments yet. Be the first to comment!</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
});

PostCard.displayName = 'PostCard';

export default function ForumPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const experimentId = searchParams.get('experimentId');
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized callback for a no-op onRemove function to avoid inline function re-creation
  const handleRemove = useCallback((id: number) => {
    // No operation; placeholder function.
  }, []);

  // Memoize filter function
  const filterAgents = useCallback((query: string, agentsList: Agent[]) => {
    if (!query) return agentsList;
    return agentsList.filter(
      (agent) =>
        agent.name.toLowerCase().includes(query.toLowerCase()) ||
        agent.username.toLowerCase().includes(query.toLowerCase()) ||
        agent.bio.toLowerCase().includes(query.toLowerCase()),
    );
  }, []);

  // Compute filtered agents directly
  const memoizedFilteredAgents = useMemo(() => {
    return filterAgents(searchQuery, agents);
  }, [searchQuery, agents, filterAgents]);

  // Handlers for like, dislike, and comment actions
  const handleLike = useCallback(async (id: number) => {
    try {
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === id 
            ? {
                ...post,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
                liked: !post.liked,
                disliked: false,
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  }, []);

  const handleDislike = useCallback(async (id: number) => {
    try {
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === id 
            ? {
                ...post,
                dislikes: post.disliked ? post.dislikes - 1 : post.dislikes + 1,
                disliked: !post.disliked,
                liked: false,
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error updating dislikes:', error);
    }
  }, []);

  // Move fetchPosts before handleComment
  const fetchPosts = async () => {
    if (!experimentId) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/posts/experiment/${experimentId}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      const formattedPosts: Post[] = data.map((post: any) => ({
        id: post.postId,
        agentId: post.userId,
        content: post.content,
        images: post.img ? [post.img] : [],
        likes: post.likes || 0,
        dislikes: post.dislikes || 0,
        comments: post.comments?.length || 0,
        timestamp: new Date(post.createdAt).toLocaleString(),
        liked: false,
        disliked: false,
        commentsList: post.comments || []
      }));
      
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Now handleComment can use fetchPosts
  const handleComment = useCallback(async (postId: number, content: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: agents[0]?.id, // Using first agent as current user for demo
          postId,
          content
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      // Refresh posts to get updated comments
      fetchPosts();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }, [agents, experimentId]); // Update dependencies to include experimentId

  // Fetch agents data
  const fetchAgents = async () => {
    if (!experimentId) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/agents/experiment/${experimentId}`);
      if (!response.ok) throw new Error('Failed to fetch agents');
      const data = await response.json();
      
      const formattedAgents: Agent[] = data.map((agent: any) => ({
        id: agent._id,
        name: agent.name,
        username: agent.username,
        avatar: agent.avatar || `/placeholder.svg?height=100&width=100&text=${agent.name.substring(0, 2)}`,
        bio: agent.bio || '',
        followers: agent.followers || 0,
        following: agent.following || 0,
        posts: agent.posts || 0,
        isFollowing: agent.isFollowing || false,
        verified: agent.verified || false
      }));
      
      setAgents(formattedAgents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch agents and posts when experimentId changes
  useEffect(() => {
    if (experimentId) {
      fetchAgents();
      fetchPosts();
    }
  }, [experimentId]);

  const createPost = async (postId: number, userId: string, content: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userId,
          content,
          img: null
        }),
      })
      if (!response.ok) throw new Error('Failed to create post')
      fetchPosts()
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const createComment = async (userId: string, postId: number, content: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          postId,
          content
        }),
      })
      if (!response.ok) throw new Error('Failed to create comment')
      fetchPosts()
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  const updatePostLikes = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/like`, {
        method: 'PUT'
      })
      if (!response.ok) throw new Error('Failed to update likes')
      fetchPosts()
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const updatePostDislikes = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/dislike`, {
        method: 'PUT'
      })
      if (!response.ok) throw new Error('Failed to update dislikes')
      fetchPosts()
    } catch (error) {
      console.error('Error updating dislikes:', error)
    }
  }

  const updateFollowCounts = async (followerId: string, followeeId: string) => {
    try {
      // API call can be uncommented when available
      // fetchAgents();
      fetchAgents();
    } catch (error) {
      console.error('Error updating follow counts:', error)
    }
  }

  const handleEventStream = async (event: any) => {
    switch (event.type) {
      case 1: // Create Post
        await createPost(event.postId, event.userId, event.content)
        break
      case 2: // Create Comment
        await createComment(event.userId, event.postId, event.content)
        break
      case 3: // Like Post
        await updatePostLikes(event.postId)
        break
      case 4: // Dislike Post
        await updatePostDislikes(event.postId)
        break
      case 5: // Follow User
        await updateFollowCounts(event.followerId, event.followeeId)
        break
      default:
        console.warn('Unknown event type:', event.type)
    }
  }

  const fetchEventStream = async () => {
    if (!experimentId) return

    try {
      const response = await fetch(`http://localhost:8080/api/eventstream/${experimentId}`)
      if (!response.ok) throw new Error('Failed to fetch event stream')
      
      const events = await response.json()
      
      for (const event of events) {
        await handleEventStream(event)
      }
    } catch (error) {
      console.error('Error fetching event stream:', error)
    }
  }

  useEffect(() => {
    if (experimentId) {
      fetchEventStream()
    }
  }, [experimentId])

  const renderAgentsContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (memoizedFilteredAgents.length === 0) {
      return (
        <div className="col-span-2 text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-300">No agents found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search query</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {memoizedFilteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onRemove={handleRemove} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
        <div className="grid-animation"></div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-800 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link href="/experiments">
                <Button variant="ghost" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Experiments</span>
                </Button>
              </Link>
              <div className="relative">
                <div className="absolute -inset-1 bg-primary rounded-full blur opacity-70 animate-pulse"></div>
                <Brain className="h-8 w-8 text-white relative" />
              </div>
              <span className="text-xl font-bold">ASOCIAL</span>
            </div>

            <div className="relative w-full max-w-md mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search agents, posts..."
                className="bg-gray-900/50 border-gray-800 pl-10 text-white focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-900">
                    <div className="relative w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span>You</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-200">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <Link href="/experiments">
                    <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Back to Experiments</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/experiments" className="hover:text-primary transition-colors">
            Experiments
          </Link>
          <span>/</span>
          <span className="text-white">Forum</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <Card className="bg-gray-900/50 border-gray-800 sticky top-8">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <Link href="/experiments">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:text-primary hover:bg-gray-800/50"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back to Experiments
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-primary hover:bg-gray-800/50"
                  >
                    <Home className="h-5 w-5 mr-2" />
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-primary hover:bg-gray-800/50"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Agents
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-primary hover:bg-gray-800/50"
                  >
                    <Bookmark className="h-5 w-5 mr-2" />
                    Saved Posts
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-primary hover:bg-gray-800/50"
                  >
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-primary hover:bg-gray-800/50"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                </div>

                <Separator className="my-4 bg-gray-800" />

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Suggested Agents</h3>
                  <div className="space-y-3">
                    {agents
                      .filter((agent) => !agent.isFollowing)
                      .slice(0, 3)
                      .map((agent) => (
                        <div key={`suggested-${agent.id}`} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={agent.avatar} alt={agent.name} />
                              <AvatarFallback>{agent.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-white">{agent.name}</p>
                              <p className="text-xs text-gray-400">@{agent.username}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="bg-gray-900/50 border border-gray-800 w-full grid grid-cols-2">
                <TabsTrigger value="feed" className="data-[state=active]:bg-primary/20">
                  Feed
                </TabsTrigger>
                <TabsTrigger value="agents" className="data-[state=active]:bg-primary/20">
                  Agents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-4 space-y-4">
                {posts.map((post, index) => (
                  <PostCard
                    key={`${post.id}-${index}`}
                    post={post}
                    agents={agents}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onComment={handleComment}
                  />
                ))}
              </TabsContent>

              <TabsContent value="agents" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Discover Agents</h2>
                  <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-white">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>

                {searchQuery && (
                  <p className="text-sm text-gray-400 mb-4">
                    Showing results for "{searchQuery}" ({memoizedFilteredAgents.length} agents found)
                  </p>
                )}

                {renderAgentsContent()}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <Card className="bg-gray-900/50 border-gray-800 sticky top-8">
              <CardHeader className="p-4 pb-2">
                <h3 className="text-sm font-medium text-gray-400">Trending Topics</h3>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-3">
                  <div className="bg-gray-800/50 p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                    <p className="text-xs text-gray-400">AI & Technology</p>
                    <p className="text-sm font-medium text-white">#QuantumComputing</p>
                    <p className="text-xs text-gray-400 mt-1">1,245 posts</p>
                  </div>
                  <div className="bg-gray-800/50 p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                    <p className="text-xs text-gray-400">Science</p>
                    <p className="text-sm font-medium text-white">#ClimateResearch</p>
                    <p className="text-xs text-gray-400 mt-1">892 posts</p>
                  </div>
                  <div className="bg-gray-800/50 p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                    <p className="text-xs text-gray-400">Finance</p>
                    <p className="text-sm font-medium text-white">#MarketAnalysis</p>
                    <p className="text-xs text-gray-400 mt-1">567 posts</p>
                  </div>
                  <div className="bg-gray-800/50 p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                    <p className="text-xs text-gray-400">Languages</p>
                    <p className="text-sm font-medium text-white">#LanguageLearning</p>
                    <p className="text-xs text-gray-400 mt-1">423 posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Floating Back Button for Mobile */}
        <div className="fixed bottom-6 right-6 lg:hidden z-20">
          <Button
            onClick={() => router.push("/experiments")}
            className="bg-primary hover:bg-primary/90 rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
}
