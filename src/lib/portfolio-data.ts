// Portfolio data that could be dynamically fetched
export interface Experience {
  title: string
  company: string
  location: string
  duration: string
  description: string[]
  technologies: string[]
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  features: string[]
  github: string
  live: string | null
  status: 'PRODUCTION' | 'BETA' | 'DEVELOPMENT'
}

export interface PortfolioData {
  experiences: Experience[]
  projects: Project[]
  skills: Record<string, string[]>
  contact: {
    email: string
    github: string
    linkedin: string
    location: string
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    experiences: [
      {
        title: "SENIOR FRONTEND ENGINEER",
        company: "LIMBER AS",
        location: "HELSINKI",
        duration: "[FEB 2025 - PRESENT]",
        description: [
          "LEADING DEVELOPMENT OF NEW FEATURES AND MAINTAINING CORE PLATFORM FUNCTIONALITY",
          "UTILIZING TYPESCRIPT, LIT.JS, AND MODERN BROWSER APIS FOR SCALABILITY AND PERFORMANCE",
          "COLLABORATING CROSS-FUNCTIONALLY TO DESIGN DOM-INTENSIVE FEATURES WITH FOCUS ON MAINTAINABILITY"
        ],
        technologies: ["TYPESCRIPT", "LIT.JS", "BROWSER APIS", "DOM MANIPULATION"]
      },
      {
        title: "FRONTEND DEVELOPER",
        company: "FIRETAIL.IO",
        location: "HELSINKI",
        duration: "[JUL 2023 - FEB 2025]",
        description: [
          "DEVELOPED AND MAINTAINED UI COMPONENTS USING REACT, TYPESCRIPT, TAILWIND, AND ANT DESIGN",
          "IMPLEMENTED AND MANAGED CI/CD PIPELINES WITH GITHUB ACTIONS AND AWS",
          "CONDUCTED COMPREHENSIVE TESTING USING JEST, CYPRESS, AND REACT TESTING LIBRARY",
          "CONTRIBUTED TO BACKEND DEVELOPMENT USING PYTHON"
        ],
        technologies: ["REACT", "TYPESCRIPT", "TAILWIND", "ANT DESIGN", "GITHUB ACTIONS", "AWS", "JEST", "CYPRESS", "PYTHON"]
      },
      {
        title: "SENIOR FULLSTACK DEVELOPER",
        company: "SAYDUCK",
        location: "HELSINKI",
        duration: "[JAN 2023 - JUL 2023]",
        description: [
          "ENHANCED E-COMMERCE 3D-WEB SOFTWARE WITH FOCUS ON BACKEND DEVELOPMENT",
          "DEVELOPED 3D MODEL VIEWER AND UI COMPONENTS USING REACT, TYPESCRIPT, AND THREE.JS",
          "ENSURED CODE QUALITY AND PERFORMANCE THROUGH RIGOROUS TESTING AND OPTIMIZATION"
        ],
        technologies: ["RUBY ON RAILS", "REACT", "TYPESCRIPT", "THREE.JS", "3D GRAPHICS"]
      },
      {
        title: "SOFTWARE DEVELOPER",
        company: "IZZ.AI",
        location: "MUNICH",
        duration: "[JAN 2022 - NOV 2022]",
        description: [
          "DEVELOPED FRONT-END SOLUTIONS FOR ENGEL & VÖLKERS REAL ESTATE PLATFORM",
          "UTILIZED REACT, TYPESCRIPT, NEXT.JS, AND MATERIAL UI FOR MODERN WEB EXPERIENCES"
        ],
        technologies: ["REACT", "TYPESCRIPT", "NEXT.JS", "MATERIAL UI"]
      },
      {
        title: "SOFTWARE DEVELOPER",
        company: "CORONATION",
        location: "STOCKHOLM",
        duration: "[FEB 2021 - JAN 2022]",
        description: [
          "BUILT AND REFINED REACT.JS COMPONENTS FOR IAMAI.SE PLATFORM",
          "CONVERTED WIREFRAMES TO USER INTERFACES AND IMPROVED FRONT-END INFRASTRUCTURE",
          "ENHANCED ROUTING AND OVERALL APPLICATION ARCHITECTURE"
        ],
        technologies: ["REACT", "REDUX", "JQUERY", "BOOTSTRAP"]
      },
      {
        title: "SOFTWARE DEVELOPER",
        company: "BEAMON PEOPLE (ALTEN SWEDEN)",
        location: "STOCKHOLM",
        duration: "[SEP 2019 - JAN 2021]",
        description: [
          "ENGAGED IN FULL-STACK DEVELOPMENT FROM INITIAL STACK DECISIONS TO PRODUCT LAUNCH",
          "UTILIZED MODERN WEB TECHNOLOGIES INCLUDING REACT, TYPESCRIPT, AND NEST.JS",
          "INVOLVED IN ALL DEVELOPMENT STAGES INCLUDING MAINTENANCE AND OPTIMIZATION"
        ],
        technologies: ["REACT", "TYPESCRIPT", "REDUX", "NEST.JS", "PYTHON", "CONTENTFUL CMS", "HTML5", "CSS3"]
      }
    ],
    projects: [
      {
        title: "PORTFOLIO WEBSITE",
        description: "MODERN PORTFOLIO WITH 3D ANIMATIONS AND SCROLL-TRIGGERED EFFECTS",
        technologies: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "FRAMER MOTION"],
        features: [
          "3D TEXT SCROLL ANIMATIONS",
          "RESPONSIVE DESIGN SYSTEM",
          "AUTOMATED CI/CD DEPLOYMENT"
        ],
        github: "https://github.com/ColemanSWE/portfolio",
        live: "https://colemanro.se",
        status: "PRODUCTION"
      },
      {
        title: "HSL LIVE TRACKER",
        description: "REAL-TIME HELSINKI PUBLIC TRANSPORT TRACKER WITH INTERACTIVE MAP",
        technologies: ["TYPESCRIPT", "LEAFLET", "MQTT", "SCSS"],
        features: [
          "LIVE VEHICLE TRACKING VIA MQTT",
          "INTERACTIVE MAP VISUALIZATION",
          "ROUTE & VEHICLE TYPE FILTERING"
        ],
        github: "https://github.com/ColemanSWE/hsl-live-tracker",
        live: "https://colemanswe.github.io/hsl-live-tracker/",
        status: "PRODUCTION"
      },
      {
        title: "SPOTIFY 3D ART GALLERY",
        description: "3D VIRTUAL GALLERY DISPLAYING USER'S TOP SPOTIFY ALBUMS AS TEXTURED ASSETS",
        technologies: ["REACT", "THREE.JS", "NODE.JS", "SPOTIFY API"],
        features: [
          "SPOTIFY OAUTH INTEGRATION",
          "3D ALBUM VISUALIZATION",
          "ALBUM COVER TEXTURES"
        ],
        github: "https://github.com/ColemanSWE/spotify-art-gallery",
        live: null,
        status: "DEVELOPMENT"
      }
    ],
    skills: {
      FRONTEND: [
        "REACT", "TYPESCRIPT", "JAVASCRIPT", "NEXT.JS", "REDUX", "HTML5", "CSS3", 
        "TAILWIND", "MATERIAL UI", "ANT DESIGN", "BOOTSTRAP", "LIT.JS", "THREE.JS"
      ],
      BACKEND: [
        "NODE.JS", "NEST.JS", "PYTHON", "RUBY ON RAILS", "GRAPHQL", "REST APIS"
      ],
      TESTING: [
        "JEST", "CYPRESS", "REACT TESTING LIBRARY"
      ],
      TOOLS: [
        "GIT", "GITHUB ACTIONS", "AWS", "CI/CD", "CONTENTFUL CMS", "BROWSER APIS"
      ]
    },
    contact: {
      email: "colemanrose.new@gmail.com",
      github: "https://github.com/colemanswe",
      linkedin: "https://linkedin.com/in/coleman-rose",
      location: "HELSINKI, FINLAND 🇫🇮"
    }
  }
}

// Dynamic metadata generation
export async function generatePortfolioMetadata(): Promise<{
  title: string
  description: string
  keywords: string
}> {
  const data = await getPortfolioData()
  const techStack = Object.values(data.skills).flat().slice(0, 10).join(', ')
  
  return {
    title: `COLEMAN ROSE // SENIOR SOFTWARE ENGINEER`,
    description: `Senior Software Engineer with ${data.experiences.length}+ years experience specializing in ${techStack}. Available for full-stack development and system architecture.`,
    keywords: `Coleman Rose, Senior Software Engineer, ${techStack}, Full Stack Developer, Helsinki, Finland`
  }
} 