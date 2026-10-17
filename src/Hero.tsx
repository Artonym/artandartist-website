import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PHOTOS, type PhotoKey } from "./photos";
import { EASE, Magnetic, Photo, Rotator, SplitText, scrollToId } from "./ui";

/**
 * THE LIVING COLLAGE
 * Real work from real artists floats around the headline. It drifts on its own, drifts away from
 * your cursor like it's alive, and rushes past as you scroll (the "telescope" zoom).
 */

type Tile = {
  k: PhotoKey;
  x: number; // centre, % of viewport width
  xs?: number; // ...on phones, if it needs to sit elsewhere
  ys?: number;
  y: number; // centre, % of viewport height
  w: number; // width in vw
  ratio: string; // css aspect-ratio
  depth: number; // parallax / zoom-through / repel strength
  phone?: boolean; // keep on small screens
};

const TILES: Tile[] = [
  { k: "kathak", x: 10, xs: 13, y: 28, w: 13, ratio: "3 / 4", depth: 1.0, phone: true },
  { k: "pichwai", x: 30, y: 14, w: 10, ratio: "1 / 1", depth: 0.6, phone: true },
  { k: "clapper", x: 51, y: 12, w: 10, ratio: "4 / 3", depth: 0.4 },
  { k: "miniature", x: 76, xs: 69, y: 20, w: 11, ratio: "3 / 4", depth: 1.0, phone: true },
  { k: "painterFloor", x: 92, xs: 83, ys: 67, y: 43, w: 9, ratio: "4 / 5", depth: 0.7, phone: true },
  { k: "potter", x: 7, y: 63, w: 9, ratio: "1 / 1", depth: 0.65 },
  { k: "sitar", x: 90, y: 72, w: 11, ratio: "3 / 4", depth: 1.2 },
  { k: "painterOutdoor", x: 18, y: 84, w: 14, ratio: "4 / 3", depth: 0.95, phone: true },
  { k: "stage", x: 38, y: 89, w: 8, ratio: "3 / 4", depth: 0.45 },
  { k: "dancers", x: 63, y: 87, w: 12, ratio: "4 / 3", depth: 0.85 },
  { k: "studio", x: 83, y: 90, w: 8, ratio: "1 / 1", depth: 0.6 },
  { k: "designer", x: 46, y: 75, w: 9, ratio: "4 / 5", depth: 0.5, phone: true },
];

type Motion = { progress: MotionValue<number>; px: MotionValue<number>; py: MotionValue<number> };

function useIsPhone() {
  const [phone, setPhone] = useState(() => typeof window !== "undefined" && window.innerWidth <= 520);
  useEffect(() => {
    const on = () => setPhone(window.innerWidth <= 520);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return phone;
}

function FloatingTile({ t: base, i, m, ready, still }: { t: Tile; i: number; m: Motion; ready: boolean; still: boolean }) {
  const phone = useIsPhone();
  const t = phone ? { ...base, x: base.xs ?? base.x, y: base.ys ?? base.y } : base;
  // 1) telescope zoom-through on scroll
  const dx = useTransform(m.progress, [0, 1], [0, (t.x - 50) * t.depth * 2.1]);
  const dy = useTransform(m.progress, [0, 1], [0, (t.y - 50) * t.depth * 2.1]);
  const scale = useTransform(m.progress, [0, 1], [1, 1 + t.depth * 1.8]);
  const opacity = useTransform(m.progress, [0, 0.5, 0.78], [1, 1, 0]);
  const xs = useTransform(dx, (v) => `${v}vw`);
  const ys = useTransform(dy, (v) => `${v}vh`);

  // 2) it shies away from the cursor, then settles back like it's on springs
  const repelX = useTransform([m.px, m.py], ([cx, cy]: number[]) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ddx = (t.x / 100) * w - cx;
    const ddy = (t.y / 100) * h - cy;
    const d = Math.hypot(ddx, ddy) || 1;
    const k = Math.max(0, 1 - d / (Math.min(w, h) * 0.38));
    return (ddx / d) * k * k * (40 + t.depth * 70);
  });
  const repelY = useTransform([m.px, m.py], ([cx, cy]: number[]) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ddx = (t.x / 100) * w - cx;
    const ddy = (t.y / 100) * h - cy;
    const d = Math.hypot(ddx, ddy) || 1;
    const k = Math.max(0, 1 - d / (Math.min(w, h) * 0.38));
    return (ddy / d) * k * k * (40 + t.depth * 70);
  });
  const rx = useSpring(repelX, { stiffness: 110, damping: 14, mass: 0.7 });
  const ry = useSpring(repelY, { stiffness: 110, damping: 14, mass: 0.7 });

  return (
    <motion.div
      className={`tile-pos${t.phone ? "" : " tile-pos--hide-sm"}`}
      style={{ left: `${t.x}%`, top: `${t.y}%`, x: still ? 0 : xs, y: still ? 0 : ys, scale: still ? 1 : scale, opacity }}
    >
      <motion.div style={{ x: still ? 0 : rx, y: still ? 0 : ry }}>
        <motion.div
          className="tile"
          style={{ width: `clamp(64px, ${t.w}vw, 250px)` }}
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.07 }}
        >
          <div className="tile__float" style={{ animationDelay: `${-i * 1.1}s`, animationDuration: `${8 + (i % 5) * 1.3}s` }}>
            <div className="tile__img" style={{ aspectRatio: t.ratio }}>
              <Photo k={t.k} w={520} eager className="tile__photo" />
            </div>
            <span className="tile__label">{PHOTOS[t.k].label}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const still = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  /* the "cursor". With no pointer around (phones, idle desktops) a virtual one wanders the page,
     so the collage is always gently moving. */
  const tx = useMotionValue(-999);
  const ty = useMotionValue(-999);
  const px = useSpring(tx, { stiffness: 90, damping: 18, mass: 0.5 });
  const py = useSpring(ty, { stiffness: 90, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (still) return;
    let last = -1e9;
    let raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      last = performance.now();
      tx.set(e.clientX);
      ty.set(e.clientY);
    };
    const loop = (t: number) => {
      if (t - last > 2200) {
        const a = t / 1000;
        tx.set(window.innerWidth * (0.5 + 0.38 * Math.sin(a * 0.42)));
        ty.set(window.innerHeight * (0.5 + 0.32 * Math.sin(a * 0.67 + 1.1)));
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [still, tx, ty]);

  const h1o = useTransform(progress, [0.08, 0.26], [1, 0]);
  const h1s = useTransform(progress, [0.08, 0.28], [1, 1.12]);
  const h1y = useTransform(progress, [0.08, 0.28], [0, -50]);
  const h2o = useTransform(progress, [0.3, 0.46, 0.76, 0.9], [0, 1, 1, 0]);
  const h2s = useTransform(progress, [0.3, 0.55], [0.88, 1]);
  const h2y = useTransform(progress, [0.3, 0.55], [40, 0]);
  const hint = useTransform(progress, [0, 0.06], [1, 0]);
  const glowShift = useTransform(progress, [0, 1], [0, -120]);

  const m: Motion = { progress, px, py };

  return (
    <section className={`hero${ready ? " is-ready" : ""}`} ref={ref} id="top">
      <div className="hero__sticky">
        {/* ambient colour that slowly breathes behind everything */}
        <motion.div className="hero__glows" style={{ y: glowShift }} aria-hidden>
          <span className="glow glow--lime" />
          <span className="glow glow--peach" />
        </motion.div>

        {TILES.map((t, i) => (
          <FloatingTile key={i} t={t} i={i} m={m} ready={ready} still={still} />
        ))}

        <motion.div className="hero__copy" style={{ opacity: h1o, scale: h1s, y: h1y }}>
          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          >
            <span className="kicker__dot" aria-hidden /> Join a network · Coming soon
          </motion.p>
          <h1 className="hero__title" aria-label="Where imagination becomes opportunity">
            <SplitText text="Where imagination" delay={0.7} trigger={ready} />
            <br />
            <SplitText text="becomes" delay={0.85} trigger={ready} />{" "}
            <span className="hl">
              <SplitText text="opportunity." delay={0.95} trigger={ready} />
            </span>
          </h1>
          <motion.p
            className="hero__for"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
          >
            A home for <Rotator words={["painters", "filmmakers", "actors", "musicians", "designers", "dancers", "storytellers"]} />
          </motion.p>
        </motion.div>

        <motion.div className="hero__copy hero__copy--2" style={{ opacity: h2o, scale: h2s, y: h2y }}>
          <p className="hero__second">
            Art meets <em>opportunity.</em>
          </p>
          <p className="hero__sub">Be discovered, collaborate, and grow — together.</p>
          <Magnetic>
            <button className="btn btn--ink" data-cursor="Join" onClick={() => scrollToId("join")}>
              Join our community <span aria-hidden>→</span>
            </button>
          </Magnetic>
        </motion.div>

        <motion.button
          className="scroll-hint"
          style={{ opacity: hint }}
          onClick={() => scrollToId("manifesto")}
          aria-label="Scroll to discover more"
          data-cursor="Scroll"
        >
          <span>Discover more</span>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M12 4v15m0 0l-6-6m6 6l6-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}
