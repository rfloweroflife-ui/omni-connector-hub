import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mushroom-forest.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      
      {/* Animated particles overlay */}
      <div className="absolute inset-0 spore-pattern opacity-30" />
      <div className="absolute inset-0 mycelium-lines opacity-40" />
      
      {/* Floating orbs with enhanced glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/30 rounded-full blur-[100px] float animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/25 rounded-full blur-[120px] float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-mycelium/20 rounded-full blur-[80px] float" style={{ animationDelay: '-1.5s' }} />

      <div className="container max-w-6xl mx-auto relative z-10 px-4 py-20">
        <div className="text-center">
          {/* Badge with glass effect */}
          <Badge 
            variant="outline" 
            className="mb-8 border-accent/60 bg-accent/10 backdrop-blur-md text-accent px-6 py-2 text-sm animate-fade-in shadow-lg shadow-accent/20"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            AI-Powered Mycology Platform
          </Badge>

          {/* Main Heading with enhanced typography */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 animate-fade-in tracking-tight" style={{ animationDelay: '0.1s' }}>
            <span className="block text-foreground drop-shadow-2xl">Cultivate</span>
            <span className="gradient-text glow-text drop-shadow-2xl">Excellence</span>
          </h1>

          {/* Subheading with glass card */}
          <div className="glass-card max-w-3xl mx-auto p-6 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
              Your complete mycology companion. From first inoculation to expert cultivation, 
              <span className="text-accent font-medium"> guided by AI</span> and powered by community.
            </p>
          </div>

          {/* CTA Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/chat">
              <Button size="lg" className="glow-purple text-lg px-10 py-7 font-medium group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Talk to AI Expert
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-accent/40 bg-accent/5 backdrop-blur-sm hover:bg-accent/15 hover:border-accent/60 transition-all">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Stats with glass cards */}
          <div className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-6 group hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-display font-bold text-accent glow-text">5K+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Growers</div>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-display font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground mt-1">Expert Guides</div>
            </div>
            <div className="glass-card p-6 group hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-display font-bold text-spore-gold">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
