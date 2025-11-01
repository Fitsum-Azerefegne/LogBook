import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Pin } from "lucide-react";
import { Note } from "@/pages/Index";

const moodEmojis = {
  happy: "😊",
  calm: "😌",
  tired: "😴",
  stressed: "😰",
};

interface NotesListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

const NotesList = ({ notes, onSelectNote, onDeleteNote }: NotesListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {notes.length === 0 ? (
        <div className="col-span-full text-center py-16">
          <p className="text-muted-foreground text-lg">
            No notes yet. Create your first note to get started!
          </p>
        </div>
      ) : (
        notes.map((note) => (
          <Card
            key={note.id}
            className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all cursor-pointer shadow-soft hover:shadow-medium overflow-hidden"
            onClick={() => onSelectNote(note)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <CardHeader className="relative">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  {note.pinned && (
                    <Pin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  )}
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {note.title}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(note.date), "MMM d, yyyy")}
                </div>
                {note.mood && (
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{moodEmojis[note.mood]}</span>
                    <span className="capitalize">{note.mood}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="relative space-y-3">
              <p className="text-muted-foreground line-clamp-3">
                {note.content}
              </p>
              
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20"
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
  );
};

export default NotesList;
