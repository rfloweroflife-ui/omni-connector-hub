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
  Camera
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
      description: "Chat with our AI assistant about cultivation techniques, contamination issues, or any mycology questions. Available 24/7 with voice support.",
      badge: "Powered by AI",
      link: "/chat"
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
      description: "Comprehensive guides from beginner basics to advanced techniques. Curated by expert cultivators.",
      badge: "100+ Guides",
      link: "/learn"
    },
    {
      icon: ShoppingBag,
      title: "Premium Supplies",
      description: "Curated selection of spore syringes, agar plates, substrates, and cultivation equipment.",
      badge: "Lab Tested",
      link: "/shop"
    },
    {
      icon: Star,
      title: "Subscription Service",
      description: "Full hand-holding from start to finish. Weekly check-ins, personalized guidance, and priority support.",
      badge: "New Growers",
      link: "/subscribe"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow cultivators. Share grows, ask questions, and learn from experienced growers.",
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

        {/* AI Assistant Highlight */}
        <section className="py-28 px-4 relative overflow-hidden">
          <div className="absolute inset-0 mycelium-lines opacity-30" />
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[120px]" />
          
          <div className="container max-w-7xl mx-auto relative">
            <div className="glass-card p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div>
                  <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-1.5">
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Enabled
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                    Meet Your AI <span className="text-accent glow-text">Mycology Guide</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    Ask anything about mushroom cultivation. Our AI expert is trained on 
                    thousands of grows, scientific papers, and cultivation guides. 
                    Speak naturally or type your questions.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "Instant answers to cultivation questions",
                      "Photo-based contamination diagnosis",
                      "Personalized growing recommendations",
                      "Voice conversations with ElevenLabs"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50 group-hover:scale-125 transition-transform" />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/chat">
                    <Button size="lg" className="glow-purple font-medium group">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Start Chatting
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/25 via-accent/15 to-mycelium/20 p-10 flex items-center justify-center relative overflow-hidden">
                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full border border-accent/20 animate-pulse" />
                      <div className="absolute w-48 h-48 rounded-full border border-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute w-32 h-32 rounded-full border border-accent/40 animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    
                    <div className="text-center relative z-10">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 mx-auto mb-6 flex items-center justify-center pulse-glow backdrop-blur-sm">
                        <Sparkles className="w-14 h-14 text-accent" />
                      </div>
                      <p className="text-xl font-display font-semibold mb-2 text-foreground">AI Assistant</p>
                      <p className="text-sm text-muted-foreground">Always learning, always available</p>
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
              {/* Decorative elements */}
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
                every step from inoculation to harvest with weekly check-ins and 
                personalized support from our AI and expert team.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <Link to="/subscribe">
                  <Button size="lg" className="bg-spore-gold text-spore-gold-foreground hover:bg-spore-gold/90 font-medium shadow-lg shadow-spore-gold/30 hover:shadow-spore-gold/50 transition-all">
                    <Star className="w-5 h-5 mr-2" />
                    View Plans
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5">
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
