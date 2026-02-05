import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  content: string;
  rating: number;
  species: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Home Cultivator",
    content: "ADI~DAS transformed my growing journey. The AI assistant helped me troubleshoot contamination issues I'd been struggling with for months. First successful harvest in 3 weeks!",
    rating: 5,
    species: "Lion's Mane"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Professional Grower",
    content: "The grow journal with photo analysis is incredible. It caught early trichoderma signs I completely missed. Saved an entire batch worth hundreds of dollars.",
    rating: 5,
    species: "Pink Oyster"
  },
  {
    id: 3,
    name: "Jake Morrison",
    role: "Complete Beginner",
    content: "Started with zero knowledge and the subscription service held my hand through everything. Weekly video calls made all the difference. Now I'm growing for farmer's markets!",
    rating: 5,
    species: "Blue Oyster"
  },
  {
    id: 4,
    name: "Dr. Elena Vasquez",
    role: "Mycology Researcher",
    content: "Even as a professional mycologist, I'm impressed by the depth of the AI's knowledge. It's like having a well-read colleague available 24/7. Highly recommend.",
    rating: 5,
    species: "Reishi"
  },
  {
    id: 5,
    name: "Tom & Lisa Baker",
    role: "Urban Farmers",
    content: "We run a small urban farm and ADI~DAS streamlined our entire operation. The community forum connected us with local restaurants now buying our harvest weekly.",
    rating: 5,
    species: "Shiitake"
  },
  {
    id: 6,
    name: "Aisha Patel",
    role: "Hobby Grower",
    content: "The learning center tutorials are top-notch. Clear, concise, and actually work. My fruiting chamber setup from their guide gave me my best yields ever.",
    rating: 5,
    species: "Golden Oyster"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = 3;
  const maxIndex = Math.ceil(testimonials.length / itemsPerView) - 1;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  return (
    <section className="py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 spore-pattern opacity-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="container max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 border-spore-gold/50 text-spore-gold bg-spore-gold/10 backdrop-blur-sm px-4 py-1.5">
            <Star className="w-4 h-4 mr-2 fill-spore-gold" />
            Trusted by Growers
          </Badge>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Real Results from <span className="gradient-text glow-text">Real Cultivators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of growers who've transformed their cultivation journey with ADI~DAS
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-accent/20 hover:border-accent/50 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-accent/20 hover:border-accent/50 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500">
            {visibleTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="glass-card border-border/30 hover:border-accent/40 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20 group-hover:text-accent/40 transition-colors" />
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-spore-gold text-spore-gold" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground/90 mb-6 leading-relaxed min-h-[120px]">
                    "{testimonial.content}"
                  </p>

                  {/* Species Badge */}
                  <Badge variant="outline" className="mb-6 border-accent/30 text-accent bg-accent/10">
                    Growing: {testimonial.species}
                  </Badge>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                    <Avatar className="h-12 w-12 ring-2 ring-accent/20">
                      <AvatarFallback className="bg-primary/20 text-primary font-medium">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'w-8 bg-accent' 
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;