import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Upload, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-foreground">NoteShare</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={({ isActive }) => `text-sm ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>Home</NavLink>
          <NavLink to="/notes" className={({ isActive }) => `text-sm ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>Browse Notes</NavLink>
          <NavLink to="/upload" className={({ isActive }) => `text-sm ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>Upload</NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-sm ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>About</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="hidden sm:inline-flex">
              <LogOut className="mr-1.5 h-4 w-4" /> Logout
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="hidden sm:inline-flex">
              <LogIn className="mr-1.5 h-4 w-4" /> Login
            </Button>
          )}
          <Button size="sm" onClick={() => navigate("/upload")}>
            <Upload className="mr-1.5 h-4 w-4" /> Upload
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
