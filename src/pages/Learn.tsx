import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
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
  MessageCircle,
  Sparkles,
  Globe,
  Loader2,
  ExternalLink,
  Zap
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const SEARCH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/perplexity-search`;

interface Guide {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: string;
  rating?: number;
  image?: string;
}

interface SearchResult {
  content: string;
  citations: string[];
}

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [aiSearchResult, setAiSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { id: "beginner", label: "Beginner", icon: Leaf, count: 24, color: "text-success" },
    { id: "intermediate", label: "Intermediate", icon: FlaskConical, count: 18, color: "text-accent" },
    { id: "advanced", label: "Advanced", icon: Thermometer, count: 12, color: "text-primary" },
    { id: "troubleshooting", label: "Troubleshooting", icon: Bug, count: 15, color: "text-spore-gold" },
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

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    setAiSearchResult(null);
    try {
      const response = await fetch(SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ query: `mushroom cultivation: ${searchQuery}` }),
      });

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setAiSearchResult(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search unavailable",
        description: "AI search is temporarily unavailable. Browse guides below.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleGuideClick = (guide: Guide) => {
    toast({
      title: "Opening guide...",
      description: `Loading "${guide.title}"`,
    });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-6 border-accent/50 text-accent bg-accent/10 backdrop-blur-sm px-4 py-1.5">
            <BookOpen className="w-4 h-4 mr-2" />
            Learning Center
          </Badge>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Master <span className="gradient-text glow-text">Mushroom Cultivation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            From beginner basics to advanced techniques, powered by AI research and expert guides.
          </p>
          
          {/* AI Search */}
          <form onSubmit={handleAISearch} className="relative max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/30 to-mycelium/30 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex gap-2 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="AI-powered search: e.g. 'best substrate for lion's mane'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0 h-12 text-base"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSearching || !searchQuery.trim()} 
                  className="glow-purple h-12 px-6 rounded-lg"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  {isSearching ? "Searching..." : "AI Search"}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
              <Globe className="w-3 h-3" />
              Powered by Perplexity — searches real mycology sources
            </p>
          </form>
        </div>

        {/* AI Search Results */}
        {aiSearchResult && (
          <Card className="glass-card mb-12 animate-fade-in overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <CardTitle className="text-lg font-display">AI Research Results</CardTitle>
                <Badge variant="outline" className="ml-auto border-accent/30 text-accent text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Live Web Search
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[400px]">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{aiSearchResult.content}</ReactMarkdown>
                </div>
                {aiSearchResult.citations.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Sources</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSearchResult.citations.slice(0, 5).map((citation, i) => (
                        <a
                          key={i}
                          href={citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-accent hover:underline bg-accent/10 px-2.5 py-1 rounded-full"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {new URL(citation).hostname.replace('www.', '')}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 text-accent"
                onClick={() => setAiSearchResult(null)}
              >
                Clear results
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="mystical-card cursor-pointer hover:border-accent/50 transition-all hover:scale-[1.03] group"
              onClick={() => setActiveTab(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <category.icon className={`w-7 h-7 ${category.color}`} />
                </div>
                <h3 className="font-display font-medium mb-1">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.count} guides</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Guides */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-semibold">Featured Guides</h2>
            <Button variant="ghost" className="text-accent" onClick={() => setActiveTab("all")}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Card 
                key={guide.id} 
                className="mystical-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                onClick={() => handleGuideClick(guide)}
              >
                <div className="h-36 bg-gradient-to-br from-primary/25 via-accent/15 to-mycelium/20 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  <span className="relative z-10 group-hover:scale-125 transition-transform duration-500">{guide.image}</span>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">{guide.category}</Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {guide.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-spore-gold fill-spore-gold" />
                    <span className="text-sm ml-1 font-medium">{guide.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Guides */}
        <section className="mb-14">
          <h2 className="text-2xl font-display font-semibold mb-6">All Guides</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="grid gap-3">
                {filteredGuides.length === 0 ? (
                  <Card className="mystical-card p-8 text-center">
                    <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-display font-semibold mb-2">No guides found</h3>
                    <p className="text-muted-foreground">Try AI Search above for web results.</p>
                  </Card>
                ) : (
                  filteredGuides.map((guide) => (
                    <Card 
                      key={guide.id} 
                      className="mystical-card cursor-pointer hover:border-accent/50 transition-all hover:scale-[1.01] group"
                      onClick={() => handleGuideClick(guide)}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-accent transition-colors">{guide.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">{guide.category}</Badge>
                              <span>•</span>
                              <Clock className="w-3 h-3" />
                              <span>{guide.duration}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA */}
        <Card className="glass-card p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-40 h-40 bg-accent/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <MessageCircle className="w-14 h-14 mx-auto mb-4 text-accent" />
            <h2 className="text-3xl font-display font-semibold mb-3">
              Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-lg">
              Our AI mycology expert is available 24/7 with voice support.
            </p>
            <Button className="glow-purple text-lg px-8 py-6" onClick={() => navigate("/chat")}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Ask the Expert
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
