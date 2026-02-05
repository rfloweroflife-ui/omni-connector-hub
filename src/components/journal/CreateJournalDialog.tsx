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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CreateJournalDialogProps {
  onSuccess: () => void;
}

const speciesOptions = [
  "Pleurotus ostreatus (Oyster)",
  "Pleurotus citrinopileatus (Golden Oyster)",
  "Hericium erinaceus (Lion's Mane)",
  "Lentinula edodes (Shiitake)",
  "Grifola frondosa (Maitake)",
  "Pholiota nameko (Nameko)",
  "Hypsizygus tessellatus (King Trumpet)",
  "Cyclocybe aegerita (Black Poplar)",
  "Flammulina velutipes (Enoki)",
  "Other",
];

const substrateOptions = [
  "Hardwood sawdust",
  "Straw",
  "Master's Mix (50/50)",
  "Grain spawn (rye)",
  "Grain spawn (wheat)",
  "Grain spawn (millet)",
  "Cardboard",
  "Coffee grounds",
  "Manure-based",
  "Other",
];

export function CreateJournalDialog({ onSuccess }: CreateJournalDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [species, setSpecies] = useState("");
  const [substrate, setSubstrate] = useState("");
  const [notes, setNotes] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [inoculationDate, setInoculationDate] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !species) return;

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not authenticated",
        description: "Please sign in to create a journal.",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("grow_journals").insert({
      title: title.trim(),
      species,
      substrate: substrate || null,
      notes: notes.trim() || null,
      is_public: isPublic,
      inoculation_date: inoculationDate || null,
      user_id: user.id,
      status: "planning",
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to create journal",
        description: error.message,
      });
    } else {
      toast({
        title: "Journal created!",
        description: "Your new grow journal is ready.",
      });
      setOpen(false);
      resetForm();
      onSuccess();
    }

    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setSpecies("");
    setSubstrate("");
    setNotes("");
    setIsPublic(false);
    setInoculationDate("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="glow-purple">
          <Plus className="w-4 h-4 mr-2" />
          New Grow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] mystical-card border-border/50">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Start New Grow</DialogTitle>
            <DialogDescription>
              Create a journal to track your cultivation project from start to harvest.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Name *</Label>
              <Input
                id="title"
                placeholder="e.g., Golden Oyster Bucket #1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-input/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Species *</Label>
              <Select value={species} onValueChange={setSpecies} required>
                <SelectTrigger className="bg-input/50">
                  <SelectValue placeholder="Select mushroom species" />
                </SelectTrigger>
                <SelectContent>
                  {speciesOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="substrate">Substrate</Label>
              <Select value={substrate} onValueChange={setSubstrate}>
                <SelectTrigger className="bg-input/50">
                  <SelectValue placeholder="Select substrate type" />
                </SelectTrigger>
                <SelectContent>
                  {substrateOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="inoculation-date">Inoculation Date</Label>
              <Input
                id="inoculation-date"
                type="date"
                value={inoculationDate}
                onChange={(e) => setInoculationDate(e.target.value)}
                className="bg-input/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Initial observations, goals, or setup details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-input/50 min-h-[80px]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public">Make Public</Label>
                <p className="text-xs text-muted-foreground">
                  Share your grow with the community
                </p>
              </div>
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
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
            <Button type="submit" disabled={loading || !title.trim() || !species}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Journal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
