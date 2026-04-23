import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import NoteCard from "@/components/NoteCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subjects, semesters, Note } from "@/data/notes";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Notes = () => {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const subject = params.get("subject") ?? "all";
  const semester = params.get("semester") ?? "all";
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setNotes((data as Note[]) ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const matchQ = q ? (n.title + n.subject).toLowerCase().includes(q.toLowerCase()) : true;
      const matchS = subject === "all" ? true : n.subject === subject;
      const matchSem = semester === "all" ? true : n.semester === semester;
      return matchQ && matchS && matchSem;
    });
  }, [q, subject, semester, notes]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <Layout>
      <section className="container py-10">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Browse Notes</h1>
        <p className="mb-6 text-sm text-muted-foreground">Filter by subject or semester to find what you need.</p>

        <div className="mb-6 grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-3">
          <Input
            value={q}
            onChange={(e) => { setQ(e.target.value); setParam("q", e.target.value); }}
            placeholder="Search notes..."
          />
          <Select value={subject} onValueChange={(v) => setParam("subject", v)}>
            <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={semester} onValueChange={(v) => setParam("semester", v)}>
            <SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {semesters.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            No notes found. {notes.length === 0 ? "Be the first to upload!" : "Try changing the filters."}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n) => <NoteCard key={n.id} note={n} />)}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Notes;
