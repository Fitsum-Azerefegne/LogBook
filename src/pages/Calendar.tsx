import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import CalendarView from "@/components/CalendarView";
import NoteEditor from "@/components/NoteEditor";
import { Note } from "./Index";

const Calendar = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to Daily Ribbon",
      content: "Start your journaling journey here. Write your thoughts, set reminders, track your mood, and stay organized.",
      date: new Date(),
      tags: ["welcome"],
      pinned: true,
    },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveNote = (note: Note) => {
    if (selectedNote) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    } else {
      setNotes([...notes, { ...note, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent flex items-center gap-3">
            <CalendarIcon className="w-10 h-10 text-secondary" />
            Calendar View
          </h1>
          <p className="text-muted-foreground">View your notes by date</p>
        </div>

        {isEditing ? (
          <div className="animate-scale-in">
            <NoteEditor
              note={selectedNote}
              onSave={handleSaveNote}
              onCancel={() => {
                setIsEditing(false);
                setSelectedNote(null);
              }}
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <CalendarView
              notes={notes}
              onSelectNote={(note) => {
                setSelectedNote(note);
                setIsEditing(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
