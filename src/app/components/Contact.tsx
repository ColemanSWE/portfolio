import { Mail, Github, Linkedin, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "coleman.rose@example.com",
      href: "mailto:coleman.rose@example.com"
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
          <div className="brutal-card text-center mb-12">
            <div className="brutal-text mb-6">
              READY TO ARCHITECT YOUR NEXT DIGITAL SOLUTION?
            </div>
            <div className="brutal-text text-sm">
              AVAILABLE FOR FULL-TIME POSITIONS, CONTRACT WORK, AND CONSULTANCY.
              SPECIALIZING IN REACT ECOSYSTEMS AND SCALABLE BACKEND ARCHITECTURES.
            </div>
          </div>
          
          <div className="brutal-grid">
            {contacts.map((contact, index) => {
              const IconComponent = contact.icon
              return (
                <div key={index} className="brutal-card text-center">
                  <div className="flex justify-center mb-4">
                    <div className="brutal-border bg-blue-400 p-4">
                      <IconComponent size={32} />
                    </div>
                  </div>
                  <div className="font-bold mb-2 tracking-wide">
                    {contact.label}
                  </div>
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      className="brutal-text text-sm hover:underline"
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <div className="brutal-text text-sm">
                      {contact.value}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <a href="mailto:colemanrose.new@gmail.com" className="brutal-button text-lg">
              SEND MESSAGE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 