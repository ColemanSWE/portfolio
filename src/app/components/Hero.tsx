'use client'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="glitch mb-4" data-text="COLEMAN">
            COLEMAN
          </h1>
          <h1 className="glitch mb-8" data-text="ROSE">
            ROSE
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="brutal-border bg-yellow-400 px-6 py-3 font-bold text-lg tracking-widest">
              SENIOR
            </span>
            <span className="brutal-border bg-pink-400 px-6 py-3 font-bold text-lg tracking-widest">
              SOFTWARE
            </span>
            <span className="brutal-border bg-green-400 px-6 py-3 font-bold text-lg tracking-widest">
              ENGINEER
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#contact" className="brutal-button">
              INITIATE CONTACT
            </a>
            <a href="#projects" className="brutal-button secondary">
              VIEW WORK
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 