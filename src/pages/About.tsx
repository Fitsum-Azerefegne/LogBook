import { Info, Heart, BookOpen, Calendar, Bell, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl">
            <div className="w-12 h-12 border-4 border-white rounded-lg transform rotate-45"></div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About Daily Ribbon
          </h1>
          <p className="text-xl text-muted-foreground">
            Your calm space for thoughts, notes, and reminders
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-soft">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <Heart className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Our Purpose</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Daily Ribbon was created with a simple yet powerful vision: to provide a digital sanctuary 
                    where you can organize your thoughts, track your emotions, and stay mindful of what matters most. 
                    In a world full of noise, we believe everyone deserves a calm, beautiful space to reflect and grow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-secondary" />
                Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Smart Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      Create, organize, and search through your notes with tags and mood indicators
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calendar className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Calendar View</h3>
                    <p className="text-sm text-muted-foreground">
                      Visualize your notes over time with our interactive calendar
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Bell className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Gentle Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Never miss important moments with our thoughtful reminder system
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Mood Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your emotional journey and discover patterns over time
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border-border/50 shadow-soft">
            <CardContent className="p-8 text-center">
              <Info className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We believe that mindfulness and organization go hand in hand. Daily Ribbon combines 
                the practical aspects of note-taking with the wellness benefits of reflection and mood awareness. 
                Our design philosophy centers on simplicity, beauty, and creating a sense of calm in your digital life.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
