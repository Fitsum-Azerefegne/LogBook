import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

type Mood = "happy" | "calm" | "tired" | "stressed";

const moodEmojis: Record<Mood, string> = {
  happy: "😊",
  calm: "😌",
  tired: "😴",
  stressed: "😰",
};

const MoodTrends = () => {
  const [moodHistory, setMoodHistory] = useState<Record<string, Mood>>({});

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("moodHistory") || "{}");
    setMoodHistory(history);
  }, []);

  const recentMoods = Object.entries(moodHistory)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .slice(0, 7);

  const moodCounts = Object.values(moodHistory).reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {} as Record<Mood, number>);

  const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <Card className="bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          <TrendingUp className="w-5 h-5 text-primary" />
          Mood Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentMoods.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {recentMoods.map(([date, mood]) => (
                <div
                  key={date}
                  className="flex flex-col items-center p-2 rounded-lg bg-muted/30 border border-border/50"
                >
                  <span className="text-2xl">{moodEmojis[mood]}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
            
            {dominantMood && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <p className="text-sm text-muted-foreground">Most common mood:</p>
                <p className="text-2xl mt-1">
                  {moodEmojis[dominantMood[0] as Mood]} {dominantMood[0]}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({dominantMood[1]} {dominantMood[1] === 1 ? "day" : "days"})
                  </span>
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Start tracking your mood to see trends over time
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTrends;
