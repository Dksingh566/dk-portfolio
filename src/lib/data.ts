export const personalInfo = {
  name: "Dhirendra Singh",
  title: "UI/UX Designer & Full-Stack Developer",
  tagline: "Crafting Digital Experiences | Building Future Tech",
  email: "dhirendrasinghkushinagar719@gmail.com",
  phone: "+91 9041909256",
  location: "Chnadigrah, India",
  bio: "I'm a passionate UI/UX designer and front-end developer with 5+ years of experience creating intuitive, engaging digital experiences. I transform complex problems into elegant solutions through thoughtful design and clean code.",
  avatar: "/placeholder.svg", // Replace with actual image
  socials: {
    github: "https://github.com/Dkraja566",
    linkedin: "https://www.linkedin.com/in/dhirendra-dk566/",
    twitter: "https://x.com/Dkraja566",
    dribbble: "#",
    behance: "#"
  }
};

export const skills = {
  technical: [
    { name: "React", level: 95, icon: "react" },
    { name: "JavaScript", level: 90, icon: "javascript" },
    { name: "TypeScript", level: 85, icon: "typescript" },
    { name: "HTML5", level: 95, icon: "html5" },
    { name: "CSS3/SCSS", level: 90, icon: "css3" },
    { name: "Tailwind CSS", level: 95, icon: "tailwind" },
    { name: "Next.js", level: 85, icon: "nextjs" },
    { name: "Node.js", level: 80, icon: "nodejs" },
    { name: "Redux", level: 85, icon: "redux" },
    { name: "GraphQL", level: 75, icon: "graphql" },
    { name: "Framer Motion", level: 85, icon: "framer" },
    { name: "GSAP", level: 80, icon: "gsap" }
  ],
  design: [
    { name: "Figma", level: 95, icon: "figma" },
    { name: "Adobe XD", level: 90, icon: "adobexd" },
    { name: "Photoshop", level: 85, icon: "photoshop" },
    { name: "Illustrator", level: 80, icon: "illustrator" },
    { name: "Sketch", level: 85, icon: "sketch" },
    { name: "Prototyping", level: 90, icon: "prototype" },
    { name: "UI Design", level: 95, icon: "ui" },
    { name: "UX Research", level: 85, icon: "ux" },
    { name: "Wireframing", level: 90, icon: "wireframe" },
    { name: "Interaction Design", level: 85, icon: "interaction" }
  ],
  soft: [
    { name: "Problem Solving", level: 95 },
    { name: "Communication", level: 90 },
    { name: "Teamwork", level: 95 },
    { name: "Time Management", level: 85 },
    { name: "Adaptability", level: 90 },
    { name: "Leadership", level: 85 },
    { name: "Creativity", level: 90 },
    { name: "Critical Thinking", level: 85 }
  ]
};

export const experience = [
  {
    role: "Senior UI/UX Designer",
    company: "TechCorp Inc.",
    duration: "Jan 2021 - Present",
    description: "Lead the design team in creating intuitive interfaces for various products. Work closely with developers to ensure design implementation meets vision. Conduct user research and usability testing to optimize product experience.",
    achievements: [
      "Redesigned flagship product UI increasing user engagement by 45%",
      "Implemented design system reducing development time by 30%",
      "Led team of 5 designers across multiple projects"
    ]
  },
  {
    role: "Front-End Developer",
    company: "InnovateTech",
    duration: "Mar 2018 - Dec 2020",
    description: "Developed responsive web applications using React and modern JavaScript. Collaborated with designers to implement pixel-perfect interfaces. Optimized application performance and accessibility.",
    achievements: [
      "Built 15+ responsive websites and applications",
      "Reduced load time by 40% through performance optimization",
      "Implemented CI/CD pipeline for smoother deployments"
    ]
  },
  {
    role: "UI Designer",
    company: "CreativeSolutions",
    duration: "Jun 2016 - Feb 2018",
    description: "Created user interfaces for web and mobile applications. Worked with product managers to understand requirements and translate into visual designs. Created wireframes, mockups, and interactive prototypes.",
    achievements: [
      "Designed interfaces for 10+ mobile applications",
      "Created company's first comprehensive UI style guide",
      "Improved user satisfaction ratings by 35%"
    ]
  }
];

export const projects = [
  {
    id: "fintech-dashboard",
    title: "FinTrack Dashboard",
    category: "UI/UX",
    image: "/placeholder1.avif", // Replace with actual image
    description: "A comprehensive financial tracking dashboard with intuitive data visualization and real-time updates.",
    technologies: ["React", "TypeScript", "GSAP", "Chart.js", "Tailwind CSS"],
    link: "#",
    github: "#",
    featured: true,
    details: {
      challenge: "Create a complex data dashboard that simplifies financial information while maintaining a clean, intuitive interface.",
      solution: "Implemented a modular dashboard design with customizable widgets and interactive charts that adapt to user preferences.",
      outcome: "Increased user engagement by 40% and reduced learning curve for new users by 35%."
    }
  },
  {
    id: "ecommerce-platform",
    title: "LuxeCommerce",
    category: "Web Dev",
    image: "/placeholder2.png", // Replace with actual image
    description: "A premium e-commerce platform with advanced filtering, AR product preview, and seamless checkout experience.",
    technologies: ["Next.js", "Redux", "Node.js", "MongoDB", "Framer Motion"],
    link: "#",
    github: "#",
    featured: true,
    details: {
      challenge: "Build a high-performance e-commerce platform with advanced features while maintaining fast load times.",
      solution: "Leveraged Next.js for SSR and implemented lazy loading for images and components to optimize performance.",
      outcome: "Achieved 99/100 Lighthouse performance score and increased conversion rate by 25%."
    }
  },
  {
    id: "health-app",
    title: "VitalTrack",
    category: "Front-End",
    image: "/placeholder3.avif", // Replace with actual image
    description: "A health monitoring application with personalized insights and interactive progress visualization.",
    technologies: ["React Native", "Redux", "Firebase", "D3.js"],
    link: "#",
    github: "#",
    featured: true,
    details: {
      challenge: "Design an engaging mobile health app that motivates users to maintain healthy habits.",
      solution: "Created gamified experience with achievements, progress tracking, and personalized insights.",
      outcome: "Increased user retention by 60% and daily active usage by 45%."
    }
  },
  {
    id: "ai-assistant",
    title: "Echo AI Assistant",
    category: "CS Projects",
    image: "/placeholder4.jpg", // Replace with actual image
    description: "An AI-powered virtual assistant with natural language processing and personalized responses.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "WebSocket"],
    link: "#",
    github: "#",
    featured: false,
    details: {
      challenge: "Develop an AI assistant that can understand context and provide relevant responses.",
      solution: "Implemented NLP algorithms and machine learning models to process and respond to user queries.",
      outcome: "Achieved 85% accuracy in understanding user intent and 90% satisfaction rate."
    }
  },
  {
    id: "travel-planner",
    title: "Wanderlust",
    category: "UI/UX",
    image: "/placeholder5.jpg", // Replace with actual image
    description: "A smart travel planning application with itinerary generation and real-time weather updates.",
    technologies: ["React", "Node.js", "MongoDB", "Google Maps API", "OpenWeather API"],
    link: "#",
    github: "#",
    featured: false,
    details: {
      challenge: "Create a comprehensive travel planning tool that simplifies trip organization.",
      solution: "Designed an intuitive interface with drag-and-drop itinerary builder and integrated multiple APIs for real-time data.",
      outcome: "Reduced average trip planning time from 5 hours to 45 minutes."
    }
  },
  {
    id: "music-streaming",
    title: "WaveLab",
    category: "Web Dev",
    image: "/placeholder6.jpg", // Replace with actual image
    description: "A music streaming platform with personalized recommendations and social sharing features.",
    technologies: ["React", "Redux", "Node.js", "MongoDB", "Socket.io"],
    link: "#",
    github: "#",
    featured: false,
    details: {
      challenge: "Build a responsive music platform with minimal latency and personalized user experience.",
      solution: "Implemented advanced caching strategies and machine learning algorithms for recommendation engine.",
      outcome: "Achieved average page load time of under 2 seconds and 40% increase in user listening time."
    }
  }
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    text: "Dhirendra is exceptional at translating complex requirements into intuitive interfaces. His designs have significantly improved our user engagement metrics.",
    avatar: "/placeholder.svg" // Replace with actual image
  },
  {
    name: "Alex Chen",
    position: "CTO at StartupX",
    text: "Working with Dhirendra was a game-changer for our product. His technical expertise and design sensibility created an exceptional user experience.",
    avatar: "/placeholder.svg" // Replace with actual image
  },
  {
    name: "Maya Patel",
    position: "Frontend Lead at InnovateTech",
    text: "Dhirendra's code is as clean as his designs. His attention to detail and commitment to performance make him an invaluable team member.",
    avatar: "/placeholder.svg" // Replace with actual image
  }
];

export const education = [
  {
    degree: "Master of Computer Science",
    institution: "Stanford University",
    duration: "2014 - 2016",
    description: "Specialized in Human-Computer Interaction and User Experience Design. Thesis on 'Adaptive User Interfaces for Enhanced Digital Experiences'."
  },
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Technology, Delhi",
    duration: "2010 - 2014",
    description: "Graduated with honors. Focused on software development and interactive application design."
  }
];
