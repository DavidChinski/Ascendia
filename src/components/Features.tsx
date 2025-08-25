import { Mic, Zap, Users, Shield, Brain, Accessibility } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Mic,
      title: "Control por Voz",
      description: "Interacción natural mediante comandos de voz para solicitar pisos y obtener información.",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Brain,
      title: "Inteligencia Artificial",
      description: "Aprende patrones de uso y optimiza el flujo de transporte para máxima eficiencia.",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Accessibility,
      title: "Accesibilidad Universal",
      description: "Diseñado para personas con movilidad reducida, limitaciones visuales o manos ocupadas.",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Zap,
      title: "Instalación Rápida",
      description: "Compatible con la mayoría de ascensores existentes, sin necesidad de reemplazos costosos.",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Users,
      title: "Personalización",
      description: "Configuraciones específicas para edificios residenciales, corporativos y comerciales.",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Shield,
      title: "Confiabilidad",
      description: "Tecnología robusta con servicio postventa y soporte técnico continuo.",
      gradient: "bg-gradient-secondary"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="jandar-text-glow">Características</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tecnología avanzada que transforma la experiencia de usar ascensores, 
            combinando innovación con accesibilidad universal.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="jandar-card group hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex p-4 rounded-2xl ${feature.gradient} glow-primary mb-6 group-hover:animate-pulse-glow`}>
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="jandar-card inline-block">
            <h3 className="text-3xl font-bold mb-4 jandar-text-glow">
              ¿Listo para modernizar tus ascensores?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contacta con nosotros para una demostración personalizada
            </p>
            <button className="jandar-button">
              Solicitar información
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;