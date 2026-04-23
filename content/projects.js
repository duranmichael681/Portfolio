export const projects = [
  {
    slug: "ducky",
    title: "Ducky",
    pitch:
      "Full-stack image management platform with concurrent upload pipelines, role-based access control, and a responsive Next.js frontend.",
    stats: [
      { value: 100, suffix: "+",  label: "Concurrent uploads" },
      { value: 30,  suffix: "%",  label: "Faster queries" },
      { value: 200, prefix: "<", suffix: "ms", label: "Cold start" },
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Supabase"],
    liveUrl: null,
    codeUrl: null,
    visual: { from: "#6366f1", to: "#ec4899" },
  },
  {
    slug: "devbuds",
    title: "DevBuds",
    pitch:
      "Real-time collaboration platform for student project teams, with Socket.IO-backed messaging and TypeScript validation.",
    stats: [
      { value: 50, suffix: "+", label: "Students onboarded" },
      { value: 60, suffix: "%", label: "Faster team formation" },
      { value: 40, suffix: "%", label: "Fewer data errors" },
    ],
    stack: ["React", "Redux", "Socket.IO", "TypeScript"],
    liveUrl: null,
    codeUrl: null,
    visual: { from: "#22d3ee", to: "#6366f1" },
  },
];
