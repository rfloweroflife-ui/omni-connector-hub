import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  ThumbsUp,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  Award,
  ChevronRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Community = () => {
  const topContributors = [
    { name: "MushroomMike", avatar: "MM", posts: 156, karma: 2450 },
    { name: "SporeQueen", avatar: "SQ", posts: 134, karma: 2180 },
    { name: "MycoMaster", avatar: "MY", posts: 98, karma: 1890 },
    { name: "FungiFirst", avatar: "FF", posts: 87, karma: 1520 },
  ];

  const recentPosts = [
    {
      title: "First successful lion's mane harvest! 🦁",
      author: "NewGrower2024",
      category: "Showcase",
      replies: 24,
      likes: 89,
      time: "2 hours ago",
      hasImage: true,
    },
    {
      title: "Is this contamination or mycelium piss?",
      author: "CuriousCultivator",
      category: "Help",
      replies: 15,
      likes: 12,
      time: "4 hours ago",
      hasImage: true,
    },
    {
      title: "Complete guide to monotub tek for beginners",
      author: "MushroomMike",
      category: "Guide",
      replies: 45,
      likes: 156,
      time: "1 day ago",
      hasImage: false,
    },
    {
      title: "Best grain spawn for oyster mushrooms?",
      author: "OysterLover",
      category: "Discussion",
      replies: 32,
      likes: 28,
      time: "2 days ago",
      hasImage: false,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Showcase": return "bg-success/20 text-success border-success/30";
      case "Help": return "bg-spore-gold/20 text-spore-gold border-spore-gold/30";
      case "Guide": return "bg-primary/20 text-primary border-primary/30";
      default: return "bg-accent/20 text-accent border-accent/30";
    }
  };

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
          <Button className="glow-purple">
            <MessageSquare className="w-4 h-4 mr-2" />
            Create Post
          </Button>
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
                  {["#FirstGrow", "#Contamination", "#LionsMane", "#Monotub", "#AgarWork", "#Harvest"].map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-accent/10 hover:border-accent/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-semibold">Recent Posts</h2>
              {recentPosts.map((post, index) => (
                <Card key={index} className="mystical-card cursor-pointer hover:border-accent/50 transition-colors">
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
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                {topContributors.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-4">
                      {index + 1}
                    </span>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.posts} posts • {user.karma} karma
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

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

      <Footer />
    </div>
  );
};

export default Community;
