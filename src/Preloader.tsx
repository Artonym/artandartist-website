import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { scrollLock } from "./ui";

/**
 * THE PAINTED LOADER
 * A painting is made on an ivory canvas: bristly brush strokes sweep across, the wordmark is
 * painted in by a charcoal brush, a terracotta swash drips, flecks of paint fly — and then big
 * brush strokes paint the whole screen away to reveal the site.
 * Everything is one SVG, in the five palette colours.
 */

const C = { ivory: "#F6F1E9", charcoal: "#292522", terracotta: "#A65D3F", gold: "#B79A6B", sand: "#DCD2C4" };

const T_EXIT = 3.05; // seconds after start when the screen begins to be painted away

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** one brush stroke = many thin bristle lines of slightly different length, speed and tone */
function Brush({
  x0, x1, y, w, n, color, delay, dur, seed, opacity = 1, tilt = 0,
}: { x0: number; x1: number; y: number; w: number; n: number; color: string; delay: number; dur: number; seed: number; opacity?: number; tilt?: number }) {
  const lines = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: n }, (_, i) => {
      const yy = y - w / 2 + (i + 0.5) * (w / n);
      const sx = x0 + r() * w * 0.25;
      const ex = x1 - r() * w * 0.9; // ragged bristle tails
      const amp = (r() - 0.5) * w * 0.14;
      return {
        d: `M ${sx} ${yy - tilt / 2} Q ${(sx + ex) / 2} ${yy + amp} ${ex} ${yy + tilt / 2}`,
        sw: (w / n) * (1.15 + r() * 0.5),
        o: opacity * (0.8 + r() * 0.2),
        dd: delay + r() * 0.2,
        du: dur * (0.78 + r() * 0.4),
      };
    });
  }, [x0, x1, y, w, n, seed, opacity, tilt, delay, dur]);
  return (
    <g stroke={color} fill="none" strokeLinecap="round">
      {lines.map((l, i) => (
        <motion.path
          key={i}
          d={l.d}
          strokeWidth={l.sw}
          opacity={l.o}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: l.o }}
          transition={{ delay: l.dd, duration: l.du, ease: [0.5, 0.05, 0.2, 1], opacity: { delay: l.dd, duration: 0.01 } }}
        />
      ))}
    </g>
  );
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [go, setGo] = useState(false);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);
  const [n, setN] = useState(0);
  const [dim] = useState(() => ({ W: Math.max(320, window.innerWidth), H: Math.max(480, window.innerHeight) }));
  const { W, H } = dim;

  // wait (briefly) for the display font, so the word is painted in the right letters
  useEffect(() => {
    if (reduce) return;
    let alive = true;
    const font = document.fonts?.load('300 120px "Fraunces Variable"') ?? Promise.resolve();
    Promise.race([font, new Promise((r) => setTimeout(r, 900))]).then(() => alive && setGo(true));
    return () => {
      alive = false;
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) {
      onDone();
      setGone(true);
      return;
    }
    if (!go) return;
    scrollLock(true);
    const c = animate(0, 100, { duration: T_EXIT - 0.2, ease: [0.45, 0, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    const t1 = setTimeout(() => setExit(true), T_EXIT * 1000);
    const t2 = setTimeout(onDone, T_EXIT * 1000 + 420);
    const t3 = setTimeout(() => {
      setGone(true);
      scrollLock(false);
    }, T_EXIT * 1000 + 1500);
    return () => {
      c.stop();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [go, reduce, onDone]);

  const g = useMemo(() => {
    const fs = Math.min(Math.max(W * 0.115, 50), 172);
    const tw = fs * 5.3;
    const cy = H * 0.52;
    const lh = Math.min(Math.max(W * 0.075, 52), 92);
    return { fs, tw, cy, lh, lcy: Math.max(lh * 0.5 + 84, cy - fs * 0.98 - lh * 0.78), cx: W / 2 };
  }, [W, H]);

  if (gone) return null;

  const { fs, tw, cy, lh, lcy, cx } = g;
  const x0 = cx - tw / 2 - fs * 0.35;
  const x1 = cx + tw / 2 + fs * 0.35;

  // the whole screen gets painted away by horizontal strokes, alternating direction
  const rows = 6;
  const outStrokes = Array.from({ length: rows }, (_, i) => {
    const y = (i / (rows - 1)) * H;
    const ltr = i % 2 === 0;
    const a = ltr ? -W * 0.12 : W * 1.12;
    const b = ltr ? W * 1.12 : -W * 0.12;
    return { d: `M ${a} ${y + 14} Q ${W / 2} ${y - 22} ${b} ${y + 10}`, delay: i * 0.075 };
  });

  const splats = [
    [-1.95, -0.5, 0.075], [-2.15, 0.38, 0.04], [2.05, -0.42, 0.06], [1.85, 0.52, 0.09],
    [0.2, -1.2, 0.035], [-0.95, 1.05, 0.05], [1.35, 0.98, 0.04], [-1.45, -0.98, 0.05],
  ] as const;
  const splatColors = [C.gold, C.terracotta, C.charcoal, C.gold, C.terracotta, C.charcoal, C.gold, C.terracotta];
  const drips = [-0.26, 0.04, 0.3].map((u, i) => ({ x: cx + u * tw, len: fs * (0.34 + i * 0.13), w: fs * (0.04 + (i % 2) * 0.012), delay: 2.25 + i * 0.12 }));

  return (
    <motion.div
      className="preloader"
      style={{ background: go ? "transparent" : C.ivory }}
      animate={{ pointerEvents: exit ? "none" : "auto" }}
      aria-hidden
    >
      {go && (
        <svg className="preloader__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="pl-rough" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="1" seed="4" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="12" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="pl-rough-big" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed="9" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="46" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* the screen gets painted away: black strokes cut holes in the loader */}
            <mask id="pl-out" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect width={W} height={H} fill="#fff" />
              <g filter="url(#pl-rough-big)" stroke="#000" strokeLinecap="round" fill="none" strokeWidth={H / 3.4}>
                {outStrokes.map((s, i) => (
                  <motion.path
                    key={i}
                    d={s.d}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={exit ? { pathLength: 1, opacity: 1 } : undefined}
                    transition={{ delay: s.delay, duration: 0.62, ease: [0.55, 0.05, 0.25, 1], opacity: { duration: 0.01, delay: s.delay } }}
                  />
                ))}
              </g>
            </mask>

            {/* the wordmark is painted in by a charcoal brush */}
            <mask id="pl-text" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect width={W} height={H} fill="#000" />
              <g filter="url(#pl-rough)" stroke="#fff" strokeLinecap="round" fill="none">
                <motion.path
                  d={`M ${x0} ${cy + fs * 0.04} C ${cx - tw * 0.2} ${cy - fs * 0.22}, ${cx + tw * 0.2} ${cy + fs * 0.26}, ${x1} ${cy}`}
                  strokeWidth={fs * 1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.85, duration: 1.2, ease: [0.5, 0.05, 0.25, 1], opacity: { delay: 0.85, duration: 0.01 } }}
                />
                <motion.path
                  d={`M ${x0 + fs * 0.2} ${cy - fs * 0.12} C ${cx - tw * 0.25} ${cy + fs * 0.2}, ${cx + tw * 0.25} ${cy - fs * 0.2}, ${x1 - fs * 0.1} ${cy + fs * 0.1}`}
                  strokeWidth={fs * 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 1.1, ease: [0.5, 0.05, 0.25, 1], opacity: { delay: 1.0, duration: 0.01 } }}
                />
              </g>
            </mask>

            {/* the logo mark blots in as a spreading dab of paint */}
            <mask id="pl-logo" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect width={W} height={H} fill="#000" />
              <g filter="url(#pl-rough)">
                <motion.circle
                  cx={cx}
                  cy={lcy}
                  fill="#fff"
                  initial={{ r: 0 }}
                  animate={{ r: lh * 1.05 }}
                  transition={{ delay: 0.55, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                />
              </g>
            </mask>
          </defs>

          <g mask={exit ? "url(#pl-out)" : undefined}>
            <rect width={W} height={H} fill={C.ivory} />

            {/* underpainting */}
            <Brush x0={-W * 0.04} x1={W * 1.04} y={cy} w={fs * 1.75} n={11} color={C.sand} delay={0} dur={1.15} seed={3} />
            <Brush x0={W * 0.06} x1={W * 0.93} y={cy - fs * 0.3} w={fs * 0.42} n={6} color={C.gold} delay={0.32} dur={0.95} seed={7} opacity={0.92} />
            <Brush x0={cx - tw * 0.4} x1={cx + tw * 0.34} y={cy - fs * 0.98} w={fs * 0.13} n={3} color={C.terracotta} delay={0.6} dur={0.8} seed={11} />

            {/* the mark */}
            <image href="/logo.png" x={cx - lh * 0.512} y={lcy - lh / 2} width={lh * 1.025} height={lh} mask="url(#pl-logo)" />

            {/* the wordmark */}
            <g mask="url(#pl-text)">
              <text
                x={cx}
                y={cy + fs * 0.3}
                textAnchor="middle"
                fill={C.charcoal}
                style={{ fontFamily: '"Fraunces Variable", "Fraunces", Georgia, serif', fontWeight: 300, fontSize: fs, letterSpacing: "-0.03em", fontVariationSettings: '"opsz" 144' }}
              >
                Art <tspan fill={C.gold}>&amp;</tspan> Artist
              </text>
            </g>

            {/* terracotta swash, then drips */}
            <Brush x0={cx - tw * 0.58} x1={cx + tw * 0.6} y={cy + fs * 0.62} w={fs * 0.2} n={5} color={C.terracotta} delay={1.8} dur={0.7} seed={19} tilt={-fs * 0.05} />
            <g stroke={C.terracotta} strokeLinecap="round" fill="none">
              {drips.map((d, i) => (
                <motion.path
                  key={i}
                  d={`M ${d.x} ${cy + fs * 0.66} v ${d.len}`}
                  strokeWidth={d.w}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: d.delay, duration: 0.8, ease: [0.4, 0, 0.6, 1], opacity: { delay: d.delay, duration: 0.01 } }}
                />
              ))}
            </g>

            {/* flecks of paint */}
            {splats.map(([ux, uy, ur], i) => (
              <motion.circle
                key={i}
                cx={cx + ux * fs}
                cy={cy + uy * fs}
                r={ur * fs}
                fill={splatColors[i]}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 12, delay: 1.9 + i * 0.06 }}
              />
            ))}
          </g>
        </svg>
      )}

      <motion.div className="preloader__count" animate={{ opacity: exit ? 0 : 1 }} transition={{ duration: 0.25 }}>
        {String(n).padStart(3, "0")}
      </motion.div>
    </motion.div>
  );
}
