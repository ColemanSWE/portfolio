export default function Skills() {
  const skills = {
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
  }

  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-16">
          TECHNICAL ARSENAL
        </h2>
        
        <div className="portfolio-grid max-w-6xl mx-auto">
          {Object.entries(skills).map(([category, skillList], index) => (
            <div key={index} className="portfolio-card">
              <h3 className="text-2xl font-bold mb-6 tracking-wide text-center">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillList.map((skill, i) => (
                  <span key={i} className="tech-tag">
                    {skill}
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