// NOTE: github/demo links currently point at your GitHub profile as a
// placeholder. Swap in the exact repo / live URL for each project when ready.
const GITHUB_PROFILE = "https://github.com/Dhandar";

export const projects = [
  {
    id: "wanderlust",
    name: "Wanderlust",
    tag: "Airbnb Clone — Full-Stack MERN App",
    file: "Wanderlust.jsx",
    description:
      "A full-stack property listing and booking platform inspired by Airbnb, built end to end with the MERN stack.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "JWT", "Mongoose", "REST APIs"],
    highlights: [
      "Designed and built 12+ RESTful APIs with full CRUD functionality and real-time MongoDB data persistence.",
      "Implemented role-based access control (RBAC) and secure authentication using JWT.",
      "Built a responsive React.js + Redux front end with an optimized state-management architecture.",
    ],
    future: ["Image uploads via Cloudinary", "Map-based listing search", "User reviews & ratings"],
    github: GITHUB_PROFILE,
    demo: "",
    featured: true,
  },
  
  {
    id: "simon-says",
    name: "Simon Says Game",
    tag: "Browser Memory Game",
    file: "SimonSays.js",
    description:
      "An interactive browser-based memory game where players repeat an increasingly long sequence of moves.",
    tech: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Implemented core game logic and event handling with vanilla JavaScript.",
      "Used DOM manipulation to drive sequence playback and user input feedback.",
      "Added score / progress tracking with a responsive layout.",
    ],
    future: [],
    github: GITHUB_PROFILE,
    demo: "",
    featured: false,
  },
  
  {
    id: "portfolio",
    name: "This Portfolio",
    tag: "Personal Site — React + Vite",
    file: "Portfolio.jsx",
    description:
      "The site you're on right now — a hand-built, responsive personal portfolio for showcasing my work.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Component-driven layout with a reusable design system.",
      "Built mobile-first and tested across common breakpoints.",
      "Used to bring together my projects, skills, and resume in one place.",
    ],
    future: [],
    github: GITHUB_PROFILE,
    demo: "",
    featured: false,
  },
];
