import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Code2, Database, Server, Palette, BookOpen, Users, Target, Lightbulb } from "lucide-react";

const About = () => {
  const techStack = [
    { name: "React", icon: Code2, desc: "Frontend library" },
    { name: "Tailwind CSS", icon: Palette, desc: "Styling" },
    { name: "Node.js + Express", icon: Server, desc: "Backend (planned)" },
    { name: "MongoDB", icon: Database, desc: "Database (planned)" },
  ];

  const developers = [
    {
      name: "Alisha Naaz",
      role: "Frontend Developer",
      bio: "Passionate about clean UI design and building user-friendly web experiences.",
      initials: "AN",
    },
    {
      name: "Nidhi Rai",
      role: "Backend Developer",
      bio: "Focused on backend logic, databases, and making applications run smoothly.",
      initials: "NR",
    },
  ];

  return (
    <Layout>
      <section className="border-b border-border bg-card">
        <div className="container py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">About NoteShare</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A simple platform built by BCA students to help fellow students share and download study notes easily.
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Target className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Our Goal</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Make quality study notes freely accessible to every BCA student.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">For Students</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Built by students, for students — simple, lightweight, and easy to use.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Lightbulb className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Final Year Project</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A BCA 6th semester project showcasing MERN stack skills.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-6">
        <h2 className="mb-5 text-2xl font-semibold text-foreground">Project Details</h2>
        <Card>
          <CardContent className="space-y-3 pt-6 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">NoteShare</span> is a note-sharing web application designed
              specifically for BCA students. It allows students to upload, browse, and download study materials
              organized by subject and semester.
            </p>
            <p>
              The platform focuses on simplicity and ease of use — no complicated dashboards or unnecessary features.
              Just a clean way to find and share notes for subjects like DSA, DBMS, Java, Web Development, and more.
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Browse notes by subject and semester</li>
              <li>Upload your own notes to help others</li>
              <li>Simple search and filter functionality</li>
              <li>Clean, responsive design that works on all devices</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="container py-6">
        <h2 className="mb-5 text-2xl font-semibold text-foreground">Tech Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((tech) => (
            <Card key={tech.name}>
              <CardContent className="flex flex-col items-start gap-2 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <tech.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{tech.name}</h3>
                <p className="text-xs text-muted-foreground">{tech.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-6 pb-12">
        <h2 className="mb-5 text-2xl font-semibold text-foreground">Meet the Developers</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {developers.map((dev) => (
            <Card key={dev.name}>
              <CardContent className="flex gap-4 pt-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
                  {dev.initials}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold text-foreground">{dev.name}</h3>
                  <Badge variant="secondary">{dev.role}</Badge>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" /> BCA — 6th Semester
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> IPS College, Chhindwara
                  </p>
                  <p className="pt-1 text-sm text-muted-foreground">{dev.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default About;
