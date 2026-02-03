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
        <section className="py-24 px-4">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
                <Sparkles className="w-3 h-3 mr-1" />
                Everything You Need
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4">
                Your Complete <span className="gradient-text">Mycology Platform</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From your first spore syringe to advanced cultivation techniques, 
                we've built the tools to support your entire journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* AI Assistant Highlight */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 spore-pattern opacity-50" />
          <div className="container max-w-7xl mx-auto relative">
            <div className="mystical-card p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                    <Mic className="w-3 h-3 mr-1" />
                    Voice Enabled
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                    Meet Your AI <span className="text-accent glow-text">Mycology Guide</span>
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Ask anything about mushroom cultivation. Our AI expert is trained on 
                    thousands of grows, scientific papers, and cultivation guides. 
                    Speak naturally or type your questions.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span>Instant answers to cultivation questions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span>Photo-based contamination diagnosis</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span>Personalized growing recommendations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span>Voice conversations with ElevenLabs</span>
                    </li>
                  </ul>
                  <Link to="/chat">
                    <Button size="lg" className="glow-purple">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Start Chatting
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-mycelium/20 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto mb-6 flex items-center justify-center pulse-glow">
                        <Sparkles className="w-12 h-12 text-accent" />
                      </div>
                      <p className="text-lg font-medium mb-2">AI Assistant</p>
                      <p className="text-sm text-muted-foreground">Always learning, always available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="py-24 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-spore-gold/50 text-spore-gold">
              <Star className="w-3 h-3 mr-1" />
              Premium Experience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Complete Hand-Holding for <span className="text-spore-gold">New Growers</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Not sure where to start? Our subscription service guides you through 
              every step from inoculation to harvest with weekly check-ins and 
              personalized support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/subscribe">
                <Button size="lg" variant="outline" className="border-spore-gold/50 text-spore-gold hover:bg-spore-gold/10">
                  View Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="ghost">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Free Guides
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
