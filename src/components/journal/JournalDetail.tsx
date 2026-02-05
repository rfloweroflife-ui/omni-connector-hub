import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  Thermometer,
  Droplets,
  Leaf,
  Globe,
  Lock,
  Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { AddEntryDialog } from "./AddEntryDialog";
import { format, parseISO } from "date-fns";

interface JournalDetailProps {
  journalId: string;
  onBack: () => void;
}

export function JournalDetail({ journalId, onBack }: JournalDetailProps) {
  const [journal, setJournal] = useState<Tables<"grow_journals"> | null>(null);
  const [entries, setEntries] = useState<Tables<"grow_entries">[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    
    const [journalRes, entriesRes] = await Promise.all([
      supabase.from("grow_journals").select("*").eq("id", journalId).single(),
      supabase
        .from("grow_entries")
        .select("*")
        .eq("journal_id", journalId)
        .order("entry_date", { ascending: false }),
    ]);

    if (journalRes.data) setJournal(journalRes.data);
    if (entriesRes.data) setEntries(entriesRes.data);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [journalId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Journal not found</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journals
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-display font-semibold">{journal.title}</h1>
            {journal.is_public ? (
              <Badge variant="outline" className="border-accent/50 text-accent">
                <Globe className="w-3 h-3 mr-1" />
                Public
              </Badge>
            ) : (
              <Badge variant="outline">
                <Lock className="w-3 h-3 mr-1" />
                Private
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">{journal.species}</p>
        </div>
        <AddEntryDialog journalId={journalId} onSuccess={fetchData} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="mystical-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold capitalize">{journal.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mystical-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Inoculated</p>
                <p className="font-semibold">
                  {journal.inoculation_date
                    ? format(parseISO(journal.inoculation_date), "MMM d, yyyy")
                    : "Not set"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mystical-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-spore-gold" />
              <div>
                <p className="text-sm text-muted-foreground">Entries</p>
                <p className="font-semibold">{entries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mystical-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Substrate</p>
                <p className="font-semibold truncate text-sm">{journal.substrate || "Not set"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      {journal.notes && (
        <Card className="mystical-card">
          <CardHeader>
            <CardTitle className="text-lg">Project Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{journal.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Entries Timeline */}
      <div>
        <h2 className="text-xl font-display font-semibold mb-4">
          Growth Timeline ({entries.length} entries)
        </h2>
        
        {entries.length === 0 ? (
          <Card className="mystical-card p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-display font-semibold mb-2">No entries yet</h3>
            <p className="text-muted-foreground mb-4">
              Start logging your observations to track progress over time.
            </p>
            <AddEntryDialog journalId={journalId} onSuccess={fetchData} />
          </Card>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <Card key={entry.id} className="mystical-card relative">
                  {/* Timeline connector */}
                  {index < entries.length - 1 && (
                    <div className="absolute left-[39px] top-[76px] w-0.5 h-[calc(100%+16px)] bg-border/50" />
                  )}
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Date circle */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-mycelium/20 flex flex-col items-center justify-center flex-shrink-0 border border-border/50">
                        <span className="text-xs text-muted-foreground">
                          {format(parseISO(entry.entry_date), "MMM")}
                        </span>
                        <span className="text-lg font-display font-bold">
                          {format(parseISO(entry.entry_date), "d")}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        {entry.title && (
                          <h3 className="font-semibold mb-1">{entry.title}</h3>
                        )}
                        
                        {/* Environmental readings */}
                        <div className="flex flex-wrap gap-4 mb-2">
                          {entry.temperature !== null && (
                            <div className="flex items-center gap-1 text-sm">
                              <Thermometer className="w-4 h-4 text-orange-400" />
                              <span>{entry.temperature}°F</span>
                            </div>
                          )}
                          {entry.humidity !== null && (
                            <div className="flex items-center gap-1 text-sm">
                              <Droplets className="w-4 h-4 text-blue-400" />
                              <span>{entry.humidity}%</span>
                            </div>
                          )}
                        </div>

                        {entry.notes && (
                          <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
