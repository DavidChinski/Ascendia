import { Button } from "@/components/ui/button";
import { ChevronDown, Mic } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Hero = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [arrowScale, setArrowScale] = useState<number>(0);
  const [viewportH, setViewportH] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [overlayLeft, setOverlayLeft] = useState<number>(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const lastScrollYRef = useRef<number>(0);
  const hideTimerRef = useRef<number | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(1);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      if (Math.abs(delta) > 4) {
        setScrollDirection(delta > 0 ? "down" : "up");
        const targetEl = document.getElementById('demo-gradient-overlay') || document.getElementById('demo-title') || document.getElementById('demo');
        const demoTopAbs = targetEl ? (targetEl.getBoundingClientRect().top + window.scrollY) : (document.documentElement.scrollHeight - (window.innerHeight || 0));
        const normalized = Math.min(1, Math.max(0, currentY / Math.max(1, demoTopAbs)));
        setArrowScale(normalized);
        // Fade-out y ocultar un poco ANTES de llegar al h2#demo-title
        const fadeDistance = 360; // más largo y suave
        const fadeStart = Math.max(0, demoTopAbs - fadeDistance);
        const opacity = currentY < fadeStart ? 1 : Math.max(0, 1 - (currentY - fadeStart) / fadeDistance);
        setOverlayOpacity(opacity);
        setShowOverlay(currentY < demoTopAbs - 16 && opacity > 0.02);
        if (hideTimerRef.current) {
          window.clearTimeout(hideTimerRef.current);
        }
        hideTimerRef.current = window.setTimeout(() => {
          setScrollDirection(null);
          setArrowScale(0);
        }, 700);
        lastScrollYRef.current = currentY;
      }
    };

    const onResize = () => {
      setViewportH(window.innerHeight || viewportH);
      // recalcular alineación horizontal del overlay con el logo
      const rect = logoRef.current?.getBoundingClientRect();
      if (rect) setOverlayLeft(rect.left + rect.width / 2);
      const targetEl = document.getElementById('demo-gradient-overlay') || document.getElementById('demo-title') || document.getElementById('demo');
      const demoTopAbs = targetEl ? (targetEl.getBoundingClientRect().top + window.scrollY) : Number.POSITIVE_INFINITY;
      const fadeDistance = 360;
      const fadeStart = Math.max(0, demoTopAbs - fadeDistance);
      const currentY = window.scrollY;
      const opacity = currentY < fadeStart ? 1 : Math.max(0, 1 - (currentY - fadeStart) / fadeDistance);
      setOverlayOpacity(opacity);
      setShowOverlay(currentY < demoTopAbs - 16 && opacity > 0.02);
    };

    window.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    // calcular posición inicial del overlay alineado al logo
    const rect = logoRef.current?.getBoundingClientRect();
    if (rect) setOverlayLeft(rect.left + rect.width / 2);
  }, []);
  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-background"></div>
      
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-4 h-4 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-accent/50 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 border-2 border-secondary rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/3 right-10 w-2 h-20 bg-gradient-primary rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 left-10 w-2 h-16 bg-gradient-secondary rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-screen">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
              {/* Voice Wave Visualization */}
              <div className="absolute -top-20 -left-10 hidden lg:flex items-center space-x-1">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 bg-gradient-primary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 40 + 20}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1.5s'
                    }}
                  ></div>
                ))}
              </div>

              <h1 className="text-7xl md:text-9xl font-black leading-none">
                <span className="block jandar-text-glow">ASCEND</span>
                <span className="block text-right transform translate-x-4">IA</span>
              </h1>
            </div>
            
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-light text-accent">
                El futuro de los ascensores ya está aquí
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Habla. El ascensor escucha. <span className="text-primary font-semibold">Simple</span> como eso.
              </p>
              
              <p className="text-primary text-2xl font-medium italic">
                "Moverse entre pisos nunca fue tan simple."
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="jandar-button group" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                <Mic className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Probar ahora
              </Button>
              <Button variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                Ver magia ✨
              </Button>
            </div>
          </div>

          {/* Right Column - Interactive Logo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer">
              {/* Rotating Ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin" style={{animationDuration: '20s'}}></div>
              <div className="absolute inset-4 rounded-full border border-accent/20 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
              
              {/* Logo Container */}
              <div id="hero-logo" ref={logoRef} className="relative w-64 h-64 rounded-full bg-gradient-card border border-primary/20 glow-primary group-hover:glow-accent group-hover:scale-110 transition-all duration-500 flex items-center justify-center overflow-hidden z-10">
                <img 
                  src="/lovable-uploads/AscendiaLogo.jpg" 
                  alt="Ascendia Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              {showOverlay && (
              <div className="fixed inset-y-0 pointer-events-none z-0 transition-opacity duration-700" style={{ left: overlayLeft, transform: 'translateX(-50%)', opacity: overlayOpacity }}>
                <div className="relative h-screen w-10">
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full bg-gradient-to-b from-primary/20 via-primary/60 to-primary/20"></div>
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] rounded-full transition-[height] duration-150"
                    style={{
                      height: `${Math.round(arrowScale * 100)}%`,
                      background: 'linear-gradient(to bottom, hsl(var(--primary)) 0%, rgba(0,0,0,0) 100%)'
                    }}
                  ></div>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-xl border border-primary/40 bg-gradient-primary/40 shadow-lg backdrop-blur-sm transition-[top] duration-150"
                    style={{
                      top: `${Math.round(arrowScale * (viewportH - 24))}px`,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.25), 0 0 12px hsla(var(--primary), 0.6)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
              )}
              
              {/* Pulsating Dots */}
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-primary rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-accent rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 -right-8 w-2 h-2 bg-secondary rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </div>
    </section>
  );
};

export default Hero;