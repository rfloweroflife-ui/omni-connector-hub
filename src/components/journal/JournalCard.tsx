import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  Clock,
  Leaf,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Eye,
  Trash2,
  Archive,
  Globe,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { AddEntryDialog } from "./AddEntryDialog";
import { Tables } from "@/integrations/supabase/types";
import { formatDistanceToNow, differenceInDays, parseISO } from "date-fns";

interface JournalCardProps {
  journal: Tables<"grow_journals">;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onRefresh: () => void;
}

const statusConfig: Record<string, { label: string; color: string; progress: number }> = {
  planning: { label: "Planning", color: "bg-muted text-muted-foreground", progress: 5 },
  inoculation: { label: "Inoculation", color: "bg-primary/20 text-primary border-primary/30", progress: 15 },
  colonization: { label: "Colonization", color: "bg-accent/20 text-accent border-accent/30", progress: 45 },
  fruiting: { label: "Fruiting", color: "bg-spore-gold/20 text-spore-gold border-spore-gold/30", progress: 75 },
  harvesting: { label: "Harvesting", color: "bg-success/20 text-success border-success/30", progress: 90 },
  completed: { label: "Completed", color: "bg-success/20 text-success border-success/30", progress: 100 },
  contaminated: { label: "Contaminated", color: "bg-destructive/20 text-destructive border-destructive/30", progress: 0 },
};

export function JournalCard({ journal, onView, onDelete, onStatusChange, onRefresh }: JournalCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const status = statusConfig[journal.status || "planning"] || statusConfig.planning;
  const daysActive = journal.inoculation_date 
    ? differenceInDays(new Date(), parseISO(journal.inoculation_date))
    : 0;
  const lastUpdate = formatDistanceToNow(parseISO(journal.updated_at), { addSuffix: true });

  const isHealthy = journal.status !== "contaminated";

  return (
    <>
      <Card className="mystical-card cursor-pointer hover:border-accent/50 transition-colors group">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 via-accent/10 to-mycelium/20 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-8 h-8 text-accent" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2 gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-lg truncate">{journal.title}</h3>
                    {journal.is_public ? (
                      <Globe className="w-4 h-4 text-accent flex-shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{journal.species}</p>
                </div>
                <Badge className={status.color}>
                  {isHealthy ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {status.label}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                {journal.substrate && (
                  <span className="truncate max-w-[150px]">{journal.substrate}</span>
                )}
                {daysActive > 0 && (
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Day {daysActive}
                  </span>
                )}
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Updated {lastUpdate}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Progress value={status.progress} className="flex-1 h-2" />
                <span className="text-sm font-medium">{status.progress}%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-2 flex-shrink-0">
              <AddEntryDialog journalId={journal.id} onSuccess={onRefresh} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onView(journal.id)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onStatusChange(journal.id, "inoculation")}>
                    Set to Inoculation
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(journal.id, "colonization")}>
                    Set to Colonization
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(journal.id, "fruiting")}>
                    Set to Fruiting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(journal.id, "harvesting")}>
                    Set to Harvesting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(journal.id, "completed")}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(journal.id, "contaminated")}
                    className="text-destructive"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Mark Contaminated
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setDeleteDialogOpen(true)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Journal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="mystical-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this journal?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{journal.title}" and all its entries. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(journal.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
