import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FlaskConical, 
  Calendar, 
  TrendingUp,
  CheckCircle2,
  Leaf,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CreateJournalDialog } from "@/components/journal/CreateJournalDialog";
import { JournalCard } from "@/components/journal/JournalCard";
import { JournalDetail } from "@/components/journal/JournalDetail";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

const Journal = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [journals, setJournals] = useState<Tables<"grow_journals">[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null);

  const fetchJournals = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("grow_journals")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to load journals",
        description: error.message,
      });
    } else {
      setJournals(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchJournals();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("grow_journals").delete().eq("id", id);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete",
        description: error.message,
      });
    } else {
      toast({
        title: "Journal deleted",
        description: "Your grow journal has been removed.",
      });
      fetchJournals();
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase
      .from("grow_journals")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to update status",
        description: error.message,
      });
    } else {
      toast({
        title: "Status updated",
        description: `Journal moved to ${status}.`,
      });
      fetchJournals();
    }
  };

  // Calculate stats
  const activeGrows = journals.filter(j => 
    !["completed", "contaminated"].includes(j.status || "")
  ).length;
  const completedGrows = journals.filter(j => j.status === "completed").length;
  const successRate = journals.length > 0 
    ? Math.round((completedGrows / journals.length) * 100) 
    : 0;

  const stats = [
    { label: "Active Grows", value: activeGrows, icon: FlaskConical, color: "text-accent" },
    { label: "Completed", value: completedGrows, icon: CheckCircle2, color: "text-success" },
    { label: "Success Rate", value: `${successRate}%`, icon: TrendingUp, color: "text-spore-gold" },
    { label: "Total Projects", value: journals.length, icon: Calendar, color: "text-primary" },
  ];

  // Show sign-in prompt if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container max-w-7xl mx-auto px-4 py-12">
          <Card className="mystical-card p-12 text-center max-w-lg mx-auto">
            <LogIn className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-2xl font-display font-semibold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Create an account or sign in to start tracking your cultivation projects.
            </p>
            <Button className="glow-purple" onClick={() => navigate("/auth")}>
              Sign In to Continue
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Show journal detail view
  if (selectedJournalId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container max-w-7xl mx-auto px-4 py-12">
          <JournalDetail 
            journalId={selectedJournalId} 
            onBack={() => setSelectedJournalId(null)} 
          />
        </main>
        <Footer />
      </div>
    );
  }

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
          <CreateJournalDialog onSuccess={fetchJournals} />
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

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        )}

        {/* Journals List */}
        {!loading && journals.length > 0 && (
          <section>
            <h2 className="text-xl font-display font-semibold mb-4">Your Grows</h2>
            <div className="grid gap-4">
              {journals.map((journal) => (
                <JournalCard
                  key={journal.id}
                  journal={journal}
                  onView={setSelectedJournalId}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  onRefresh={fetchJournals}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!loading && journals.length === 0 && (
          <Card className="mystical-card p-12 text-center">
            <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-display font-semibold mb-2">No Active Grows</h3>
            <p className="text-muted-foreground mb-6">
              Start tracking your first cultivation project to get personalized 
              insights and AI-powered recommendations.
            </p>
            <CreateJournalDialog onSuccess={fetchJournals} />
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
