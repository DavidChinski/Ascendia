import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Mission, Vision, Values */}
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          <div className="jandar-card text-center group hover:glow-primary">
            <div className="inline-flex p-6 rounded-3xl bg-gradient-primary glow-primary mb-8 group-hover:animate-pulse-glow">
              <Target className="w-12 h-12 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-6 jandar-text-glow">Misión</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Facilitar y modernizar el uso de ascensores mediante control por voz e inteligencia artificial, 
              brindando accesibilidad y comodidad a todos los usuarios.
            </p>
          </div>

          <div className="jandar-card text-center group hover:glow-secondary">
            <div className="inline-flex p-6 rounded-3xl bg-gradient-secondary glow-secondary mb-8 group-hover:animate-pulse-glow">
              <Eye className="w-12 h-12 text-secondary-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-6 jandar-text-glow">Visión</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Convertirse en el estándar mundial de interacción inteligente con ascensores, 
              integrando IA en edificios de todo tipo para una experiencia más enriquecedora y eficiente.
            </p>
          </div>

          <div className="jandar-card text-center group hover:glow-accent">
            <div className="inline-flex p-6 rounded-3xl bg-gradient-primary glow-accent mb-8 group-hover:animate-pulse-glow">
              <Heart className="w-12 h-12 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-6 jandar-text-glow">Valores</h3>
            <div className="text-muted-foreground leading-relaxed text-lg space-y-2">
              <p><span className="text-primary font-semibold">Innovación:</span> Soluciones tecnológicas avanzadas</p>
              <p><span className="text-accent font-semibold">Accesibilidad:</span> Sin barreras para ningún usuario</p>
              <p><span className="text-secondary font-semibold">Eficiencia:</span> Optimización de recursos y tiempos</p>
              <p><span className="text-primary font-semibold">Compromiso:</span> Calidad y servicio postventa</p>
            </div>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 jandar-text-glow">
              El Problema
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Millones de personas enfrentan diariamente barreras de accesibilidad al usar ascensores tradicionales:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  Personas con movilidad reducida que luchan con botones físicos
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  Usuarios con manos ocupadas o carga pesada
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3">•</span>
                  Personas con limitaciones visuales que requieren asistencia
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">•</span>
                  Flujo ineficiente en edificios de alta demanda
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-5xl font-bold mb-8 jandar-text-glow">
              Nuestra Solución
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                <span className="text-primary font-bold text-2xl">Jandar</span> revoluciona la experiencia con ascensores mediante:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  Control por voz natural e intuitivo
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">✓</span>
                  Inteligencia artificial que aprende y optimiza
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3">✓</span>
                  Instalación simple en ascensores existentes
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">✓</span>
                  Accesibilidad universal sin excepciones
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;