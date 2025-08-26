import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, Volume2, ArrowUp, HelpCircle, X, Settings, AlertTriangle } from "lucide-react";

interface ElevatorState {
  current: number;
  target: number | null;
  moving: boolean;
  doorsOpen: boolean;
  maxFloor: number;
  listening: boolean;
  emergency: boolean;
}

const InteractiveDemo = () => {
  const [state, setState] = useState<ElevatorState>({
    current: 0,
    target: null,
    moving: false,
    doorsOpen: true,
    maxFloor: 20,
    listening: false,
    emergency: false,
  });

  const [transcript, setTranscript] = useState("📻 Acá vas a ver lo que el sistema entiende…");
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [textCommand, setTextCommand] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Números en palabras para el parser
  const numberWords: Record<string, number> = {
    'cero': 0, 'uno': 1, 'una': 1, 'un': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5,
    'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10, 'once': 11, 'doce': 12,
    'trece': 13, 'catorce': 14, 'quince': 15, 'dieciseis': 16, 'dieciséis': 16,
    'diecisiete': 17, 'dieciocho': 18, 'diecinueve': 19, 'veinte': 20,
    'veintiuno': 21, 'veintidos': 22, 'veintidós': 22, 'veintitres': 23, 'veintitrés': 23,
    'veinticuatro': 24, 'veinticinco': 25, 'veintiseis': 26, 'veintiséis': 26,
    'veintisiete': 27, 'veintiocho': 28, 'veintinueve': 29, 'treinta': 30
  };

  // Función para síntesis de voz
  const speak = useCallback((text: string) => {
    if (!ttsEnabled) return;
    
    try {
      synthesisRef.current = window.speechSynthesis;
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'es-AR';
      msg.rate = 1;
      msg.pitch = 1;
      msg.volume = 1;
      
      // Intentar elegir una voz española/latam si existe
      const voices = synthesisRef.current.getVoices();
      const prefer = voices.find(v => /es|Spanish/i.test(v.lang || v.name));
      if (prefer) msg.voice = prefer;
      
      synthesisRef.current.cancel();
      synthesisRef.current.speak(msg);
    } catch (e) {
      console.warn('TTS no disponible', e);
    }
  }, [ttsEnabled]);

  // Función para limitar el piso
  const clampFloor = useCallback((n: number) => {
    return Math.max(0, Math.min(state.maxFloor, n));
  }, [state.maxFloor]);

  // Función para extraer número de piso del texto
  const extractFloor = useCallback((text: string) => {
    // Busca primero números explícitos
    const numMatch = text.match(/\b(\d{1,2})\b/);
    if (numMatch) {
      return clampFloor(parseInt(numMatch[1], 10));
    }
    
    // Busca números en palabras simples (0-30)
    const tokens = text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').split(/\s+/);
    for (const t of tokens) {
      if (t in numberWords) {
        return clampFloor(numberWords[t]);
      }
    }
    return null;
  }, [clampFloor]);

  // Función para manejar comandos
  const handleCommand = useCallback((raw: string) => {
    const text = (raw || '').trim();
    if (!text) return;
    
    setTranscript('⚡ "' + text + '"');
    const t = text.toLowerCase();

    if (/\b(emergencia|ayuda urgente)\b/.test(t)) {
      setState(prev => ({ ...prev, emergency: true }));
      speak('Alerta de emergencia enviada');
      return;
    }

    if (/\b(ayuda|como funciona|que puedo decir)\b/.test(t)) {
      speak('Podés decir: ir al piso X, subí, bajá, abrir puerta, cerrar puerta, cancelar, emergencia.');
      return;
    }

    if (/\b(cancelar|detener|parar)\b/.test(t)) {
      setState(prev => ({ ...prev, target: null, moving: false }));
      speak('Cancelado');
      return;
    }

    if (/\b(abr(i|í)r? puerta|abr(i|í) las puertas|puerta abierta)\b/.test(t)) {
      setState(prev => ({ ...prev, doorsOpen: true }));
      speak('Puertas abiertas');
      return;
    }

    if (/\b(cerrar? puerta|cerr(a|á) las puertas|puerta cerrada)\b/.test(t)) {
      setState(prev => ({ ...prev, doorsOpen: false }));
      speak('Puertas cerradas');
      return;
    }

    if (/\b(subi(r)?|sub(i|í))\b/.test(t)) {
      const target = clampFloor(state.current + 1);
      setState(prev => ({ ...prev, target }));
      return;
    }

    if (/\b(baja(r)?|baj(a|á))\b/.test(t)) {
      const target = clampFloor(state.current - 1);
      setState(prev => ({ ...prev, target }));
      return;
    }

    if (/\b(piso|al piso|ir al piso|lleva? al)\b/.test(t)) {
      const f = extractFloor(t);
      if (f !== null) {
        setState(prev => ({ ...prev, target: f }));
        return;
      }
    }

    // Si solo dicen un número ("cinco"), interpretarlo como piso
    const f = extractFloor(t);
    if (f !== null) {
      setState(prev => ({ ...prev, target: f }));
      return;
    }

    // No entendido
    speak('No entendí. Decí por ejemplo: ir al piso 3');
  }, [state.current, clampFloor, extractFloor, speak]);

  // Función para mover el ascensor
  const moveTo = useCallback((target: number) => {
    if (state.emergency) return;
    
    target = clampFloor(target);
    if (target === state.current) {
      speak('Ya estás en el piso ' + target);
      setState(prev => ({ ...prev, doorsOpen: true }));
      return;
    }

    setState(prev => ({ ...prev, target, doorsOpen: false }));
    speak(`Yendo al piso ${target}`);
  }, [state.current, state.emergency, clampFloor, speak]);

  // Efecto para manejar el movimiento del ascensor
  useEffect(() => {
    if (state.target === null || state.moving) return;

    const step = () => {
      if (state.emergency || state.target === null) {
        setState(prev => ({ ...prev, moving: false }));
        return;
      }

      setState(prev => {
        if (prev.doorsOpen) {
          return { ...prev, doorsOpen: false };
        }

        const dir = prev.target! > prev.current ? 1 : -1;
        const newCurrent = prev.current + dir;

        if (newCurrent === prev.target) {
          // Llegamos al destino
          setTimeout(() => {
            speak('Llegaste al piso ' + newCurrent);
            setState(prev => ({ 
              ...prev, 
              current: newCurrent, 
              target: null, 
              moving: false,
              doorsOpen: true 
            }));
          }, 600);
          return { ...prev, current: newCurrent, moving: false };
        } else {
          // Continuar moviendo
          setTimeout(step, 800);
          return { ...prev, current: newCurrent, moving: true };
        }
      });
    };

    setTimeout(step, 500);
  }, [state.target, state.moving, state.emergency, speak]);

  // Función para iniciar reconocimiento de voz
  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setTranscript('Micrófono no soportado en este navegador. Usá el campo de texto.');
      return;
    }

    if (state.listening) return;

    try {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'es-AR';
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (e: SpeechRecognitionEvent) => {
        const i = e.resultIndex;
        for (let k = i; k < e.results.length; k++) {
          if (e.results[k].isFinal) {
            const said = e.results[k][0].transcript.trim();
            handleCommand(said);
          }
        }
      };

      recognitionRef.current.onerror = (e: SpeechRecognitionErrorEvent) => {
        console.warn('SR error', e.error);
        setTranscript('Error de micrófono: ' + e.error + ' — probá de nuevo o usá el campo de texto.');
      };

      recognitionRef.current.onend = () => {
        // Reintentar si seguimos en modo escucha
        if (state.listening) {
          try {
            recognitionRef.current?.start();
          } catch (_) {
            // evitar loop si el navegador bloquea
          }
        }
      };

      recognitionRef.current.start();
      setState(prev => ({ ...prev, listening: true }));
      speak('Te escucho');
    } catch (e) {
      console.warn('No se pudo iniciar el reconocimiento', e);
    }
  }, [state.listening, handleCommand, speak]);

  // Función para detener reconocimiento de voz
  const stopListening = useCallback(() => {
    setState(prev => ({ ...prev, listening: false }));
    try {
      recognitionRef.current?.stop();
    } catch (_) {}
  }, []);

  // Función para ejecutar comando de texto
  const executeTextCommand = useCallback(() => {
    const v = textCommand.trim();
    if (v) {
      handleCommand(v);
      setTextCommand('');
    }
  }, [textCommand, handleCommand]);

  // Función para desactivar emergencia
  const dismissEmergency = useCallback(() => {
    setState(prev => ({ ...prev, emergency: false }));
    speak('Emergencia desactivada');
  }, [speak]);

  // Efecto para manejar tecla Enter en el campo de texto
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeTextCommand();
      }
    };

    const txtCmd = document.getElementById('txtCmd') as HTMLInputElement;
    if (txtCmd) {
      txtCmd.addEventListener('keydown', handleKeyDown);
      return () => txtCmd.removeEventListener('keydown', handleKeyDown);
    }
  }, [executeTextCommand]);

  return (
    <section id="demo" className="py-32 relative overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute inset-0 bg-gradient-background"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 transform -skew-y-6"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 id="demo-title" className="text-6xl font-black mb-6 jandar-text-glow">
            DEMO LIVE
          </h2>
          <p className="text-2xl text-accent">
            Experimenta el control por voz en tiempo real
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Control Panel */}
          <div className="bg-gradient-card border border-primary/20 rounded-3xl p-8 glow-primary">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-secondary/50 mix-blend-screen"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Ascendia — Control por voz</h3>
                <p className="text-sm text-muted-foreground">Prototipo educativo (cliente web)</p>
              </div>
            </div>

            {/* Controls Row 1 */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <button
                onClick={() => state.listening ? stopListening() : startListening()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  state.listening 
                    ? 'bg-gradient-secondary text-secondary-foreground glow-secondary' 
                    : 'bg-background/50 text-foreground border border-primary/30 hover:border-primary/50'
                }`}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  state.listening 
                    ? 'bg-secondary animate-pulse' 
                    : 'bg-muted-foreground'
                }`}></div>
                <span>{state.listening ? 'Escuchando…' : 'Escuchar'}</span>
              </button>

              <label className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background/50 border border-primary/30 cursor-pointer hover:border-primary/50 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={ttsEnabled}
                  onChange={(e) => setTtsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm">Respuesta hablada</span>
              </label>

              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Pisos: 0 — {state.maxFloor}</label>
                <input
                  type="range"
                  min="3"
                  max="40"
                  value={state.maxFloor}
                  onChange={(e) => setState(prev => ({ 
                    ...prev, 
                    maxFloor: parseInt(e.target.value),
                    current: Math.min(prev.current, parseInt(e.target.value))
                  }))}
                  className="w-32 accent-primary"
                />
              </div>
            </div>

            {/* Text Input */}
            <div className="flex gap-3 mb-6">
              <input
                id="txtCmd"
                type="text"
                value={textCommand}
                onChange={(e) => setTextCommand(e.target.value)}
                placeholder="Escribí un comando (ej: ir al piso 8)"
                className="flex-1 px-4 py-3 rounded-xl bg-background/50 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-all duration-300"
              />
              <button
                onClick={executeTextCommand}
                className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Ejecutar
              </button>
              <button
                onClick={() => handleCommand('ayuda')}
                className="px-4 py-3 bg-background/50 border border-primary/30 rounded-xl hover:border-primary/50 transition-all duration-300"
                title="Ayuda"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Transcript */}
            <div className="bg-background/50 border border-dashed border-primary/30 rounded-xl p-4 mb-4 min-h-[60px]">
              <p className="text-sm text-foreground/80">{transcript}</p>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Sugerencia: probá decir <em>"ir al piso 5"</em>, <em>"subí"</em>, <em>"abrí puerta"</em>, <em>"ayuda"</em> o <em>"emergencia"</em>.
            </p>

            {/* Commands List */}
            <div className="text-sm text-foreground/90">
              <p><strong>Comandos soportados</strong> → <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">ir al piso X</code>, <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">subí</code>, <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">bajá</code>, <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">abrí puerta</code>, <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">cerrá puerta</code>, <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">ayuda</code>, <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">cancelar</code>, <code className="bg-background/50 px-2 py-1 rounded border border-primary/20">emergencia</code>.</p>
            </div>
          </div>

          {/* Elevator Display */}
          <div className="bg-gradient-card border border-secondary/20 rounded-3xl p-8 glow-secondary">
            <div className="text-center">
              {/* Floor Number */}
              <div className="text-8xl font-black jandar-text-glow mb-6 tracking-wider">
                {state.current}
              </div>
              
              {/* Status */}
              <div className="text-lg text-muted-foreground mb-8">
                {state.emergency ? 'EMERGENCIA' : 
                 state.moving ? (state.target! > state.current ? 'Subiendo…' : 'Bajando…') :
                 state.doorsOpen ? 'Puertas abiertas' : 'Puertas cerradas'}
              </div>

              {/* Doors */}
              <div className="flex justify-center gap-4 mb-8">
                <div className={`w-20 h-24 rounded-xl border-2 transition-all duration-400 ${
                  state.doorsOpen 
                    ? 'border-secondary/50 bg-secondary/10' 
                    : 'border-primary/30 bg-background/50'
                }`}>
                  <div className={`w-full h-full transition-all duration-400 ${
                    state.doorsOpen ? 'bg-gradient-to-r from-secondary/20 to-transparent' : ''
                  }`}></div>
                </div>
                <div className={`w-20 h-24 rounded-xl border-2 transition-all duration-400 ${
                  state.doorsOpen 
                    ? 'border-secondary/50 bg-secondary/10' 
                    : 'border-primary/30 bg-background/50'
                }`}>
                  <div className={`w-full h-full transition-all duration-400 ${
                    state.doorsOpen ? 'bg-gradient-to-l from-secondary/20 to-transparent' : ''
                  }`}></div>
                </div>
              </div>

              {/* Voice Button */}
              <button
                onClick={() => state.listening ? stopListening() : startListening()}
                className={`relative p-6 rounded-full transition-all duration-300 ${
                  state.listening 
                    ? 'bg-gradient-secondary glow-secondary animate-pulse' 
                    : 'bg-gradient-primary glow-primary hover:scale-110'
                }`}
              >
                {state.listening ? (
                  <MicOff className="w-8 h-8 text-secondary-foreground" />
                ) : (
                  <Mic className="w-8 h-8 text-primary-foreground" />
                )}
                
                {state.listening && (
                  <div className="absolute inset-0 rounded-full border-4 border-secondary animate-ping"></div>
                )}
              </button>
              
              <p className="mt-4 text-sm text-muted-foreground">
                {state.listening ? "Escuchando..." : "Toca para hablar"}
              </p>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-20">
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-primary rounded-full"></div>
            <div className="pl-8 grid md:grid-cols-3 gap-12">
              
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

      {/* Emergency Modal */}
      {state.emergency && (
        <div className="fixed inset-0 bg-destructive/20 border-4 border-destructive flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-background/95 border border-destructive/50 p-8 rounded-2xl text-center max-w-md mx-4">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-destructive mb-4">EMERGENCIA</h2>
            <p className="text-muted-foreground mb-6">
              Simulación activada. Se envía aviso al panel central (demo).
            </p>
            <button
              onClick={dismissEmergency}
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Cerrar alerta
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveDemo;