import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Plus, Loader2, Thermometer, Droplets } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddEntryDialogProps {
  journalId: string;
  onSuccess: () => void;
  trigger?: React.ReactNode;
}

export function AddEntryDialog({ journalId, onSuccess, trigger }: AddEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [temperature, setTemperature] = useState<number>(72);
  const [humidity, setHumidity] = useState<number>(85);
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split("T")[0]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not authenticated",
        description: "Please sign in to add an entry.",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("grow_entries").insert({
      journal_id: journalId,
      user_id: user.id,
      title: title.trim() || null,
      notes: notes.trim() || null,
      temperature,
      humidity,
      entry_date: entryDate,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to add entry",
        description: error.message,
      });
    } else {
      toast({
        title: "Entry logged!",
        description: "Your observation has been recorded.",
      });
      setOpen(false);
      resetForm();
      onSuccess();
    }

    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setNotes("");
    setTemperature(72);
    setHumidity(85);
    setEntryDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] mystical-card border-border/50">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Log Entry</DialogTitle>
            <DialogDescription>
              Record your observations, environmental conditions, and progress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="entry-date">Date</Label>
              <Input
                id="entry-date"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="bg-input/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-title">Title (optional)</Label>
              <Input
                id="entry-title"
                placeholder="e.g., First pins spotted!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-input/50"
              />
            </div>
            
            {/* Temperature Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  Temperature
                </Label>
                <span className="text-sm font-medium">{temperature}°F</span>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={([val]) => setTemperature(val)}
                min={40}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40°F</span>
                <span>Optimal: 65-75°F</span>
                <span>100°F</span>
              </div>
            </div>

            {/* Humidity Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  Humidity
                </Label>
                <span className="text-sm font-medium">{humidity}%</span>
              </div>
              <Slider
                value={[humidity]}
                onValueChange={([val]) => setHumidity(val)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>Optimal: 80-95%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry-notes">Observations</Label>
              <Textarea
                id="entry-notes"
                placeholder="Describe what you see: mycelium growth, pins, coloring, smell, any concerns..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-input/50 min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Log Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
