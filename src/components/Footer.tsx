import { Link } from "react-router-dom";
import { BookOpen, Github, Linkedin, Instagram, Mail, GraduationCap } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold text-foreground">NoteShare</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A simple platform for BCA students to share and download study notes.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Sitemap</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/z" className="hover:text-primary">Home</Link></li>
              <li><Link to="/notes" className="hover:text-primary">Browse Notes</Link></li>
              <li><Link to="/upload" className="hover:text-primary">Upload Notes</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/login" className="hover:text-primary">Login</Link></li>
              <li><Link to="/signup" className="hover:text-primary">Sign Up</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/notes?subject=DSA" className="hover:text-primary">DSA</Link></li>
              <li><Link to="/notes?subject=DBMS" className="hover:text-primary">DBMS</Link></li>
              <li><Link to="/notes?subject=Java" className="hover:text-primary">Java</Link></li>
              <li><Link to="/notes?subject=Web Development" className="hover:text-primary">Web Development</Link></li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Developer</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Alisha Naaz</p>
                <p className="text-xs">Frontend Developer</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Nidhi Rai</p>
                <p className="text-xs">Backend Developer</p>
              </div>
              <p className="flex items-center gap-1.5 pt-1">
                <GraduationCap className="h-4 w-4" />
                BCA — 6th Semester
              </p>
              <p>IPS College, Chhindwara</p>
            </div>
            <div className="mt-3 flex gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:alisha@example.com"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-5 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} NoteShare — A BCA Final Year Project</p>
          <p>Made with React, Node & MongoDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
