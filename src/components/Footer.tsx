import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-primary via-secondary to-accent rounded flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Daily Ribbon
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your calm space for thoughts, notes, and reminders.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for mindful living
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
