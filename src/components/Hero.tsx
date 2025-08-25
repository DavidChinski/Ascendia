import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-background"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-12 animate-float">
            <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-gradient-card border border-primary/20 glow-primary">
              <img 
                src="/lovable-uploads/e06ad9bf-7b05-43c9-98a4-5703c916ee2c.png" 
                alt="Jandar Logo" 
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="jandar-text-glow">JANDAR</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-light mb-8 text-muted-foreground">
            Asistencia Inteligente para Ascensores
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Control por voz e inteligencia artificial que revoluciona la experiencia en ascensores, 
            brindando <span className="text-primary font-semibold">accesibilidad</span> y <span className="text-accent font-semibold">comodidad</span> para todos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="jandar-button text-xl px-12 py-6"
            >
              Conocer más
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-xl px-12 py-6 border-primary/30 hover:border-primary hover:bg-primary/10 hover:glow-primary"
            >
              Ver demostración
            </Button>
          </div>

          {/* Tagline */}
          <p className="text-primary text-xl font-medium">
            "Moverse entre pisos nunca fue tan simple."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;