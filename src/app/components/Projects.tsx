import { ExternalLink, Github } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: "E-COMMERCE PLATFORM",
      description: "FULL-STACK E-COMMERCE SOLUTION WITH MICROSERVICES ARCHITECTURE",
      technologies: ["REACT", "NODE.JS", "POSTGRESQL", "AWS"],
      features: [
        "REAL-TIME INVENTORY MANAGEMENT",
        "PAYMENT GATEWAY INTEGRATION", 
        "ADMIN DASHBOARD WITH ANALYTICS"
      ],
      github: "https://github.com/coleman-rose/ecommerce-platform",
      live: "https://ecommerce-demo.coleman-rose.dev",
      status: "PRODUCTION"
    },
    {
      title: "TASK MANAGEMENT SYSTEM",
      description: "COLLABORATIVE PROJECT MANAGEMENT TOOL WITH REAL-TIME UPDATES",
      technologies: ["TYPESCRIPT", "REACT", "SOCKET.IO", "MONGODB"],
      features: [
        "REAL-TIME COLLABORATION",
        "DRAG-AND-DROP INTERFACE",
        "ADVANCED FILTERING & SEARCH"
      ],
      github: "https://github.com/coleman-rose/task-manager",
      live: "https://tasks.coleman-rose.dev",
      status: "BETA"
    },
    {
      title: "API GATEWAY SERVICE",
      description: "MICROSERVICES API GATEWAY WITH RATE LIMITING & AUTHENTICATION",
      technologies: ["NODE.JS", "REDIS", "DOCKER", "KUBERNETES"],
      features: [
        "RATE LIMITING & THROTTLING",
        "JWT AUTHENTICATION",
        "REQUEST/RESPONSE LOGGING"
      ],
      github: "https://github.com/coleman-rose/api-gateway",
      live: null,
      status: "DEVELOPMENT"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRODUCTION': return 'bg-green-400'
      case 'BETA': return 'bg-yellow-400'
      case 'DEVELOPMENT': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-16">
          DEPLOYED SYSTEMS
        </h2>
        
        <div className="brutal-grid max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="brutal-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold tracking-wide">{project.title}</h3>
                <span className={`brutal-border ${getStatusColor(project.status)} px-3 py-1 text-sm font-bold`}>
                  {project.status}
                </span>
              </div>
              
              <p className="brutal-text text-sm mb-6">
                {project.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-bold mb-2 tracking-wide">KEY FEATURES:</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-sm font-bold">
                      → {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={project.github} 
                  className="brutal-button text-sm flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  CODE
                </a>
                {project.live && (
                  <a 
                    href={project.live} 
                    className="brutal-button secondary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    LIVE
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 