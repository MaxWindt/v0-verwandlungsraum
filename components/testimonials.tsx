import { Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Die Kunsttherapie mit Rebecca hat mir geholfen, Gefühle auszudrücken, die ich nicht in Worte fassen konnte. Ein wunderbarer, sicherer Raum für Selbstentdeckung.",
      author: "Maria K.",
    },
    {
      id: 2,
      text: "Durch die Sitzungen habe ich gelernt, meine Emotionen besser zu verstehen und zu verarbeiten. Rebecca schafft eine Atmosphäre, in der man sich vollkommen öffnen kann.",
      author: "Thomas M.",
    },
    {
      id: 3,
      text: "Unsere Gruppentherapie war eine bereichernde Erfahrung. Die kreative Arbeit hat uns als Team näher zusammengebracht und individuelle Heilungsprozesse angestoßen.",
      author: "Claudia S., Gruppenleitung",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-400">Was andere sagen</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-accent/10 rounded-lg p-6 shadow-md border border-accent/20 relative"
              >
                <Quote className="absolute top-4 right-4 text-accent/30" size={40} />
                <p className="text-accent-foreground mb-6 relative z-10">"{testimonial.text}"</p>
                <p className="font-medium text-primary">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
