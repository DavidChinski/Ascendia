import { Button } from "@/components/ui/button";
import { Building, Wrench, Users, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const targetMarkets = [
    {
      icon: Wrench,
      title: "Empresas de Mantenimiento",
      description: "Socios ideales para instalación y servicio técnico continuo"
    },
    {
      icon: Building,
      title: "Constructoras",
      description: "Integración en nuevos proyectos de construcción y renovación"
    },
    {
      icon: Users,
      title: "Administraciones de Edificios",
      description: "Modernización y mejora de la experiencia del usuario"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Market Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 jandar-text-glow">
              Mercado Objetivo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dirigido a sectores clave con alta demanda de soluciones de accesibilidad y automatización
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {targetMarkets.map((market, index) => {
              const IconComponent = market.icon;
              return (
                <div key={index} className="jandar-card text-center group hover:scale-105">
                  <div className="inline-flex p-6 rounded-3xl bg-gradient-primary glow-primary mb-6 group-hover:animate-pulse-glow">
                    <IconComponent className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {market.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {market.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 jandar-text-glow">
              Contacto
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              ¿Interesado en revolucionar la experiencia de ascensores en tu edificio? 
              Contáctanos para una demostración personalizada.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-primary glow-primary">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold">contacto@jandar.tech</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-secondary glow-secondary">
                  <Phone className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="text-lg font-semibold">+34 900 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-primary glow-accent">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="text-lg font-semibold">Madrid, España</p>
                </div>
              </div>
            </div>
          </div>

          <div className="jandar-card">
            <h3 className="text-3xl font-bold mb-6 text-center jandar-text-glow">
              Solicita una Demo
            </h3>
            <form className="space-y-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Nombre completo"
                  className="w-full p-4 rounded-xl bg-input border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email corporativo"
                  className="w-full p-4 rounded-xl bg-input border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Empresa"
                  className="w-full p-4 rounded-xl bg-input border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={4}
                  className="w-full p-4 rounded-xl bg-input border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300 resize-none"
                ></textarea>
              </div>
              <Button 
                type="submit"
                className="w-full jandar-button text-lg py-6"
              >
                Enviar solicitud
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;