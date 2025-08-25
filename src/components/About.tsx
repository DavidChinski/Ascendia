import { Target, Zap, Brain } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rotate-45 rounded-3xl"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-10 w-2 h-32 bg-gradient-primary rounded-full transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          
          {/* Problem Statement */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              <span className="jandar-text-glow">¿POR QUÉ</span>
              <br />
              <span className="text-muted-foreground">ASCENDIA?</span>
            </h2>
            <div className="text-2xl md:text-3xl text-accent font-light max-w-3xl mx-auto leading-relaxed">
              Porque presionar botones en 2024 es como usar un fax para enviar emails
            </div>
          </div>

          {/* Core Values - Diagonal Layout */}
          <div className="grid lg:grid-cols-3 gap-12 mb-24">
            
            {/* Innovation */}
            <div className="group transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-card border border-primary/20 rounded-3xl p-8 group-hover:glow-primary">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 group-hover:animate-pulse-glow">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 jandar-text-glow">Innovación</h3>
                <p className="text-muted-foreground">
                  IA que aprende de ti, se adapta a patrones y optimiza cada viaje.
                </p>
              </div>
            </div>

            {/* Speed */}
            <div className="group transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-card border border-accent/20 rounded-3xl p-8 group-hover:glow-accent">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-2xl mb-6 group-hover:animate-pulse-glow">
                  <Zap className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 jandar-text-glow">Velocidad</h3>
                <p className="text-muted-foreground">
                  Instalación en horas, no días. Compatible con el 95% de ascensores.
                </p>
              </div>
            </div>

            {/* Precision */}
            <div className="group transform lg:-rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-card border border-secondary/20 rounded-3xl p-8 group-hover:glow-secondary">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 group-hover:animate-pulse-glow">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 jandar-text-glow">Precisión</h3>
                <p className="text-muted-foreground">
                  Reconocimiento de voz perfecto, incluso en ambientes ruidosos.
                </p>
              </div>
            </div>
          </div>

          {/* mission Statement */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-card border border-primary/20 rounded-3xl p-12 glow-primary">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 jandar-text-glow">
                  Nuestra Misión
                </h3>
                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  Hacer que <span className="text-primary font-semibold">cada persona</span>, 
                  sin importar sus limitaciones físicas, pueda moverse libremente entre pisos 
                  con solo su voz. <span className="text-accent font-semibold">Tecnología inclusiva</span> 
                  que no discrimina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;