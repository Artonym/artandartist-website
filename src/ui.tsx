import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";
import Lenis from "lenis";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- smooth scroll (Lenis) ---------- */
let lenis: Lenis | null = null;
export const scrollLock = (lock: boolean) => (lock ? lenis?.stop() : lenis?.start());
export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export function useSmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    if (import.meta.env.DEV) (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, [reduce]);
}

/* ---------- reveal text, word by word, masked ---------- */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  trigger = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const show = inView && trigger;
  const words = text.split(" ");
  const Comp = motion[Tag] as typeof motion.span;
  return (
    <Comp ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask" aria-hidden>
            <motion.span
              className="mask__inner"
              initial={{ y: "115%", rotate: 4 }}
              animate={show ? { y: "0%", rotate: 0 } : undefined}
              transition={{ duration: 1, ease: EASE, delay: delay + i * 0.055 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Comp>
  );
}

/* ---------- generic fade/translate on view ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- custom cursor ---------- */
export function Cursor() {
  const [fine, setFine] = useState(false);
  const [label, setLabel] = useState("");
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });
  const rx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 140, damping: 18, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    if (!mq.matches) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input");
      setHot(!!t);
      setLabel(t?.dataset.cursor ?? "");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!fine) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x: sx, y: sy }} animate={{ scale: hot ? 0 : 1 }} />
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry }}
        animate={{ width: hot ? (label ? 92 : 56) : 34, height: hot ? (label ? 92 : 56) : 34 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <span>{label}</span>
      </motion.div>
    </>
  );
}

/* ---------- preloader ---------- */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    scrollLock(true);
    const c = animate(0, 100, {
      duration: 1.9,
      ease: [0.6, 0, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        setOut(true);
        setTimeout(() => {
          onDone();
          scrollLock(false);
        }, 250);
      },
    });
    return () => c.stop();
  }, [onDone]);
  return (
    <motion.div
      className="preloader"
      initial={false}
      animate={out ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1, ease: EASE }}
      aria-hidden
    >
      <motion.img
        className="preloader__logo"
        src="/logo.png"
        alt=""
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: out ? 0 : 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <div className="preloader__word">
        {"Art & Artist".split("").map((c, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: out ? "-110%" : "0%" }}
            transition={{ duration: 0.9, ease: EASE, delay: out ? i * 0.02 : 0.15 + i * 0.045 }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </div>
      <div className="preloader__count">{String(n).padStart(3, "0")}</div>
      <div className="preloader__bar" style={{ transform: `scaleX(${n / 100})` }} />
    </motion.div>
  );
}

export function Brand() {
  return (
    <>
      <img className="brand__logo" src="/logo.png" alt="" width="41" height="40" />
      <span>
        Art <span className="amp">&amp;</span> Artist
      </span>
    </>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden>
      <path d="M20 0 L23 15 L38 12 L26 22 L36 34 L21 28 L20 40 L17 26 L3 33 L13 21 L2 10 L16 15 Z" fill="currentColor" />
    </svg>
  );
}

export type MV = MotionValue<number>;
