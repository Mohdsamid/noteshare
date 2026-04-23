import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Note } from "@/data/notes";
import { supabase } from "@/integrations/supabase/client";

const NoteCard = ({ note }: { note: Note }) => {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { data } = supabase.storage.from("note-files").getPublicUrl(note.file_path);
    await supabase.from("notes").update({ downloads: note.downloads + 1 }).eq("id", note.id);
    window.open(data.publicUrl, "_blank");
  };

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <FileText className="h-5 w-5" />
        </div>
        <Link to={`/notes/${note.id}`} className="mb-1 line-clamp-2 text-base font-semibold text-foreground hover:text-primary">
          {note.title}
        </Link>
        <p className="mb-3 text-xs text-muted-foreground">{note.downloads} downloads</p>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{note.subject}</Badge>
          <Badge variant="outline">{note.semester}</Badge>
        </div>
        <div className="mt-auto flex gap-2">
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link to={`/notes/${note.id}`}>View</Link>
          </Button>
          <Button size="sm" className="flex-1" onClick={handleDownload}>
            <Download className="mr-1.5 h-4 w-4" /> Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
