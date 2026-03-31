import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  Users, 
  ShoppingBag, 
  Mic, 
  MessageCircle,
  ArrowRight,
  Star,
  Leaf,
  Camera,
  Volume2,
  Zap,
  Globe,
  Shield,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Mycology Expert",
      description: "Chat with our AI assistant about cultivation techniques, contamination issues, or any mycology questions. Voice-enabled with ElevenLabs.",
      badge: "Voice AI",
      link: "/chat"
    },
    {
      icon: Globe,
      title: "Live Research Engine",
      description: "Perplexity-powered search delivers real-time answers from trusted mycology sources across the web. Always up to date.",
      badge: "Perplexity",
      link: "/learn"
    },
    {
      icon: FlaskConical,
      title: "Grow Journal",
      description: "Track your cultivation projects from inoculation to harvest. AI-powered photo diagnosis detects contamination early.",
      badge: "Photo Analysis",
      link: "/journal"
    },
    {
      icon: BookOpen,
      title: "Learning Center",
      description: "Comprehensive guides from beginner basics to advanced techniques. Curated by expert cultivators and AI-verified.",
      badge: "100+ Guides",
      link: "/learn"
    },
    {
      icon: ShoppingBag,
      title: "Premium Supplies",
      description: "Curated selection of spore syringes, agar plates, substrates, and cultivation equipment. Lab tested and verified.",
      badge: "Lab Tested",
      link: "/shop"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with 5K+ cultivators. Share grows, ask questions, and learn from experienced growers worldwide.",
      badge: "5K+ Members",
      link: "/community"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-28 px-4 relative">
          <div className="absolute inset-0 spore-pattern opacity-20" />
          <div className="container max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 border-accent/50 text-accent bg-accent/10 backdrop-blur-sm px-4 py-1.5">
                <Sparkles className="w-4 h-4 mr-2" />
                Everything You Need
              </Badge>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Your Complete <span className="gradient-text glow-text">Mycology Platform</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                From your first spore syringe to advanced cultivation techniques, 
                we've built the tools to support your entire journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI + Voice Highlight Section */}
        <section className="py-28 px-4 relative overflow-hidden">
          <div className="absolute inset-0 mycelium-lines opacity-30" />
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[120px]" />
          
          <div className="container max-w-7xl mx-auto relative">
            <div className="glass-card p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div>
                  <div className="flex gap-2 mb-6">
                    <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-1.5">
                      <Volume2 className="w-4 h-4 mr-2" />
                      ElevenLabs Voice
                    </Badge>
                    <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1.5">
                      <Globe className="w-4 h-4 mr-2" />
                      Perplexity Search
                    </Badge>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                    AI That <span className="text-accent glow-text">Speaks</span> & <span className="text-primary">Researches</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    Ask anything about mushroom cultivation. Our AI expert is trained on 
                    thousands of grows, scientific papers, and cultivation guides. 
                    <strong className="text-foreground"> Listen to responses with natural voice</strong> or get 
                    <strong className="text-foreground"> real-time web research</strong> from trusted sources.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      { text: "Voice responses powered by ElevenLabs", icon: Volume2 },
                      { text: "Live web research via Perplexity", icon: Globe },
                      { text: "Photo-based contamination diagnosis", icon: Camera },
                      { text: "Personalized growing recommendations", icon: TrendingUp },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-foreground/90">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4">
                    <Link to="/chat">
                      <Button size="lg" className="glow-purple font-medium group">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Start Chatting
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/learn">
                      <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                        <Zap className="w-5 h-5 mr-2" />
                        AI Search
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/25 via-accent/15 to-mycelium/20 p-10 flex items-center justify-center relative overflow-hidden">
                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full border border-accent/20 animate-pulse" />
                      <div className="absolute w-48 h-48 rounded-full border border-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute w-32 h-32 rounded-full border border-accent/40 animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    
                    {/* Sound wave visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-end gap-1 h-20 opacity-30">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div 
                            key={i}
                            className="w-1.5 bg-accent rounded-full animate-pulse"
                            style={{ 
                              height: `${20 + Math.sin(i * 0.8) * 40 + 20}%`,
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: '1.5s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 mx-auto mb-6 flex items-center justify-center pulse-glow backdrop-blur-sm">
                        <Sparkles className="w-14 h-14 text-accent" />
                      </div>
                      <p className="text-xl font-display font-semibold mb-2 text-foreground">AI + Voice + Research</p>
                      <p className="text-sm text-muted-foreground">The most advanced mycology assistant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* Subscription CTA */}
        <section className="py-28 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container max-w-5xl mx-auto relative">
            <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/4 w-40 h-40 bg-spore-gold/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-[100px]" />
              
              <Badge variant="outline" className="mb-6 border-spore-gold/50 text-spore-gold bg-spore-gold/10 backdrop-blur-sm px-4 py-1.5 relative z-10">
                <Star className="w-4 h-4 mr-2 fill-spore-gold" />
                Premium Experience
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 relative z-10">
                Complete Hand-Holding for <span className="text-spore-gold" style={{ textShadow: '0 0 30px hsl(42 95% 58% / 0.5)' }}>New Growers</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
                Not sure where to start? Our subscription service guides you through 
                every step with weekly check-ins, voice support, and personalized AI guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <Link to="/subscribe">
                  <Button size="lg" className="bg-spore-gold text-spore-gold-foreground hover:bg-spore-gold/90 font-medium shadow-lg shadow-spore-gold/30 hover:shadow-spore-gold/50 transition-all text-lg px-8 py-6">
                    <Star className="w-5 h-5 mr-2" />
                    View Plans
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5 text-lg px-8 py-6">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Free Guides
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
