import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Star, 
  Check, 
  Sparkles,
  MessageCircle,
  Calendar,
  Video,
  BookOpen,
  Zap,
  Crown,
  ArrowRight,
  Loader2
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  notIncluded: string[];
  cta: string;
  popular: boolean;
  tier: "cultivator" | "mycologist" | "master";
}

const Subscribe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const plans: Plan[] = [
    {
      id: "cultivator",
      name: "Cultivator",
      price: 19,
      period: "month",
      description: "Perfect for beginners starting their first grow",
      features: [
        "Weekly email check-ins",
        "Access to beginner course library",
        "Unlimited AI chat support",
        "Community forum access",
        "Basic contamination guide",
      ],
      notIncluded: [
        "1-on-1 video calls",
        "Advanced courses",
        "Priority support",
      ],
      cta: "Start Growing",
      popular: false,
      tier: "cultivator",
    },
    {
      id: "mycologist",
      name: "Mycologist",
      price: 49,
      period: "month",
      description: "Full hand-holding for serious growers",
      features: [
        "Everything in Cultivator, plus:",
        "Bi-weekly 1-on-1 video calls",
        "Access to ALL course library",
        "Priority AI chat support",
        "Personalized grow plans",
        "Photo diagnosis within 2 hours",
        "Private Discord channel",
      ],
      notIncluded: [],
      cta: "Get Started",
      popular: true,
      tier: "mycologist",
    },
    {
      id: "master",
      name: "Master",
      price: 149,
      period: "month",
      description: "For those building a commercial operation",
      features: [
        "Everything in Mycologist, plus:",
        "Weekly 1-on-1 strategy calls",
        "Commercial setup consulting",
        "Bulk substrate recipes",
        "Scaling & automation guides",
        "Equipment recommendations",
        "Direct phone/text support",
      ],
      notIncluded: [],
      cta: "Go Pro",
      popular: false,
      tier: "master",
    },
  ];

  const testimonials = [
    {
      quote: "I went from total beginner to harvesting my first oysters in 3 weeks. The weekly calls made all the difference.",
      author: "Sarah M.",
      plan: "Mycologist",
    },
    {
      quote: "The photo diagnosis feature saved my entire grow. Caught trich early and they helped me isolate it.",
      author: "Mike T.",
      plan: "Mycologist",
    },
    {
      quote: "Worth every penny. My success rate went from 30% to over 90% after just two months.",
      author: "James L.",
      plan: "Cultivator",
    },
  ];

  const benefits = [
    { icon: Video, title: "1-on-1 Calls", desc: "Video sessions with expert cultivators" },
    { icon: MessageCircle, title: "Priority Support", desc: "Fast responses from our AI and team" },
    { icon: BookOpen, title: "Course Library", desc: "Comprehensive video courses" },
    { icon: Calendar, title: "Weekly Check-ins", desc: "Scheduled guidance and accountability" },
  ];

  const handleSelectPlan = (plan: Plan) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to a plan.",
      });
      navigate("/auth?mode=signup");
      return;
    }
    
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  const handleConfirmSubscription = async () => {
    if (!selectedPlan) return;
    
    setProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Subscription started!",
      description: `Welcome to ${selectedPlan.name}! Check your email for next steps.`,
    });
    
    setProcessing(false);
    setDialogOpen(false);
    
    // Navigate to journal to start their first grow
    navigate("/journal");
  };

  const handleStartTrial = () => {
    if (!user) {
      navigate("/auth?mode=signup");
      return;
    }
    
    toast({
      title: "Free trial started!",
      description: "Enjoy 7 days of Mycologist features. We'll remind you before it ends.",
    });
    
    navigate("/journal");
  };

  const handleContactSales = () => {
    navigate("/chat");
    toast({
      title: "Connecting to support...",
      description: "Our AI assistant can answer your questions about our plans.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-spore-gold/50 text-spore-gold">
            <Crown className="w-3 h-3 mr-1" />
            Premium Subscription
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Guided <span className="text-spore-gold">Cultivation Success</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop guessing and start growing with confidence. Our subscription service 
            provides personalized guidance at every step of your cultivation journey.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`mystical-card relative transition-transform hover:scale-[1.02] ${
                plan.popular ? "border-spore-gold/50 md:scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-spore-gold text-spore-gold-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-5xl font-display font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 opacity-50">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm line-through">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? "bg-spore-gold hover:bg-spore-gold/90 text-spore-gold-foreground" : ""}`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* What's Included */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-semibold text-center mb-8">
            What You Get
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((item, index) => (
              <Card key={index} className="mystical-card text-center hover:border-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <item.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                  <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-semibold text-center mb-8">
            What Our Members Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="mystical-card hover:border-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-spore-gold fill-spore-gold" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.plan} member</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ CTA */}
        <Card className="mystical-card p-8 text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 text-spore-gold" />
          <h2 className="text-2xl font-display font-semibold mb-2">
            Ready to Transform Your Growing?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join hundreds of successful cultivators who've achieved consistent results 
            with our personalized guidance.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              className="bg-spore-gold hover:bg-spore-gold/90 text-spore-gold-foreground"
              onClick={handleStartTrial}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" onClick={handleContactSales}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask Questions
            </Button>
          </div>
        </Card>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mystical-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Confirm Subscription
            </DialogTitle>
            <DialogDescription>
              You're about to subscribe to {selectedPlan?.name} for ${selectedPlan?.price}/month.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{selectedPlan?.name} Plan</span>
                  <span className="text-lg font-display font-bold">${selectedPlan?.price}/mo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cancel anytime. No hidden fees.
                </p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={processing}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSubscription} 
              disabled={processing}
              className="bg-spore-gold hover:bg-spore-gold/90 text-spore-gold-foreground"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Subscription
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Subscribe;
