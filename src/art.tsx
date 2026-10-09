import { useId, useMemo } from "react";

/**
 * Procedural "artworks" so the site ships with zero image dependencies.
 * Swap <Art/> for <img src="/your-artwork.jpg"/> anywhere to use real work.
 */

export const PALETTES: string[][] = [
  ["#F2B52A", "#E2492B", "#1B1B3A", "#F3E6C4"], // turmeric / vermilion / indigo
  ["#0F4C4A", "#F0C14B", "#E26D3A", "#EFE7D2"], // teal / gold
  ["#2B2D8F", "#F2FF99", "#E94F37", "#F4EDE0"], // indigo / lime
  ["#6B1E2A", "#E8A87C", "#2F3E46", "#F4E9D8"], // maroon / peach
  ["#1E6B52", "#F7C873", "#D9482B", "#10231C"], // forest / saffron
  ["#E8DCC4", "#1A1A1A", "#C8381F", "#8C6A3F"], // parchment / ink
];

export type Variant =
  | "sun"
  | "arches"
  | "waves"
  | "blobs"
  | "mandala"
  | "film"
  | "stripes"
  | "figure";

function rng(seed: number) {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function blobPath(cx: number, cy: number, r: number, rand: () => number) {
  const n = 7;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (0.65 + rand() * 0.55);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const;
  });
  const mid = (a: readonly number[], b: readonly number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(pts[n - 1], pts[0]).join(" ")}`;
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    d += ` Q ${pts[i].join(" ")} ${m.join(" ")}`;
  }
  return d + " Z";
}

type Props = {
  variant: Variant;
  seed?: number;
  palette?: number;
  className?: string;
  label?: string;
};

export function Art({ variant, seed = 1, palette = 0, className, label }: Props) {
  const uid = useId().replace(/:/g, "");
  const p = PALETTES[palette % PALETTES.length];

  const body = useMemo(() => {
    const r = rng(seed * 9973 + palette * 31);
    switch (variant) {
      case "sun": {
        const rad = 62 + r() * 24;
        const cy = 150 + r() * 40;
        return (
          <>
            <rect width="300" height="400" fill={p[3]} />
            <circle cx="150" cy={cy} r={rad} fill={p[1]} />
            <circle cx="150" cy={cy} r={rad * 0.62} fill={p[0]} />
            <rect y="236" width="300" height="164" fill={p[2]} />
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x={20 + r() * 60} y={252 + i * 24} width={90 + r() * 170} height="5" rx="2.5" fill={p[i % 2 ? 0 : 3]} opacity=".85" />
            ))}
            {Array.from({ length: 4 }, (_, i) => (
              <path key={i} d={`M ${40 + i * 62} ${70 + r() * 30} q 8 -8 16 0 q 8 -8 16 0`} stroke={p[2]} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ))}
          </>
        );
      }
      case "arches": {
        return (
          <>
            <rect width="300" height="400" fill={p[3]} />
            {Array.from({ length: 5 }, (_, i) => {
              const w = 250 - i * 44;
              const x = 150 - w / 2;
              return (
                <path key={i} d={`M ${x} 400 V ${190 + i * 20} A ${w / 2} ${w / 2} 0 0 1 ${x + w} ${190 + i * 20} V 400 Z`} fill={p[i % 3]} />
              );
            })}
            <circle cx="150" cy="330" r="16" fill={p[3]} />
          </>
        );
      }
      case "waves": {
        const rows = 9;
        return (
          <>
            <rect width="300" height="400" fill={p[3]} />
            {Array.from({ length: rows }, (_, i) => {
              const y = 40 + i * 42;
              const amp = 10 + r() * 16;
              const ph = r() * 40;
              let d = `M 0 ${y}`;
              for (let x = 0; x <= 300; x += 30) d += ` Q ${x + 15} ${y + (x / 30 % 2 ? amp : -amp) + ph * 0} ${x + 30} ${y}`;
              d += ` V 400 H 0 Z`;
              return <path key={i} d={d} fill={p[i % 3]} opacity={0.95} />;
            })}
          </>
        );
      }
      case "blobs": {
        return (
          <>
            <rect width="300" height="400" fill={p[3]} />
            {Array.from({ length: 5 }, (_, i) => (
              <path key={i} d={blobPath(60 + r() * 180, 80 + i * 60 + r() * 30, 50 + r() * 50, r)} fill={p[i % 3]} opacity={0.88} style={{ mixBlendMode: "multiply" }} />
            ))}
            {Array.from({ length: 28 }, (_, i) => (
              <circle key={i} cx={r() * 300} cy={r() * 400} r={1 + r() * 2} fill={p[2]} opacity=".5" />
            ))}
          </>
        );
      }
      case "mandala": {
        const rings = [120, 92, 66, 40];
        return (
          <>
            <rect width="300" height="400" fill={p[2]} />
            <g transform="translate(150 200)">
              {rings.map((rad, ri) =>
                Array.from({ length: 10 + ri * 2 }, (_, i) => (
                  <ellipse key={`${ri}-${i}`} cx="0" cy={-rad} rx={rad * 0.16} ry={rad * 0.34} fill={p[ri % 2 ? 0 : 1]} opacity={0.9} transform={`rotate(${(i / (10 + ri * 2)) * 360})`} />
                )),
              )}
              <circle r="18" fill={p[3]} />
              <circle r="8" fill={p[1]} />
            </g>
          </>
        );
      }
      case "film": {
        return (
          <>
            <rect width="300" height="400" fill="#0d0c0a" />
            {Array.from({ length: 12 }, (_, i) => (
              <g key={i}>
                <rect x="10" y={14 + i * 32} width="14" height="20" rx="3" fill="#2a2823" />
                <rect x="276" y={14 + i * 32} width="14" height="20" rx="3" fill="#2a2823" />
              </g>
            ))}
            <rect x="38" y="48" width="224" height="140" fill={p[2]} />
            <circle cx={120 + r() * 60} cy="112" r="34" fill={p[0]} />
            <rect x="38" y="140" width="224" height="48" fill={p[1]} />
            <rect x="38" y="208" width="224" height="140" fill={p[1]} />
            <path d={`M 38 348 L 120 ${250 + r() * 20} L 190 ${290 + r() * 20} L 262 ${240 + r() * 20} V 348 Z`} fill={p[2]} />
            <circle cx="200" cy="244" r="20" fill={p[3]} opacity=".9" />
          </>
        );
      }
      case "stripes": {
        return (
          <>
            <rect width="300" height="400" fill={p[3]} />
            <g transform="rotate(-18 150 200)">
              {Array.from({ length: 10 }, (_, i) => (
                <rect key={i} x="-60" y={-40 + i * 52} width="420" height={14 + r() * 32} rx="4" fill={p[i % 3]} opacity={0.92} />
              ))}
            </g>
            <circle cx={90 + r() * 120} cy={120 + r() * 160} r="34" fill={p[3]} stroke={p[2]} strokeWidth="6" />
          </>
        );
      }
      case "figure": {
        return (
          <>
            <rect width="300" height="400" fill={p[0]} />
            <circle cx="215" cy="92" r="42" fill={p[3]} />
            <path d="M 70 400 C 70 300 105 250 150 250 C 195 250 230 300 230 400 Z" fill={p[2]} />
            <circle cx="150" cy="208" r="34" fill={p[1]} />
            <path d="M 112 196 C 112 160 188 160 188 196 C 170 180 130 180 112 196 Z" fill={p[2]} />
            <path d="M 0 360 Q 75 330 150 360 T 300 350 V 400 H 0 Z" fill={p[1]} opacity=".85" />
          </>
        );
      }
    }
  }, [variant, seed, palette, p]);

  return (
    <svg
      className={className}
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <filter id={`g${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0" />
        </filter>
      </defs>
      {body}
      <rect width="300" height="400" filter={`url(#g${uid})`} />
    </svg>
  );
}
