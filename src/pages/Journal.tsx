import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FlaskConical, 
  Plus, 
  Calendar, 
  Camera,
  Droplets,
  Thermometer,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Leaf
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Journal = () => {
  const mockGrows = [
    {
      id: 1,
      name: "Golden Oyster #1",
      species: "Pleurotus citrinopileatus",
      stage: "Fruiting",
      progress: 75,
      startDate: "2024-01-15",
      lastUpdate: "2 hours ago",
      status: "healthy",
      daysActive: 21,
    },
    {
      id: 2,
      name: "Lion's Mane Experiment",
      species: "Hericium erinaceus",
      stage: "Colonization",
      progress: 45,
      startDate: "2024-01-22",
      lastUpdate: "1 day ago",
      status: "healthy",
      daysActive: 14,
    },
    {
      id: 3,
      name: "Blue Oyster Bucket",
      species: "Pleurotus ostreatus var. columbinus",
      stage: "Inoculation",
      progress: 15,
      startDate: "2024-02-01",
      lastUpdate: "3 days ago",
      status: "attention",
      daysActive: 4,
    },
  ];

  const stats = [
    { label: "Active Grows", value: 3, icon: FlaskConical, color: "text-accent" },
    { label: "Total Harvested", value: "2.4 kg", icon: TrendingUp, color: "text-success" },
    { label: "Success Rate", value: "87%", icon: CheckCircle2, color: "text-spore-gold" },
    { label: "Days Growing", value: 156, icon: Calendar, color: "text-primary" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-success/20 text-success border-success/30";
      case "attention": return "bg-spore-gold/20 text-spore-gold border-spore-gold/30";
      case "critical": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Inoculation": return "text-primary";
      case "Colonization": return "text-accent";
      case "Fruiting": return "text-spore-gold";
      case "Harvesting": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Badge variant="outline" className="mb-2 border-accent/50 text-accent">
              <FlaskConical className="w-3 h-3 mr-1" />
              Grow Journal
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-semibold">
              Your <span className="gradient-text">Cultivation Projects</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Track progress, log observations, and get AI-powered insights.
            </p>
          </div>
          <Button className="glow-purple">
            <Plus className="w-4 h-4 mr-2" />
            New Grow
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="mystical-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-display font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Grows */}
        <section>
          <h2 className="text-xl font-display font-semibold mb-4">Active Grows</h2>
          <div className="grid gap-4">
            {mockGrows.map((grow) => (
              <Card key={grow.id} className="mystical-card cursor-pointer hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 via-accent/10 to-mycelium/20 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-8 h-8 text-accent" />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display font-semibold text-lg">{grow.name}</h3>
                          <p className="text-sm text-muted-foreground">{grow.species}</p>
                        </div>
                        <Badge className={getStatusColor(grow.status)}>
                          {grow.status === "healthy" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {grow.status === "attention" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {grow.status.charAt(0).toUpperCase() + grow.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className={`font-medium ${getStageColor(grow.stage)}`}>
                          {grow.stage}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Day {grow.daysActive}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Updated {grow.lastUpdate}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Progress value={grow.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{grow.progress}%</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Camera className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Add Photo</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Droplets className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Log Reading</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Empty state for new users */}
        {mockGrows.length === 0 && (
          <Card className="mystical-card p-12 text-center">
            <FlaskConical className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-display font-semibold mb-2">No Active Grows</h3>
            <p className="text-muted-foreground mb-6">
              Start tracking your first cultivation project to get personalized 
              insights and AI-powered recommendations.
            </p>
            <Button className="glow-purple">
              <Plus className="w-4 h-4 mr-2" />
              Start Your First Grow
            </Button>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
