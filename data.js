/**
 * PORTFOLIO DATA CONFIGURATION
 * Nethra Shree SD - B.Tech Artificial Intelligence and Machine Learning
 * SRM Institute of Science and Technology, Ramapuram Campus, Chennai
 * 
 * Single Source of Truth for personal information, social links,
 * education, skills, projects, and interests.
 */

const PORTFOLIO_DATA = {
  personal: {
    fullName: "Nethra Shree SD",
    shortName: "Nethra",
    eyebrow: "AI/ML STUDENT · DEVELOPER IN PROGRESS",
    heading: "Hi, I'm Nethra Shree SD.",
    animatedHeadlines: [
      "Curious Mind. Technical Thinker. Lifelong Learner.",
      "Exploring Artificial Intelligence",
      "Building Technical Skills",
      "Turning Curiosity Into Code",
      "Learning, Creating, Improving"
    ],
    tagline: "B.Tech Student | Artificial Intelligence & Machine Learning | Lifelong Learner",
    institution: "SRM Institute of Science and Technology, Ramapuram, Chennai",
    institutionShort: "SRMIST Ramapuram",
    degree: "B.Tech in Artificial Intelligence and Machine Learning",
    batch: "2026–2030",
    academicStatus: "First-Year Undergraduate",
    school: "DAV Girls Senior Secondary School, Gopalapuram, Chennai",
    bioDescription: "I'm an Artificial Intelligence and Machine Learning student at SRM Ramapuram with a passion for technology, problem-solving, debating, and exploring new ideas through books. I enjoy communicating ideas, learning new technical concepts, and challenging myself to grow every day.",
    aboutNarrative: "I'm a first-year B.Tech AI & ML student at SRM Ramapuram, fascinated by the intersection of technology, logic, and human creativity. Beyond academics, I enjoy reading books, debating ideas, and communicating with people. I believe that curiosity, consistency, and the willingness to learn are essential to personal and technical growth. I'm currently developing my programming skills and exploring the foundations of artificial intelligence.",
    email: "nebula8002@gmail.com",
    phone: "+91 8248989393",
    phoneRaw: "+918248989393",
    location: "Chennai, Tamil Nadu, India",
    resumePdfPath: "assets/Nethra_Shree_SD_Resume.pdf",
    avatarPath: "assets/images/profile-avatar.jpg"
  },

  socialLinks: {
    github: {
      url: "https://github.com/nebula8002-lab",
      label: "GitHub",
      handle: "nebula8002-lab"
    },
    linkedin: {
      url: "https://www.linkedin.com/in/nethra-shree-834053423?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      label: "LinkedIn",
      handle: "nethra-shree"
    },
    leetcode: {
      url: "https://leetcode.com/u/nethrashree",
      label: "LeetCode",
      handle: "nethrashree"
    },
    instagram: {
      url: "https://www.instagram.com/nebula.yes?stkn=MW5nNjU4c2dpdDd4OA==",
      label: "Instagram",
      handle: "@nebula.yes"
    },
    email: {
      url: "mailto:nebula8002@gmail.com",
      label: "Email",
      display: "nebula8002@gmail.com"
    },
    phone: {
      url: "tel:+918248989393",
      label: "Phone",
      display: "+91 8248989393"
    }
  },

  aboutHighlights: [
    {
      id: "curiosity",
      icon: "compass",
      title: "Curiosity",
      subtitle: "Inquisitive Mindset",
      description: "Always exploring new concepts and perspectives. Driven by an innate desire to understand the underlying principles behind complex systems, from algorithmic logic to human cognition.",
      tags: ["Continuous Exploration", "First Principles", "Analytical Inquiry"]
    },
    {
      id: "communication",
      icon: "message-circle",
      title: "Communication",
      subtitle: "Articulate Dialogue",
      description: "Enjoying debates, discussions, and expressing ideas clearly. Firmly believing that groundbreaking technical solutions require empathetic, persuasive, and transparent communication.",
      tags: ["Debating", "Public Speaking", "Persuasive Dialogue"]
    },
    {
      id: "technology",
      icon: "cpu",
      title: "Technology",
      subtitle: "AI/ML Focus",
      description: "Building programming fundamentals and exploring AI/ML. Developing disciplined problem-solving methodologies to tackle real challenges through computing and mathematical logic.",
      tags: ["Artificial Intelligence", "Algorithmic Thinking", "Code Foundations"]
    }
  ],

  skills: {
    technicalInterests: [
      {
        name: "Artificial Intelligence",
        category: "Focus Area",
        desc: "Foundational theory, cognitive paradigms, and intelligent system architectures."
      },
      {
        name: "Machine Learning",
        category: "Focus Area",
        desc: "Supervised and unsupervised learning principles, mathematical logic, and data analysis."
      },
      {
        name: "Programming",
        category: "Core Discipline",
        desc: "Structured computational logic, control flow, functions, and memory management."
      },
      {
        name: "Problem-Solving",
        category: "Analytical",
        desc: "Deconstructing multifaceted challenges into structured, testable algorithmic steps."
      },
      {
        name: "Computational Thinking",
        category: "Methodology",
        desc: "Pattern recognition, abstraction, modular decomposition, and algorithmic design."
      }
    ],

    programming: [
      {
        name: "C Programming",
        level: "Beginner-level foundation",
        badge: "Active University Coursework",
        desc: "First-year foundation covering data types, control flow, loops, arrays, functions, pointers, and memory layout. Focused on building low-level comprehension before high-level abstractions.",
        isFoundation: true
      },
      {
        name: "Upcoming Languages & Frameworks",
        level: "Curriculum Progression",
        badge: "Scheduled for Upcoming Semesters",
        desc: "Python for AI/ML, C++, Object-Oriented Programming, and Machine Learning toolkits will be updated here as university curriculum and practical lab coursework progress.",
        isFoundation: false,
        isUpcoming: true
      }
    ],

    professionalSkills: [
      {
        name: "Communication",
        focus: "Clarity & Empathy",
        desc: "Synthesizing complex technical themes into lucid, accessible dialogue for both technical and non-technical audiences."
      },
      {
        name: "Debating & Public Speaking",
        focus: "Rhetorical Confidence",
        desc: "Structured argument construction, poise under scrutiny, critical questioning, and engaging audience delivery."
      },
      {
        name: "Critical Thinking",
        focus: "Evidence & Logic",
        desc: "Scrutinizing assumptions, analyzing counterarguments, and evaluating trade-offs in technical and intellectual pursuits."
      },
      {
        name: "Collaboration",
        focus: "Team Dynamics",
        desc: "Active listening, constructive feedback integration, intellectual humility, and shared goal accomplishment."
      },
      {
        name: "Continuous Learning",
        focus: "Lifelong Habit",
        desc: "Curating study routines, embracing academic challenges, and proactively acquiring knowledge beyond standard requirements."
      }
    ]
  },

  projects: {
    sectionHeading: "Things I'm Exploring",
    sectionSubtitle: "An authentic showcase of first-year foundations and modular architectures ready to expand as semester projects and AI research evolve.",
    placeholderNotice: "I am currently building my technical foundation and exploring opportunities to apply my learning through practical projects. This section showcases my foundational explorations and provides the standardized framework where semester mini-projects, C programs, and AI/ML experiments will be published.",
    items: [
      {
        id: "proj-1",
        title: "C Algorithmic Problem Solving & Data Structures",
        status: "Curriculum Foundation · Active",
        badge: "First-Year Lab Foundation",
        category: "Programming & Data Structures",
        shortDescription: "Foundational implementations in C exploring arrays, pointers, memory addressing, string algorithms, and algorithmic complexity.",
        problemStatement: "Mastering procedural memory allocation, pointer arithmetic, and algorithmic execution efficiency at the hardware level.",
        technologies: ["C Language", "GCC", "GDB Debugger", "CLI"],
        keyLearnings: "Pointer mechanics, stack vs heap allocation, time complexity profiling, and edge-case boundary testing.",
        githubUrl: "https://github.com/nebula8002-lab",
        demoUrl: null,
        isPlaceholder: false
      },
      {
        id: "proj-2",
        title: "Neural Network Mathematical Foundations & Search Visualizer",
        status: "Concept & Academic Exploration",
        badge: "AI/ML Theory in Progress",
        category: "Artificial Intelligence",
        shortDescription: "Exploring graph search heuristics (A*, BFS/DFS) and vector operations that underpin modern deep learning architectures.",
        problemStatement: "Understanding how discrete search graphs, gradient descent calculus, and matrix dot products form the core of intelligent systems.",
        technologies: ["Discrete Math", "Graph Algorithms", "Linear Algebra", "Python/C Logic"],
        keyLearnings: "Cost function minimization, heuristic admissibility, and matrix transformation intuition.",
        githubUrl: "https://github.com/nebula8002-lab",
        demoUrl: null,
        isPlaceholder: true
      },
      {
        id: "proj-3",
        title: "Speech & Debate Argument Structuring Assistant",
        status: "Concept Exploration",
        badge: "Interdisciplinary Exploration",
        category: "NLP & Communication",
        shortDescription: "A conceptual framework combining debate rhetoric structures with natural language processing heuristics for argument analysis.",
        problemStatement: "Synthesizing classical debating frameworks (Claim, Evidence, Warrant, Impact) with text classification heuristics.",
        technologies: ["Computational Linguistics", "Argument Theory", "Heuristic Rules"],
        keyLearnings: "Deconstructing speech rhetoric into structured logic trees for objective debate evaluation.",
        githubUrl: "https://github.com/nebula8002-lab",
        demoUrl: null,
        isPlaceholder: true
      }
    ]
  },

  education: [
    {
      period: "2026–2030",
      type: "Undergraduate Degree",
      institution: "SRM Institute of Science and Technology, Ramapuram Campus",
      degree: "B.Tech in Artificial Intelligence and Machine Learning",
      location: "Ramapuram, Chennai, Tamil Nadu, India",
      status: "First Year · Currently Enrolled",
      badge: "Batch 2026–2030",
      description: "Rigorous undergraduate engineering program centered on machine learning algorithms, artificial intelligence paradigms, computational mathematics, and software design.",
      highlights: [
        "First-year core focus: Problem Solving, Programming in C, and Pre-Engineering Mathematics",
        "Active cohort member engaging in technical student initiatives and campus academic forums",
        "Framework structured to document semester CGPA, laboratory milestones, and research papers as completed"
      ],
      isCurrent: true
    },
    {
      period: "Secondary & Higher Secondary",
      type: "School Education",
      institution: "DAV Girls Senior Secondary School",
      degree: "Secondary & Senior Secondary Certification",
      location: "Gopalapuram, Chennai, Tamil Nadu, India",
      status: "Completed",
      badge: "Alma Mater",
      description: "Renowned institution celebrated for scholastic rigor, mathematical foundations, cultural values, and disciplined character development.",
      highlights: [
        "Comprehensive training in mathematics, physics, chemistry, and literary articulation",
        "Active participation in debating, elocution, public speaking, and school literary activities",
        "Cultivated enduring habits of intellectual curiosity, disciplined study, and ethical responsibility"
      ],
      isCurrent: false
    }
  ],

  interests: [
    {
      id: "reader",
      role: "The Reader",
      icon: "book-open",
      quote: "Reading books, discovering new perspectives, and learning through stories and ideas.",
      narrative: "I enjoy reading books, discovering new perspectives, and learning through stories and ideas. Literature and analytical non-fiction serve as my primary avenue for cognitive enrichment, deep focus, and ethical contemplation.",
      tags: ["Literature", "Philosophy", "Cognitive Sciences", "Scientific Biographies"]
    },
    {
      id: "debater",
      role: "The Debater",
      icon: "mic",
      quote: "Exploring different viewpoints, building arguments, and communicating ideas confidently.",
      narrative: "I enjoy exploring different viewpoints, building arguments, and communicating ideas confidently. Debating trains the mind to anticipate counterarguments, dissect logical fallacies, and speak with poise under pressure.",
      tags: ["Parliamentary Debate", "Rhetorical Logic", "Public Discourse", "Elocution"]
    },
    {
      id: "technologist",
      role: "The Curious Technologist",
      icon: "terminal",
      quote: "Understanding how technology works and how AI can solve meaningful problems.",
      narrative: "I'm interested in understanding how technology works and how AI can solve meaningful problems. Driven by an aspiration to combine mathematical rigor with human-centric solutions that improve society.",
      tags: ["AI Ethics", "Machine Intelligence", "System Design", "Algorithmic Logic"]
    }
  ],

  resume: {
    heading: "Want to Know More About Me?",
    subtitle: "Explore my education, skills, interests, and professional journey in a clean, standard academic format.",
    downloadLabel: "Download My Resume (PDF)",
    viewLabel: "Open Resume in New Tab",
    fileName: "Nethra_Shree_SD_Resume.pdf",
    filePath: "assets/Nethra_Shree_SD_Resume.pdf",
    fileSizeDisplay: "~2.5 KB (Self-Contained PDF)",
    lastUpdated: "Academic Year 2026",
    sectionsIncluded: [
      "Contact Details & Verified Professional Links",
      "Academic Timeline (SRMIST Ramapuram & DAV Girls SSS)",
      "Technical Foundations (C Programming, Computational Thinking)",
      "Core Strengths (Communication, Debating, Problem-Solving)",
      "Interests & Personal Development Philosophy"
    ]
  }
};

// Expose on global window object
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
