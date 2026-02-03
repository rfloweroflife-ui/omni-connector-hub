import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 spore-pattern" />
      <div className="absolute inset-0 mycelium-lines" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-mycelium/15 rounded-full blur-2xl float" style={{ animationDelay: '-1.5s' }} />

      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          {/* Badge */}
          <Badge 
            variant="outline" 
            className="mb-6 border-accent/50 text-accent px-4 py-1.5 animate-fade-in"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            AI-Powered Mycology Platform
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="block">Cultivate</span>
            <span className="gradient-text">Excellence</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Your complete mycology companion. From first inoculation to expert cultivation, 
            guided by AI and powered by community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/chat">
              <Button size="lg" className="glow-purple text-lg px-8 py-6">
                <Sparkles className="w-5 h-5 mr-2" />
                Talk to AI Expert
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border/60">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-accent">5K+</div>
              <div className="text-sm text-muted-foreground">Growers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-spore-gold">24/7</div>
              <div className="text-sm text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
