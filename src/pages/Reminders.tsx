import { useState, useEffect } from "react";
import { Bell, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Note } from "./Index";

const Reminders = () => {
  const [reminders, setReminders] = useState<Note[]>([]);

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Mock reminders for demo
    setReminders([
      {
        id: "1",
        title: "Team Meeting",
        content: "Discuss Q4 goals and milestones",
        date: new Date(),
        reminder: new Date(Date.now() + 3600000), // 1 hour from now
        tags: ["work"],
      },
      {
        id: "2",
        title: "Meditation Session",
        content: "15 minutes of mindfulness",
        date: new Date(),
        reminder: new Date(Date.now() + 7200000), // 2 hours from now
        tags: ["wellness"],
        mood: "calm",
      },
    ]);
  }, []);

  const upcomingReminders = reminders.filter(
    (note) => note.reminder && new Date(note.reminder) > new Date()
  );

  const pastReminders = reminders.filter(
    (note) => note.reminder && new Date(note.reminder) <= new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent flex items-center gap-3">
            <Bell className="w-10 h-10 text-accent" />
            Reminders
          </h1>
          <p className="text-muted-foreground">
            Stay on top of your tasks and moments
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              Upcoming
              <Badge className="bg-gradient-to-r from-primary to-accent">
                {upcomingReminders.length}
              </Badge>
            </h2>
            <div className="grid gap-4">
              {upcomingReminders.length === 0 ? (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="py-12 text-center">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">No upcoming reminders</p>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Reminder
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                upcomingReminders.map((note) => (
                  <Card
                    key={note.id}
                    className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all shadow-soft hover:shadow-medium"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{note.title}</CardTitle>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {format(new Date(note.reminder!), "h:mm a")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{note.content}</p>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-primary/20 text-primary"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {pastReminders.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">
                Past
              </h2>
              <div className="grid gap-4 opacity-60">
                {pastReminders.map((note) => (
                  <Card
                    key={note.id}
                    className="bg-card/30 backdrop-blur-sm border-border/30"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
