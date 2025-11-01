import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Mood = "happy" | "calm" | "tired" | "stressed";

interface MoodOption {
  value: Mood;
  emoji: string;
  label: string;
  color: string;
}

const moods: MoodOption[] = [
  { value: "happy", emoji: "😊", label: "Happy", color: "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50" },
  { value: "calm", emoji: "😌", label: "Calm", color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50" },
  { value: "tired", emoji: "😴", label: "Tired", color: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50" },
  { value: "stressed", emoji: "😰", label: "Stressed", color: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50" },
];

const MoodTracker = () => {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const today = new Date().toDateString();
    const moodHistory = JSON.parse(localStorage.getItem("moodHistory") || "{}");
    moodHistory[today] = mood;
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    
    toast({
      title: "Mood tracked!",
      description: `You're feeling ${mood} today.`,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
      <CardHeader>
        <CardTitle className="text-xl bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
          How are you feeling?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant="outline"
              className={`h-24 flex flex-col gap-2 border-2 transition-all ${
                selectedMood === mood.value
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-border/50 hover:border-primary/50"
              } ${mood.color}`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
