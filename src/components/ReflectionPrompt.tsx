import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const prompts = [
  "What went well today?",
  "What are you grateful for?",
  "What's one thing you learned today?",
  "How are you feeling right now?",
  "What made you smile today?",
  "What would make tomorrow better?",
];

const ReflectionPrompt = () => {
  const [reflection, setReflection] = useState("");
  const [prompt] = useState(prompts[new Date().getDate() % prompts.length]);

  const handleSave = () => {
    if (reflection.trim()) {
      localStorage.setItem(`reflection-${new Date().toDateString()}`, reflection);
      setReflection("");
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          <Sparkles className="w-5 h-5 text-primary" />
          Today's Reflection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground italic">{prompt}</p>
        <Textarea
          placeholder="Write your thoughts..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="min-h-[120px] bg-muted/30 border-border/50 focus:border-primary transition-all resize-none"
        />
        <Button
          onClick={handleSave}
          disabled={!reflection.trim()}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          Save Reflection
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReflectionPrompt;
