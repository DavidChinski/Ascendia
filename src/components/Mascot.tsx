import { useEffect, useMemo, useRef, useState } from "react";

type SectionAnchor = {
  id: string;
  y: number;
};

interface MascotProps {
  sectionIds?: string[];
}

// Modern robot mascot with contemporary design
const Mascot = ({ sectionIds = ["hero", "demo", "about", "contact"] }: MascotProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [anchors, setAnchors] = useState<SectionAnchor[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [viewportSize, setViewportSize] = useState<{ w: number; h: number }>({ w: typeof window !== 'undefined' ? window.innerWidth : 1200, h: typeof window !== 'undefined' ? window.innerHeight : 800 });
  const [blink, setBlink] = useState<boolean>(false);
  const [wave, setWave] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const lastScrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const lastTsRef = useRef<number>(typeof performance !== 'undefined' ? performance.now() : 0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const [logoCenterX, setLogoCenterX] = useState<number | null>(null);

  // Measure section absolute positions
  const measure = () => {
    const list: SectionAnchor[] = sectionIds
      .map((id) => {
        const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
        if (!el) return null;
        const rect = (el as HTMLElement).getBoundingClientRect();
        return { id, y: rect.top + window.scrollY } as SectionAnchor;
      })
      .filter(Boolean) as SectionAnchor[];
    if (list.length > 0) {
      setAnchors(list);
    }
    const logo = document.getElementById('hero-logo');
    if (logo) {
      const r = logo.getBoundingClientRect();
      setLogoCenterX(r.left + r.width / 2);
    }
  };

  useEffect(() => {
    measure();
    const onResize = () => {
      setViewportSize({ w: window.innerWidth, h: window.innerHeight });
      measure();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track scroll progress across the page
  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastScrollYRef.current;
      const dt = Math.max(1, now - lastTsRef.current);
      const vel = dy / dt;
      setScrollVelocity(vel);

      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / docHeight));
      setProgress(p);

      // Trigger wave near section boundaries
      if (anchors.length > 0) {
        const currentY = window.scrollY;
        const nearest = anchors.reduce((acc, a) => {
          const d = Math.abs(a.y - currentY);
          return d < acc.dist ? { id: a.id, dist: d } : acc;
        }, { id: anchors[0].id, dist: Math.abs(anchors[0].y - currentY) });
        if (nearest.dist < 120) {
          setWave(true);
          window.setTimeout(() => setWave(false), 800);
        }
      }

      lastScrollYRef.current = window.scrollY;
      lastTsRef.current = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchors.length]);

  // Random blinking
  useEffect(() => {
    const id = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 120);
    }, 2800 + Math.random() * 2000);
    return () => window.clearInterval(id);
  }, []);

  // Time ticker for animations
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setTime((t) => t + 0.016);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Position calculation - always visible from start
  const style = useMemo(() => {
    const mascotBaseSize = 200;
    const verticalTop = Math.round((1 - progress) * Math.max(0, viewportSize.h - mascotBaseSize));
    const centerX = logoCenterX !== null ? logoCenterX - mascotBaseSize / 2 : (viewportSize.w - mascotBaseSize) / 2;
    const left = Math.max(16, Math.min(viewportSize.w - mascotBaseSize - 16, centerX));
    const moving = Math.abs(scrollVelocity) > 0.001;
    const scale = moving ? 1.02 : 1.0;
    return {
      top: `${verticalTop}px`,
      left: `${left}px`,
      transform: `translate3d(0,0,0) scale(${scale})`,
    } as React.CSSProperties;
  }, [progress, viewportSize.h, viewportSize.w, logoCenterX, scrollVelocity]);

  const uid = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  return (
    <div ref={containerRef} className="fixed z-10 pointer-events-none select-none" style={style} aria-hidden>
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        {/* Modern gradients */}
        <defs>
          <linearGradient id={`body-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id={`screen-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <linearGradient id={`accent-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Modern shadow */}
        <ellipse cx="100" cy="195" rx="40" ry="10" fill="#000000" opacity="0.1"/>

        {/* Main robot body - modern design */}
        <g>
          {/* Body with modern colors */}
          <rect x="50" y="60" width="100" height="120" rx="25" ry="25" fill={`url(#body-${uid})`} stroke="#4F46E5" strokeWidth="2"/>
          
          {/* Internal division line */}
          <line x1="55" y1="120" x2="145" y2="120" stroke="#4F46E5" strokeWidth="1" opacity="0.6"/>
          
          {/* Screen face */}
          <rect x="60" y="70" width="80" height="45" rx="15" ry="15" fill={`url(#screen-${uid})`} stroke="#4F46E5" strokeWidth="1"/>
          
          {/* Eyes - modern style */}
          <g>
            <circle cx="80" cy="85" r={blink ? 1 : 6} fill="#06B6D4" filter={`url(#glow-${uid})`}/>
            <circle cx="120" cy="85" r={blink ? 1 : 6} fill="#06B6D4" filter={`url(#glow-${uid})`}/>
          </g>
          
          {/* Smile - modern curve */}
          <path d="M75 100 Q100 115 125 100" stroke="#06B6D4" strokeWidth="2" fill="none" strokeLinecap="round" filter={`url(#glow-${uid})`}/>
          
          {/* Lower panels */}
          <rect x="65" y="125" width="30" height="45" rx="10" fill="#4F46E5" stroke="#6366F1" strokeWidth="1"/>
          <rect x="105" y="125" width="30" height="45" rx="10" fill="#4F46E5" stroke="#6366F1" strokeWidth="1"/>
          
          {/* Modern arrow */}
          <polygon points="112,140 119,130 126,140" fill="#06B6D4" filter={`url(#glow-${uid})`}/>
        </g>

        {/* Modern antenna */}
        <g>
          <line x1="100" y1="60" x2="100" y2="35" stroke="#4F46E5" strokeWidth="2"/>
          <circle cx="100" cy="30" r="4" fill="#06B6D4" filter={`url(#glow-${uid})`}>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          {/* Signal waves */}
          <g opacity="0.7">
            <path d="M90 25 Q100 20 110 25" stroke="#06B6D4" strokeWidth="1.5" fill="none">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/>
            </path>
            <path d="M85 20 Q100 15 115 20" stroke="#06B6D4" strokeWidth="1" fill="none">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/>
            </path>
          </g>
        </g>

        {/* Modern arms */}
        <g>
          {/* Left arm - waving */}
          <g transform={`translate(25, 100) rotate(${wave ? -15 : 0})`}>
            <rect x="0" y="0" width="25" height="8" rx="4" fill={`url(#body-${uid})`} stroke="#4F46E5" strokeWidth="1"/>
            <rect x="23" y="-2" width="10" height="12" rx="5" fill={`url(#body-${uid})`} stroke="#4F46E5" strokeWidth="1"/>
            {/* Modern fingers */}
            <rect x="31" y="-4" width="3" height="8" rx="1.5" fill="#6366F1"/>
            <rect x="35" y="-2" width="3" height="6" rx="1.5" fill="#6366F1"/>
            <rect x="39" y="0" width="3" height="4" rx="1.5" fill="#6366F1"/>
          </g>
          
          {/* Right arm */}
          <g transform="translate(150, 100)">
            <rect x="0" y="0" width="25" height="8" rx="4" fill={`url(#body-${uid})`} stroke="#4F46E5" strokeWidth="1"/>
            <rect x="23" y="-2" width="10" height="12" rx="5" fill={`url(#body-${uid})`} stroke="#4F46E5" strokeWidth="1"/>
            {/* Modern fingers */}
            <rect x="31" y="-4" width="3" height="8" rx="1.5" fill="#6366F1"/>
            <rect x="35" y="-2" width="3" height="6" rx="1.5" fill="#6366F1"/>
            <rect x="39" y="0" width="3" height="4" rx="1.5" fill="#6366F1"/>
          </g>
        </g>

        {/* Modern legs */}
        <g>
          <rect x="75" y="180" width="15" height="20" rx="7" fill="#4F46E5" stroke="#6366F1" strokeWidth="1"/>
          <rect x="110" y="180" width="15" height="20" rx="7" fill="#4F46E5" stroke="#6366F1" strokeWidth="1"/>
          {/* Modern feet */}
          <rect x="70" y="198" width="25" height="8" rx="4" fill="#1F2937"/>
          <rect x="105" y="198" width="25" height="8" rx="4" fill="#1F2937"/>
        </g>
      </svg>
    </div>
  );
};

export default Mascot;


