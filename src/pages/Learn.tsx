import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Search,
  Clock,
  Star,
  ChevronRight,
  Leaf,
  FlaskConical,
  Thermometer,
  Bug
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "beginner", label: "Beginner", icon: Leaf, count: 24 },
    { id: "intermediate", label: "Intermediate", icon: FlaskConical, count: 18 },
    { id: "advanced", label: "Advanced", icon: Thermometer, count: 12 },
    { id: "troubleshooting", label: "Troubleshooting", icon: Bug, count: 15 },
  ];

  const featuredGuides = [
    {
      title: "Complete Beginner's Guide to Mushroom Cultivation",
      description: "Everything you need to know to grow your first mushrooms, from spores to harvest.",
      category: "Beginner",
      duration: "45 min read",
      rating: 4.9,
      image: "🍄"
    },
    {
      title: "Mastering Agar Work",
      description: "Learn to isolate genetics, clone wild specimens, and maintain clean cultures.",
      category: "Intermediate",
      duration: "30 min read",
      rating: 4.8,
      image: "🧫"
    },
    {
      title: "Contamination Identification Guide",
      description: "Visual guide to identifying trichoderma, cobweb, bacterial blotch, and more.",
      category: "Troubleshooting",
      duration: "20 min read",
      rating: 4.9,
      image: "🔬"
    },
  ];

  const recentGuides = [
    { title: "Grain Spawn Preparation", category: "Beginner", duration: "15 min" },
    { title: "Building a Martha Tent", category: "Intermediate", duration: "25 min" },
    { title: "Understanding FAE Requirements", category: "Intermediate", duration: "10 min" },
    { title: "Oyster Mushroom Cultivation", category: "Beginner", duration: "20 min" },
    { title: "Lion's Mane Growing Guide", category: "Intermediate", duration: "25 min" },
    { title: "Substrate Moisture Content", category: "Beginner", duration: "10 min" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
            <BookOpen className="w-3 h-3 mr-1" />
            Learning Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Master <span className="gradient-text">Mushroom Cultivation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            From beginner basics to advanced techniques, our comprehensive guides 
            cover every aspect of successful mushroom growing.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search guides, techniques, species..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input/50 border-border/50"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="mystical-card cursor-pointer hover:border-accent/50 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <category.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-display font-medium mb-1">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.count} guides</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Guides */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold">Featured Guides</h2>
            <Button variant="ghost" className="text-accent">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredGuides.map((guide, index) => (
              <Card key={index} className="mystical-card overflow-hidden group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-mycelium/20 flex items-center justify-center text-5xl">
                  {guide.image}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{guide.category}</Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {guide.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {guide.title}
                  </CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-spore-gold fill-spore-gold" />
                    <span className="text-sm ml-1">{guide.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Guides */}
        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">All Guides</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid gap-4">
                {recentGuides.map((guide, index) => (
                  <Card key={index} className="mystical-card cursor-pointer hover:border-accent/50 transition-colors">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{guide.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{guide.category}</Badge>
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            <span>{guide.duration}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
