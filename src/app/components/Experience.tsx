'use client'

import { useState } from 'react'

export default function Experience() {
  const experiences = [
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
  ]

  const [showAll, setShowAll] = useState(false)
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3)

  return (
    <section id="experience" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-16">
          OPERATIONAL HISTORY
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {visibleExperiences.map((exp, index) => (
            <div key={index} className="portfolio-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold tracking-wide">{exp.title}</h3>
                <span className="portfolio-border bg-red-400 px-3 py-1 text-sm font-bold">
                  {exp.duration}
                </span>
              </div>
              
              <div className="text-xl font-bold mb-4 tracking-wide">
                {exp.company}{exp.location && ` • ${exp.location}`}
              </div>
              
              <div className="space-y-2 mb-6">
                {exp.description.map((desc, i) => (
                  <p key={i} className="portfolio-text text-sm">
                    {desc}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          {experiences.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="portfolio-border bg-yellow-400 px-6 py-3 text-lg font-bold hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                {showAll ? 'SHOW LESS ▲' : `SHOW MORE (${experiences.length - 3} MORE POSITIONS) ▼`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 