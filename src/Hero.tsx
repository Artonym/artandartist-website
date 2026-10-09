import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { Art, type Variant } from "./art";
import { EASE, Magnetic, SplitText, scrollToId } from "./ui";

type Tile = { x: number; y: number; w: number; depth: number; v: Variant; seed: number; pal: number; rot: number };

/* x/y = tile centre as % of the viewport, w = width in vw, depth = parallax + zoom-through strength */
const TILES: Tile[] = [
  { x: 12, y: 24, w: 14, depth: 1.1, v: "sun", seed: 3, pal: 0, rot: -4 },
  { x: 31, y: 11, w: 9, depth: 0.55, v: "mandala", seed: 5, pal: 2, rot: 3 },
  { x: 53, y: 9, w: 8, depth: 0.4, v: "film", seed: 8, pal: 1, rot: -2 },
  { x: 75, y: 15, w: 13, depth: 1, v: "figure", seed: 2, pal: 3, rot: 5 },
  { x: 91, y: 33, w: 9, depth: 0.7, v: "blobs", seed: 11, pal: 4, rot: -6 },
  { x: 7, y: 56, w: 9, depth: 0.65, v: "arches", seed: 4, pal: 5, rot: 4 },
  { x: 92, y: 66, w: 12, depth: 1.2, v: "stripes", seed: 9, pal: 0, rot: 3 },
  { x: 17, y: 82, w: 12, depth: 0.95, v: "waves", seed: 6, pal: 1, rot: -3 },
  { x: 38, y: 88, w: 8, depth: 0.45, v: "figure", seed: 13, pal: 2, rot: 6 },
  { x: 61, y: 86, w: 11, depth: 0.85, v: "mandala", seed: 14, pal: 3, rot: -5 },
  { x: 82, y: 86, w: 9, depth: 0.6, v: "sun", seed: 21, pal: 4, rot: 2 },
  { x: 96, y: 10, w: 6, depth: 0.35, v: "blobs", seed: 17, pal: 5, rot: -8 },
];

function FloatingTile({
  t,
  i,
  progress,
  mx,
  my,
  ready,
  still,
}: {
  t: Tile;
  i: number;
  progress: MotionValue<number>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  ready: boolean;
  still: boolean;
}) {
  // telescope "zoom-through": tiles slide outward and swell as you scroll
  const dx = useTransform(progress, [0, 1], [0, (t.x - 50) * t.depth * 2.3]);
  const dy = useTransform(progress, [0, 1], [0, (t.y - 50) * t.depth * 2.3]);
  const scale = useTransform(progress, [0, 1], [1, 1 + t.depth * 2.4]);
  const opacity = useTransform(progress, [0, 0.55, 0.85], [1, 1, 0]);
  const px = useTransform(mx, (v) => v * t.depth * 26);
  const py = useTransform(my, (v) => v * t.depth * 26);
  const xs = useTransform(dx, (v) => `${v}vw`);
  const ys = useTransform(dy, (v) => `${v}vh`);

  return (
    <motion.div
      className="tile-pos"
      style={{ left: `${t.x}%`, top: `${t.y}%`, x: still ? 0 : xs, y: still ? 0 : ys, scale: still ? 1 : scale, opacity }}
    >
      <motion.div style={{ x: px, y: py }}>
        <motion.div
          className="tile"
          style={{ width: `clamp(64px, ${t.w}vw, 260px)`, rotate: t.rot }}
          initial={{ opacity: 0, scale: 0.4, filter: "blur(14px)" }}
          animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : undefined}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 + i * 0.07 }}
          data-cursor=""
        >
          <div className="tile__float" style={{ animationDelay: `${-i * 0.9}s`, animationDuration: `${7 + (i % 5)}s` }}>
            <Art variant={t.v} seed={t.seed} palette={t.pal} className="tile__art" />
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

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  const h1Opacity = useTransform(progress, [0, 0.28], [1, 0]);
  const h1Scale = useTransform(progress, [0, 0.3], [1, 1.18]);
  const h1Y = useTransform(progress, [0, 0.3], [0, -60]);
  const h2Opacity = useTransform(progress, [0.38, 0.58], [0, 1]);
  const h2Scale = useTransform(progress, [0.38, 0.7], [0.82, 1]);
  const h2Y = useTransform(progress, [0.38, 0.7], [40, 0]);
  const hint = useTransform(progress, [0, 0.08], [1, 0]);
  const glow = useTransform(progress, [0, 1], [0.0, 1]);

  return (
    <section className="hero" ref={ref} id="top">
      <div className="hero__sticky">
        <motion.div className="hero__glow" style={{ opacity: glow }} />
        {TILES.map((t, i) => (
          <FloatingTile key={i} t={t} i={i} progress={progress} mx={mx} my={my} ready={ready} still={still} />
        ))}

        <motion.div className="hero__copy" style={{ opacity: h1Opacity, scale: h1Scale, y: h1Y }}>
          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            <span className="kicker__dot" /> Join a network · Coming soon
          </motion.p>
          <h1 className="hero__title" aria-label="Where imagination becomes opportunity">
            <SplitText text="Where" delay={0.6} trigger={ready} />{" "}
            <SplitText text="imagination" className="it" delay={0.68} trigger={ready} />
            <br />
            <SplitText text="becomes" delay={0.76} trigger={ready} />{" "}
            <span className="hl">
              <SplitText text="opportunity." delay={0.84} trigger={ready} />
            </span>
          </h1>
        </motion.div>

        <motion.div className="hero__copy hero__copy--2" style={{ opacity: h2Opacity, scale: h2Scale, y: h2Y }}>
          <p className="hero__second">
            Art meets <em>opportunity.</em>
          </p>
          <p className="hero__sub">A home for every creator — painters, filmmakers, actors, musicians and designers.</p>
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
