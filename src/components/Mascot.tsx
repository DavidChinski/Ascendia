import { useEffect, useMemo, useRef, useState } from "react";

type SectionAnchor = {
  id: string;
  y: number;
};

interface MascotProps {
  sectionIds?: string[];
}

// Neon elevator mascot: geometric cab with eyes and lips, friendly wave.
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
  const [scrollVelocity, setScrollVelocity] = useState<number>(0); // px/ms
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
      const vel = dy / dt; // px per ms
      setScrollVelocity(vel);

      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / docHeight));
      setProgress(p);

      // Trigger small wave near section boundaries
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

  // Lightweight time ticker for subtle motion
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setTime((t) => t + 0.016);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Derived transform: vertical-only travel along fixed centered cable
  const style = useMemo(() => {
    const mascotBaseSize = 200; // larger visual footprint
    const verticalTop = Math.round((1 - progress) * Math.max(0, viewportSize.h - mascotBaseSize));
    const centerX = logoCenterX !== null ? logoCenterX - mascotBaseSize / 2 : (viewportSize.w - mascotBaseSize) / 2;
    const left = Math.max(16, Math.min(viewportSize.w - mascotBaseSize - 16, centerX));
    const moving = Math.abs(scrollVelocity) > 0.001;
    const scale = moving ? 1.02 : 1.0;
    const rotate = 0;
    return {
      top: `${verticalTop}px`,
      left: `${left}px`,
      transform: `translate3d(0,0,0) scale(${scale}) rotate(${rotate}deg)`,
    } as React.CSSProperties;
  }, [progress, viewportSize.h, viewportSize.w, logoCenterX, scrollVelocity]);

  // Unique ids for filters/gradients to avoid collisions if multiple mascots
  const uid = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  const reveal = Math.max(0, Math.min(1, (progress - 0.82) / 0.16));

  return (
    <>
      <div ref={containerRef} className="fixed z-0 pointer-events-none select-none" style={style} aria-hidden>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          {/* Neon aura */}
          <defs>
            <linearGradient id={`g1-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id={`body-${uid}`} cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(20,20,25,0.85)" />
            </radialGradient>
            <filter id={`glow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Trailing aura */}
          <circle cx="100" cy="100" r="86" fill="none" stroke={`url(#g1-${uid})`} strokeOpacity="0.15" strokeWidth="2" filter={`url(#soft-${uid})`} />

          {/* Overhead beam and centered cable with pulley */}
          <rect x="34" y="18" width="132" height="8" rx="4" fill="rgba(20,20,25,0.8)" stroke={`url(#g1-${uid})`} strokeOpacity="0.6" />
          <circle cx="100" cy="22" r="10" fill="rgba(20,20,25,0.95)" stroke={`url(#g1-${uid})`} strokeWidth="2" />
          <circle cx="100" cy="22" r="4" fill={`url(#g1-${uid})`} />
          <line x1="100" y1="-200" x2="100" y2="200" stroke={`url(#g1-${uid})`} strokeWidth="2" strokeOpacity="0.35" />

          {/* Cab: beveled rounded form echoing elevator silhouette */}
          <g filter={`url(#glow-${uid})`}>
            <rect x="48" y="44" rx="18" ry="18" width="104" height="120" fill={`url(#body-${uid})`} stroke={`url(#g1-${uid})`} strokeWidth="2.5" />
            {/* Door split */}
            <line x1="100" y1="46" x2="100" y2="162" stroke="hsl(var(--primary))" strokeOpacity="0.5" />
            {/* Top cap */}
            <rect x="62" y="30" rx="12" ry="12" width="76" height="18" fill="rgba(20,20,25,0.9)" stroke={`url(#g1-${uid})`} strokeWidth="2" />
            {/* Door panels hint */}
            <rect x="54" y="56" width="40" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="hsl(var(--primary))" strokeOpacity="0.15" />
            <rect x="106" y="56" width="40" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="hsl(var(--primary))" strokeOpacity="0.15" />

            {/* Eyes */}
            <g>
              <ellipse cx="80" cy="94" rx="12" ry={blink ? 1.6 : 8} fill="#fff" />
              <circle cx="80" cy="94" r={blink ? 1 : 3.2} fill="#0b0b0b" />
              <ellipse cx="120" cy="94" rx="12" ry={blink ? 1.6 : 8} fill="#fff" />
              <circle cx="120" cy="94" r={blink ? 1 : 3.2} fill="#0b0b0b" />
              {/* subtle eyelids highlight */}
              <path d="M68 88 Q80 82 92 88" stroke={`url(#g1-${uid})`} strokeOpacity="0.35" filter={`url(#soft-${uid})`} />
              <path d="M108 88 Q120 82 132 88" stroke={`url(#g1-${uid})`} strokeOpacity="0.35" filter={`url(#soft-${uid})`} />
            </g>

            {/* Lips - subtle smile */}
            <path d="M78 118 Q100 128 122 118" stroke={`url(#g1-${uid})`} strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Friendly waving arm - right side */}
            <g transform="translate(152,86)">
              <g transform={`rotate(${wave ? 22 : 0})`}>
                <rect x="0" y="0" width="26" height="8" rx="4" fill={`url(#g1-${uid})`} />
                <rect x="24" y="-2" width="12" height="12" rx="4" fill={`url(#g1-${uid})`} />
              </g>
            </g>

            {/* Floor indicator chevrons */}
            <g opacity="0.75">
              <path d="M88 70 l12 -12 l12 12" stroke="hsl(var(--accent))" strokeWidth="2.5" fill="none" />
              <path d="M88 142 l12 12 l12 -12" stroke="hsl(var(--secondary))" strokeWidth="2.5" fill="none" />
            </g>
          </g>
        </svg>
      </div>
      <div className="fixed inset-x-0 top-20 flex justify-center pointer-events-none select-none" style={{ opacity: reveal }}>
        <svg width="820" height="120" viewBox="0 0 820 120" fill="none">
          <defs>
            <linearGradient id={`text-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <filter id={`textglow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <text x="50%" y="72" textAnchor="middle" fontFamily="Inter, ui-sans-serif, system-ui" fontWeight="800" fontSize="96" fill="none" stroke={`url(#text-${uid})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 2000, strokeDashoffset: Math.round((1 - reveal) * 2000) }}>ASCENDIA</text>
          <text x="50%" y="72" textAnchor="middle" fontFamily="Inter, ui-sans-serif, system-ui" fontWeight="800" fontSize="96" fill={`url(#text-${uid})`} opacity={0.08} filter={`url(#textglow-${uid})`}>ASCENDIA</text>
        </svg>
      </div>
    </>
  );
};

export default Mascot;


