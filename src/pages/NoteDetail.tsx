import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, FileText, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Note } from "@/data/notes";
import { supabase } from "@/integrations/supabase/client";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    supabase.from("notes").select("*").eq("id", id).maybeSingle().then(({ data }) => {
      const n = data as Note | null;
      setNote(n);
      if (n) {
        const { data: urlData } = supabase.storage.from("note-files").getPublicUrl(n.file_path);
        setFileUrl(urlData.publicUrl);
      }
      setLoading(false);
    });
  }, [id]);

  const isPdf = note?.file_name?.toLowerCase().endsWith(".pdf");

  const handleDownload = async () => {
    if (!note) return;
    await supabase.from("notes").update({ downloads: note.downloads + 1 }).eq("id", note.id);
    setNote({ ...note, downloads: note.downloads + 1 });
    window.open(fileUrl, "_blank");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container max-w-4xl py-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  if (!note) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p className="mb-4 text-muted-foreground">Note not found.</p>
          <Button asChild><Link to="/notes">Back to Notes</Link></Button>
        </div>
      </Layout>
    );
  }

  const sizeKb = (note.file_size / 1024).toFixed(0);

  return (
    <Layout>
      <section className="container max-w-4xl py-8">
        <Link to="/notes" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to notes
        </Link>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 overflow-hidden">
            <CardContent className="p-0">
              {isPdf && fileUrl ? (
                <iframe
                  src={`${fileUrl}#toolbar=1&view=FitH`}
                  title={note.title}
                  className="h-[70vh] w-full border-0 bg-muted/40"
                />
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground">
                  <FileText className="h-16 w-16" />
                  <p className="text-sm">{note.file_name}</p>
                  <p className="text-xs">{sizeKb} KB</p>
                  <p className="mt-2 text-xs">Preview not available for this file type</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div>
            <h1 className="mb-2 text-xl font-bold text-foreground">{note.title}</h1>
            {note.description && <p className="mb-4 text-sm text-muted-foreground">{note.description}</p>}
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{note.subject}</Badge>
              <Badge variant="outline">{note.semester}</Badge>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              {note.downloads} downloads · {new Date(note.created_at).toLocaleDateString()}
            </p>
            <Button className="w-full" size="lg" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NoteDetail;
