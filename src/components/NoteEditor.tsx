import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Save, X, Tag, Bell, Pin } from "lucide-react";
import { format } from "date-fns";
import { Note, Mood } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

const moodOptions: { value: Mood; emoji: string; label: string }[] = [
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "calm", emoji: "😌", label: "Calm" },
  { value: "tired", emoji: "😴", label: "Tired" },
  { value: "stressed", emoji: "😰", label: "Stressed" },
];

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
  onCancel: () => void;
}

const NoteEditor = ({ note, onSave, onCancel }: NoteEditorProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [date, setDate] = useState<Date>(note?.date || new Date());
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [mood, setMood] = useState<Mood | undefined>(note?.mood);
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [reminder, setReminder] = useState<Date | undefined>(note?.reminder);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    onSave({
      id: note?.id || "",
      title: title.trim(),
      content: content.trim(),
      date,
      tags,
      mood,
      pinned,
      reminder,
    });

    toast({
      title: "Success!",
      description: note ? "Note updated successfully" : "Note created successfully",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 shadow-medium">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-2xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {note ? "Edit Note" : "New Note"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold bg-muted/30 border-border/50 focus:border-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-muted/30 border-border/50 hover:border-primary transition-all"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card/95 backdrop-blur-sm">
              <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Content</label>
          <Textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] bg-muted/30 border-border/50 focus:border-primary transition-all resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Mood</label>
            <div className="grid grid-cols-2 gap-2">
              {moodOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  className={`h-16 flex flex-col gap-1 ${
                    mood === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border/50"
                  }`}
                  onClick={() => setMood(mood === option.value ? undefined : option.value)}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-xs">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2">
                <Pin className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-foreground">Pin Note</label>
              </div>
              <Switch checked={pinned} onCheckedChange={setPinned} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Reminder
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-muted/30 border-border/50 hover:border-primary transition-all"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {reminder ? format(reminder, "PPP p") : "Set reminder"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card/95 backdrop-blur-sm">
                  <Calendar
                    mode="single"
                    selected={reminder}
                    onSelect={(d) => d && setReminder(d)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tags</label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              className="bg-muted/30 border-border/50 focus:border-primary transition-all"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              className="border-primary/50 hover:bg-primary/10"
            >
              <Tag className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1 border-border/50 hover:bg-muted/50">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteEditor;
