export default function Experience() {
  const experiences = [
    {
      title: "SENIOR FRONTEND ENGINEER",
      company: "LIMBER AS",
      duration: "[CURRENT]",
      description: [
        "ARCHITECTING SCALABLE WEB APPLICATIONS USING LIT, TYPESCRIPT, AND VANILLA CSS.",
      ],
      technologies: ["LIT", "TYPESCRIPT", "VANILLA CSS"]
    },
    {
      title: "FULL STACK DEVELOPER",
      company: "DIGITAL SOLUTIONS CORP",
      duration: "[2019-2023]",
      description: [
        "DEVELOPED RESPONSIVE WEB APPLICATIONS WITH MODERN JAVASCRIPT FRAMEWORKS",
        "INTEGRATED THIRD-PARTY APIS AND PAYMENT SYSTEMS",
        "COLLABORATED ON AGILE DEVELOPMENT TEAMS"
      ],
      technologies: ["JAVASCRIPT", "PYTHON", "DOCKER", "REDIS"]
    }
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-16">
          OPERATIONAL HISTORY
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="brutal-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold tracking-wide">{exp.title}</h3>
                <span className="brutal-border bg-red-400 px-3 py-1 text-sm font-bold">
                  {exp.duration}
                </span>
              </div>
              
              <div className="text-xl font-bold mb-4 tracking-wide">
                {exp.company}
              </div>
              
              <div className="space-y-2 mb-6">
                {exp.description.map((desc, i) => (
                  <p key={i} className="brutal-text text-sm">
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
        </div>
      </div>
    </section>
  )
} 