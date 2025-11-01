import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Calendar, Bell, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/notes", label: "Notes", icon: BookOpen },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/reminders", label: "Reminders", icon: Bell },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <div className="w-5 h-5 border-2 border-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              LogBook
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={
                    isActive(item.path)
                      ? "bg-gradient-to-r from-primary to-secondary"
                      : "hover:bg-muted/50"
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="icon"
                  className={
                    isActive(item.path)
                      ? "bg-gradient-to-r from-primary to-secondary"
                      : ""
                  }
                >
                  <item.icon className="w-4 h-4" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
