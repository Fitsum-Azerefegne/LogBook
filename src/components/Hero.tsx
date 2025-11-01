import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-workspace.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mindful Living</span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-medium">
                <div className="w-10 h-10 border-4 border-white rounded-lg transform rotate-45"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                LogBook
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Your calm space for thoughts, notes, and reminders. Track your mood, organize your day, 
              and embrace mindful living—one moment at a time.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl">😊</span>
                <span>Track Mood</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <span>Daily Notes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                <span>Reminders</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <img
              src={heroImage}
              alt="Peaceful workspace for daily reflection"
              className="relative rounded-3xl shadow-strong w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
