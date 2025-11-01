import { BookOpen, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import MoodTracker from "@/components/MoodTracker";
import MoodTrends from "@/components/MoodTrends";
import { Link } from "react-router-dom";

export type Mood = "happy" | "calm" | "tired" | "stressed";

export interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags?: string[];
  mood?: Mood;
  pinned?: boolean;
  reminder?: Date;
}

const Index = () => {
  const upcomingReminders = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Hero />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <ReflectionPrompt />
            <MoodTrends />
          </div>
          <div>
            <MoodTracker />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/notes" className="group">
            <div className="p-8 rounded-xl bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 transition-all shadow-soft hover:shadow-medium cursor-pointer">
              <BookOpen className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Notes
              </h3>
              <p className="text-muted-foreground">
                Create and organize your daily thoughts and ideas
              </p>
              <Button className="mt-4 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </div>
          </Link>

          <Link to="/calendar" className="group">
            <div className="p-8 rounded-xl bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm border-2 border-border/50 hover:border-secondary/50 transition-all shadow-soft hover:shadow-medium cursor-pointer">
              <BookOpen className="w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Calendar
              </h3>
              <p className="text-muted-foreground">
                View your notes in a beautiful calendar layout
              </p>
              <Button variant="outline" className="mt-4 w-full border-secondary/50 hover:bg-secondary/10">
                View Calendar
              </Button>
            </div>
          </Link>

          <Link to="/reminders" className="group">
            <div className="p-8 rounded-xl bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm border-2 border-border/50 hover:border-accent/50 transition-all shadow-soft hover:shadow-medium cursor-pointer">
              <Bell className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Reminders
              </h3>
              <p className="text-muted-foreground">
                {upcomingReminders} upcoming reminders
              </p>
              <Button variant="outline" className="mt-4 w-full border-accent/50 hover:bg-accent/10">
                View Reminders
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
