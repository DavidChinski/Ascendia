import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, ArrowUp } from "lucide-react";

const InteractiveDemo = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [targetFloor, setTargetFloor] = useState(1);
  const [voiceCommand, setVoiceCommand] = useState("");
  
  const voiceCommands = [
    "Piso 5, por favor",
    "Llévame a la azotea", 
    "Bajar al garaje",
    "Oficinas, piso 12"
  ];

  useEffect(() => {
    if (isListening) {
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      const timer = setTimeout(() => {
        setVoiceCommand(randomCommand);
        const floor = Math.floor(Math.random() * 15) + 1;
        setTargetFloor(floor);
        setIsListening(false);
        
        // Simulate elevator movement
        setTimeout(() => {
          setCurrentFloor(floor);
          setVoiceCommand("¡Llegamos! Puertas abriéndose...");
        }, 2000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isListening]);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute inset-0 bg-gradient-background"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 transform -skew-y-6"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 jandar-text-glow">
            DEMO LIVE
          </h2>
          <p className="text-2xl text-accent">
            Experimenta el futuro ahora mismo
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Elevator Simulator */}
          <div className="relative">
            <div className="bg-gradient-card border border-primary/20 rounded-3xl p-8 glow-primary">
              
              {/* Elevator Display */}
              <div className="text-center mb-8">
                <div className="text-6xl font-black jandar-text-glow mb-4">
                  {currentFloor}
                </div>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <span>Piso actual</span>
                  {currentFloor !== targetFloor && (
                    <>
                      <ArrowUp className={`w-5 h-5 animate-bounce ${currentFloor < targetFloor ? 'text-primary' : 'text-secondary rotate-180'}`} />
                      <span className="text-accent font-semibold">→ {targetFloor}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Voice Command Display */}
              <div className="bg-background/50 rounded-2xl p-6 mb-8 min-h-[80px] flex items-center justify-center">
                <p className="text-lg text-center">
                  {voiceCommand || "Di algo como: 'Piso 5, por favor'"}
                </p>
              </div>

              {/* Voice Button */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setIsListening(!isListening);
                    if (!isListening) {
                      setVoiceCommand("");
                    }
                  }}
                  className={`relative p-8 rounded-full transition-all duration-300 ${
                    isListening 
                      ? 'bg-gradient-secondary glow-secondary animate-pulse-glow' 
                      : 'bg-gradient-primary glow-primary hover:scale-110'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-12 h-12 text-secondary-foreground" />
                  ) : (
                    <Mic className="w-12 h-12 text-primary-foreground" />
                  )}
                  
                  {isListening && (
                    <div className="absolute inset-0 rounded-full border-4 border-secondary animate-ping"></div>
                  )}
                </button>
                
                <p className="mt-4 text-sm text-muted-foreground">
                  {isListening ? "Escuchando..." : "Toca para hablar"}
                </p>
              </div>
            </div>
            
            {/* Sound Wave Visualization */}
            {isListening && (
              <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 bg-gradient-secondary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 60 + 20}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.8s'
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Features Showcase */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-primary rounded-full"></div>
              <div className="pl-8 space-y-12">
                
                <div className="group">
                  <div className="flex items-center space-x-4 mb-3">
                    <Volume2 className="w-8 h-8 text-primary group-hover:animate-bounce" />
                    <h3 className="text-2xl font-bold">Reconocimiento Natural</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Entiende tu voz en cualquier idioma, acento o tono. 
                    IA avanzada que se adapta a ti.
                  </p>
                </div>

                <div className="group">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-lg group-hover:rotate-12 transition-transform"></div>
                    <h3 className="text-2xl font-bold">Instalación Express</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Compatible con 95% de ascensores existentes. 
                    Setup en menos de 2 horas.
                  </p>
                </div>

                <div className="group">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full border-2 border-primary group-hover:animate-ping"></div>
                    <h3 className="text-2xl font-bold">Acceso Universal</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Diseñado para todos. Sin barreras, sin limitaciones.
                    Simplemente habla y muévete.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;