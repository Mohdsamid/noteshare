import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Database, Code, Coffee, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import NoteCard from "@/components/NoteCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Note } from "@/data/notes";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { name: "DSA", icon: Code },
  { name: "DBMS", icon: Database },
  { name: "Java", icon: Coffee },
  { name: "Web Development", icon: BookOpen },
];

const Home = () => {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        setRecent((data as Note[]) ?? []);
        setLoading(false);
      });
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/notes?q=${encodeURIComponent(q)}`);
  };

  return (
    <Layout>
      <section className="border-b border-border bg-accent/40">
        <div className="container py-14 text-center">
          <h1 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
            Find & Share College Notes
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            A simple place for BCA students to upload, browse and download study notes by subject and semester.
          </p>
          <form onSubmit={onSearch} className="mx-auto flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search notes by title or subject..."
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={`/notes?subject=${encodeURIComponent(c.name)}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-accent/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-foreground">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Notes</h2>
          <Link to="/notes" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-56" />)}
          </div>
        ) : recent.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            No notes yet. <Link to="/upload" className="text-primary hover:underline">Upload the first one!</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((n) => <NoteCard key={n.id} note={n} />)}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Home;
