import { Mail, Github, Linkedin, MapPin } from 'lucide-react'

export default function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "info@colemanro.se",
      href: "mailto:info@colemanro.se"
    },
    {
      icon: Github,
      label: "GITHUB",
      value: "github.com/colemanswe",
      href: "https://github.com/colemanswe"
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      value: "linkedin.com/in/coleman-rose",
      href: "https://linkedin.com/in/coleman-rose"
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "HELSINKI, FINLAND 🇫🇮",
      href: null
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-16">
          ESTABLISH CONNECTION
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="portfolio-card text-center mb-12">
            <div className="portfolio-text mb-6">
              READY TO ARCHITECT YOUR NEXT DIGITAL SOLUTION?
            </div>
            <div className="portfolio-text text-sm">
              AVAILABLE FOR FULL-TIME POSITIONS, CONTRACT WORK, AND CONSULTANCY.
              SPECIALIZING IN REACT ECOSYSTEMS AND SCALABLE BACKEND ARCHITECTURES.
            </div>
          </div>
          
          <div className="portfolio-grid">
            {contacts.map((contact, index) => {
              const IconComponent = contact.icon
              return (
                <div key={index} className="portfolio-card text-center">
                  <div className="flex justify-center mb-4">
                    <div className="portfolio-border bg-blue-400 p-4">
                      <IconComponent size={32} />
                    </div>
                  </div>
                  <div className="font-bold mb-2 tracking-wide">
                    {contact.label}
                  </div>
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      className="portfolio-text text-sm hover:underline break-all"
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <div className="portfolio-text text-sm break-all">
                      {contact.value}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <a href="mailto:info@colemanro.se" className="portfolio-button text-lg">
              SEND MESSAGE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 