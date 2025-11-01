import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import { Note } from "@/pages/Index";

interface CalendarViewProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

const CalendarView = ({ notes, onSelectNote }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const notesForSelectedDate = notes.filter((note) =>
    isSameDay(new Date(note.date), selectedDate)
  );

  const datesWithNotes = notes.map((note) => new Date(note.date));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border-0"
            modifiers={{
              hasNotes: datesWithNotes,
            }}
            modifiersStyles={{
              hasNotes: {
                fontWeight: "bold",
                textDecoration: "underline",
                color: "hsl(var(--primary))",
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            {format(selectedDate, "MMMM d, yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notesForSelectedDate.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No notes for this day
              </p>
            ) : (
              notesForSelectedDate.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 hover:from-muted/70 hover:to-muted/40 cursor-pointer transition-all border border-border/50 hover:border-primary/50 hover:shadow-soft"
                >
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {note.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {note.content}
                  </p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
