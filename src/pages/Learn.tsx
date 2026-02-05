import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Bug,
  MessageCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Guide {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: string;
  rating?: number;
  image?: string;
  content?: string;
}

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { id: "beginner", label: "Beginner", icon: Leaf, count: 24 },
    { id: "intermediate", label: "Intermediate", icon: FlaskConical, count: 18 },
    { id: "advanced", label: "Advanced", icon: Thermometer, count: 12 },
    { id: "troubleshooting", label: "Troubleshooting", icon: Bug, count: 15 },
  ];

  const featuredGuides: Guide[] = [
    {
      id: "beginners-guide",
      title: "Complete Beginner's Guide to Mushroom Cultivation",
      description: "Everything you need to know to grow your first mushrooms, from spores to harvest.",
      category: "Beginner",
      duration: "45 min read",
      rating: 4.9,
      image: "🍄"
    },
    {
      id: "agar-work",
      title: "Mastering Agar Work",
      description: "Learn to isolate genetics, clone wild specimens, and maintain clean cultures.",
      category: "Intermediate",
      duration: "30 min read",
      rating: 4.8,
      image: "🧫"
    },
    {
      id: "contamination-guide",
      title: "Contamination Identification Guide",
      description: "Visual guide to identifying trichoderma, cobweb, bacterial blotch, and more.",
      category: "Troubleshooting",
      duration: "20 min read",
      rating: 4.9,
      image: "🔬"
    },
  ];

  const allGuides: Guide[] = [
    { id: "grain-spawn", title: "Grain Spawn Preparation", category: "Beginner", duration: "15 min" },
    { id: "martha-tent", title: "Building a Martha Tent", category: "Intermediate", duration: "25 min" },
    { id: "fae-requirements", title: "Understanding FAE Requirements", category: "Intermediate", duration: "10 min" },
    { id: "oyster-cultivation", title: "Oyster Mushroom Cultivation", category: "Beginner", duration: "20 min" },
    { id: "lions-mane", title: "Lion's Mane Growing Guide", category: "Intermediate", duration: "25 min" },
    { id: "substrate-moisture", title: "Substrate Moisture Content", category: "Beginner", duration: "10 min" },
    { id: "pressure-cooking", title: "Pressure Cooking for Sterilization", category: "Beginner", duration: "15 min" },
    { id: "liquid-culture", title: "Making Liquid Culture", category: "Intermediate", duration: "20 min" },
    { id: "monotub-tek", title: "Monotub Tek Complete Guide", category: "Intermediate", duration: "35 min" },
    { id: "flow-hood", title: "Building a Laminar Flow Hood", category: "Advanced", duration: "45 min" },
    { id: "genetics", title: "Working with Genetics", category: "Advanced", duration: "40 min" },
    { id: "trich-identification", title: "Trichoderma Identification", category: "Troubleshooting", duration: "15 min" },
  ];

  const filteredGuides = allGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || guide.category.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleGuideClick = (guide: Guide) => {
    toast({
      title: "Opening guide...",
      description: `Loading "${guide.title}"`,
    });
    // In a full implementation, this would navigate to a guide detail page
    // For now, redirect to chat for questions
    navigate("/chat");
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveTab(categoryId);
    toast({
      title: `Filtering by ${categoryId}`,
      description: `Showing ${categoryId} level guides`,
    });
  };

  const handleAskExpert = () => {
    navigate("/chat");
  };

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
              onClick={() => handleCategoryClick(category.id)}
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
            <Button variant="ghost" className="text-accent" onClick={() => setActiveTab("all")}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Card 
                key={guide.id} 
                className="mystical-card overflow-hidden group cursor-pointer"
                onClick={() => handleGuideClick(guide)}
              >
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

        {/* All Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-display font-semibold mb-6">All Guides</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="grid gap-4">
                {filteredGuides.length === 0 ? (
                  <Card className="mystical-card p-8 text-center">
                    <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-display font-semibold mb-2">No guides found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </Card>
                ) : (
                  filteredGuides.map((guide) => (
                    <Card 
                      key={guide.id} 
                      className="mystical-card cursor-pointer hover:border-accent/50 transition-colors"
                      onClick={() => handleGuideClick(guide)}
                    >
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
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <Card className="mystical-card p-8 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h2 className="text-2xl font-display font-semibold mb-2">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our AI mycology expert is available 24/7 to answer your cultivation questions.
          </p>
          <Button className="glow-purple" onClick={handleAskExpert}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask the Expert
          </Button>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
