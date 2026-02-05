import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  MessageSquare, 
  ThumbsUp,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  Award,
  ChevronRight,
  Search,
  Plus,
  LogIn
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  time: string;
  hasImage: boolean;
}

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");

  const topContributors = [
    { name: "MushroomMike", avatar: "MM", posts: 156, karma: 2450 },
    { name: "SporeQueen", avatar: "SQ", posts: 134, karma: 2180 },
    { name: "MycoMaster", avatar: "MY", posts: 98, karma: 1890 },
    { name: "FungiFirst", avatar: "FF", posts: 87, karma: 1520 },
  ];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "First successful lion's mane harvest! 🦁",
      author: "NewGrower2024",
      category: "Showcase",
      replies: 24,
      likes: 89,
      time: "2 hours ago",
      hasImage: true,
    },
    {
      id: "2",
      title: "Is this contamination or mycelium piss?",
      author: "CuriousCultivator",
      category: "Help",
      replies: 15,
      likes: 12,
      time: "4 hours ago",
      hasImage: true,
    },
    {
      id: "3",
      title: "Complete guide to monotub tek for beginners",
      author: "MushroomMike",
      category: "Guide",
      replies: 45,
      likes: 156,
      time: "1 day ago",
      hasImage: false,
    },
    {
      id: "4",
      title: "Best grain spawn for oyster mushrooms?",
      author: "OysterLover",
      category: "Discussion",
      replies: 32,
      likes: 28,
      time: "2 days ago",
      hasImage: false,
    },
  ]);

  const trendingTags = ["#FirstGrow", "#Contamination", "#LionsMane", "#Monotub", "#AgarWork", "#Harvest"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Showcase": return "bg-success/20 text-success border-success/30";
      case "Help": return "bg-spore-gold/20 text-spore-gold border-spore-gold/30";
      case "Guide": return "bg-primary/20 text-primary border-primary/30";
      default: return "bg-accent/20 text-accent border-accent/30";
    }
  };

  const handleCreatePost = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to create a post.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    setCreatePostOpen(true);
  };

  const handleSubmitPost = () => {
    if (!postTitle.trim() || !postCategory) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in the title and category.",
      });
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: postTitle,
      author: "You",
      category: postCategory,
      replies: 0,
      likes: 0,
      time: "Just now",
      hasImage: false,
    };

    setPosts([newPost, ...posts]);
    setCreatePostOpen(false);
    setPostTitle("");
    setPostContent("");
    setPostCategory("");

    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    });
  };

  const handleLike = (postId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts.",
        variant: "destructive",
      });
      return;
    }

    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag.replace("#", ""));
    toast({
      title: `Filtering by ${tag}`,
      description: `Showing posts about ${tag.replace("#", "")}`,
    });
  };

  const handleViewPost = (post: Post) => {
    toast({
      title: "Opening post...",
      description: `Loading "${post.title}"`,
    });
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
            <Users className="w-3 h-3 mr-1" />
            Community
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Connect with <span className="gradient-text">Fellow Cultivators</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Share your grows, ask questions, and learn from experienced growers 
            in our supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input/50 border-border/50"
              />
            </div>
            <Button className="glow-purple" onClick={handleCreatePost}>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trending Topics */}
            <Card className="mystical-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <CardTitle className="text-lg">Trending Now</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-accent">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-accent/10 hover:border-accent/50 transition-colors"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-semibold">
                {searchQuery ? `Results for "${searchQuery}"` : "Recent Posts"}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <Card className="mystical-card p-8 text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-display font-semibold mb-2">No posts found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or be the first to post about this topic!
                  </p>
                </Card>
              ) : (
                filteredPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="mystical-card cursor-pointer hover:border-accent/50 transition-colors"
                    onClick={() => handleViewPost(post)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {post.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-medium hover:text-accent transition-colors">
                                {post.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <span>{post.author}</span>
                                <span>•</span>
                                <Badge className={`text-xs ${getCategoryColor(post.category)}`}>
                                  {post.category}
                                </Badge>
                                <span>•</span>
                                <Clock className="w-3 h-3" />
                                <span>{post.time}</span>
                              </div>
                            </div>
                            {post.hasImage && (
                              <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center flex-shrink-0">
                                <ImageIcon className="w-6 h-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-accent"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(post.id);
                              }}
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              <span>{post.likes}</span>
                            </Button>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.replies}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="mystical-card">
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-display font-semibold">5,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Posts</span>
                  <span className="font-display font-semibold">12,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Online Now</span>
                  <span className="font-display font-semibold text-success">127</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="mystical-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-spore-gold" />
                  <CardTitle className="text-lg">Top Contributors</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-4">
                      {index + 1}
                    </span>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {contributor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contributor.posts} posts • {contributor.karma} karma
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Join CTA */}
            {!user && (
              <Card className="mystical-card">
                <CardContent className="pt-6 text-center">
                  <LogIn className="w-10 h-10 mx-auto mb-3 text-accent" />
                  <h3 className="font-display font-semibold mb-2">Join the Community</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to post, comment, and connect with fellow cultivators.
                  </p>
                  <Button className="w-full" onClick={() => navigate("/auth")}>
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Rules */}
            <Card className="mystical-card">
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be respectful and supportive</li>
                  <li>• Share knowledge freely</li>
                  <li>• No sourcing discussions</li>
                  <li>• Use descriptive titles</li>
                  <li>• Mark NSFW/spoilers appropriately</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Create Post Dialog */}
      <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
        <DialogContent className="sm:max-w-[500px] mystical-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Create Post</DialogTitle>
            <DialogDescription>
              Share your grow, ask a question, or contribute to the community.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">Title *</Label>
              <Input
                id="post-title"
                placeholder="What's on your mind?"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="bg-input/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-category">Category *</Label>
              <Select value={postCategory} onValueChange={setPostCategory}>
                <SelectTrigger className="bg-input/50">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Showcase">Showcase</SelectItem>
                  <SelectItem value="Help">Help</SelectItem>
                  <SelectItem value="Discussion">Discussion</SelectItem>
                  <SelectItem value="Guide">Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                placeholder="Share details, ask questions, or describe your grow..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="bg-input/50 min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreatePostOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPost}>
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Community;
