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
    github: "https://github.com/Dksingh566",
    linkedin: "https://www.linkedin.com/in/dhirendra-dk566/",
    twitter: "https://x.com/Dkraja566"
   
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
    role: "Front-End Developer",
    company: "Property Expert Realtor",
    duration: "May 2025 - Dec 2025",
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
    duration: "Jun 2020 - Feb 2022",
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
    title: "Budgetbuddy-Dashboard",
    category: "Web Dev",
    image: "/placeholder1.avif", // Replace with actual image
    description: "A comprehensive financial tracking dashboard with intuitive data visualization and real-time updates.",
    technologies: ["React", "TypeScript", "GSAP", "Chart.js", "Tailwind CSS"],
    link: "https://budgetbuddy2.netlify.app/auth/login",
    github: "https://github.com/Dksingh566/Budgetbuddy-.git",
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
    technologies: ["HTML5", "TailwindCSS", "Node.js", "MongoDB", ],
    link: "#",
    github: "https://github.com/Dksingh566/ecommerce-website-front-end.git",
    featured: true,
    details: {
      challenge: "Build a high-performance e-commerce platform with advanced features while maintaining fast load times.",
      solution: "Leveraged Next.js for SSR and implemented lazy loading for images and components to optimize performance.",
      outcome: "Achieved 99/100 Lighthouse performance score and increased conversion rate by 25%."
    }
  },
  {
    id: "music-dashboard",
title: "Beat",
category: "Full-Stack",
image: "/placeholder3.avif", // Replace with actual image
description: "A dynamic music dashboard with seamless streaming, playlist management, and real-time recommendations.",
technologies: ["React", "TypeScript", "TailwindCSS", "Node.js", "MongoDB"],
link: "https://beat-dashboard.netlify.app/",
github: "https://github.com/Dksingh566/Beat.git",
featured: true,
details: {
  challenge: "Develop an interactive music dashboard with a smooth user experience and real-time recommendations.",
  solution: "Built a responsive UI with React, integrated a recommendation system, and optimized streaming performance.",
  outcome: "Enhanced user engagement by 70% and improved playback efficiency by 50%."
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
    id: "plant-selling",
    title: "Plant.io",
    category: "UI/UX",
    image: "/placeholder5.jpg", // Replace with actual image
    description: "A plant-selling platform designed to promote greenery and environmental awareness through a seamless shopping experience.",
    technologies: ["Figma", "UI/UX Design", "Prototyping"],
    link: "https://www.figma.com/design/kOFsRtTwfisAje8C8ZikPD/Plant.com?node-id=0-1&t=vWt2mDDJqABNO8nR-1",
    github: "https://www.figma.com/design/kOFsRtTwfisAje8C8ZikPD/Plant.com?node-id=0-1&t=vWt2mDDJqABNO8nR-1",
    featured: true,
    details: {
      challenge: "Design a user-friendly plant marketplace that encourages people to buy and plant more greenery.",
      solution: "Created an engaging UI with interactive plant categories, eco-friendly tips, and a simple checkout process.",
      outcome: "Enhanced user engagement with an intuitive design, making plant shopping easy and enjoyable."
    }
},
  {
    id: "portfolio",
    title: "Dk-portfolio",
    category: "Web Dev",
    image: "/placeholder6.jpg", // Replace with actual image
    description: "A personal portfolio showcasing projects, skills, and experience in full-stack development and UI/UX design.",
    technologies: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    link: "https://dk566-portfolio.netlify.app/",
    github: "https://github.com/Dksingh566/dk-portfolio.git",
    featured: true,
    details: {
      challenge: "Create a visually appealing and fast-loading portfolio to highlight skills and attract potential clients/employers.",
      solution: "Designed an interactive UI with smooth animations, optimized performance, and integrated a blog section.",
      outcome: "Improved engagement by 80%, increased portfolio visits, and received multiple job inquiries."
    }
},
  // Add more projects as needed
  {
    id: "startupx",
    title: "StartupX",
    category: "Front-End",
    image: "/placeholder.jpg", // Replace with actual image
    description: "A dynamic startup landing page designed to attract investors and early adopters with a modern UI and engaging content.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
    github: "#",
    featured: true,
    details: {
      challenge: "Create a visually appealing and high-performing landing page that effectively communicates the startup's vision and attracts investors.",
      solution: "Designed a clean and modern UI with responsive components, smooth animations, and optimized SEO strategies for better reach.",
      outcome: "Improved user engagement by 50% and increased conversion rates by 35% through an interactive and intuitive design."
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
