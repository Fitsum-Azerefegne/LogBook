import { useState } from "react";
import { BookOpen, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import { Note } from "./Index";

const Notes = () => {
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveNote = (note: Note) => {
    if (selectedNote) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    } else {
      setNotes([...notes, { ...note, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-primary" />
            Your Notes
          </h1>
          <p className="text-muted-foreground">Organize your thoughts and ideas</p>
        </div>

        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all"
              />
            </div>
            
            <Button
              onClick={() => {
                setSelectedNote(null);
                setIsEditing(true);
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
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
            <NotesList
              notes={sortedNotes}
              onSelectNote={(note) => {
                setSelectedNote(note);
                setIsEditing(true);
              }}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
