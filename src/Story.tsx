import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { PhotoKey } from "./photos";
import { Photo } from "./ui";

/**
 * THE STORY, AS ONE SCENE
 * 01 The Problem — a lone artwork sits washed-out and blurred, easy to overlook.
 * 02 The Vision  — it comes into focus, into colour: it's been seen.
 * 03 The Journey — other artists appear around it and connect.
 * Scroll drives the whole thing.
 */

const CHAPTERS: { n: string; tag: string; title: string; body: ReactNode }[] = [
  {
    n: "01",
    tag: "The Problem",
    title: "A spark that fades in silence.",
    body: (
      <>
        <p>Every artist carries a story, a dream, and a spark that deserves to be seen. But too often, that spark fades in silence.</p>
        <p>Painters who couldn&rsquo;t find galleries. Filmmakers who couldn&rsquo;t find crews. Actors who didn&rsquo;t know where to start. Not just a lack of visibility — a lack of <em>connection.</em></p>
      </>
    ),
  },
  {
    n: "02",
    tag: "The Vision",
    title: "A home for creativity.",
    body: (
      <>
        <p>A place where art isn&rsquo;t lost in the noise, but celebrated. Where every creator, from any corner of India or the world, can connect, collaborate, and grow.</p>
        <p>Where portfolios become stories, projects become collaborations, and connections become lifelong partnerships.</p>
      </>
    ),
  },
  {
    n: "03",
    tag: "The Journey",
    title: "Born from one simple belief.",
    body: (
      <>
        <p>Art deserves more than applause — it deserves recognition, opportunity, and love.</p>
        <p>What started as an idea is now a vision: to make the art world more open, inclusive, and connected. Because when artists come together, something magical happens.</p>
      </>
    ),
  },
];

/* scroll windows in which each chapter is on screen: [fade-in start, full in, full out, fade-out end] */
const WIN: [number, number, number, number][] = [
  [0, 0, 0.26, 0.32],
  [0.3, 0.36, 0.58, 0.64],
  [0.62, 0.68, 1, 1],
];

function Chapter({ c, i, p }: { c: (typeof CHAPTERS)[number]; i: number; p: MotionValue<number> }) {
  const w = WIN[i];
  const opacity = useTransform(p, w, [i === 0 ? 1 : 0, 1, 1, i === 2 ? 1 : 0]);
  const y = useTransform(p, w, [i === 0 ? 0 : 28, 0, 0, i === 2 ? 0 : -28]);
  return (
    <motion.article className="chapter" style={{ opacity, y }}>
      <p className="chapter__tag">
        <span>{c.n}</span> {c.tag}
      </p>
      <h2 className="chapter__title">{c.title}</h2>
      <div className="chapter__body">{c.body}</div>
    </motion.article>
  );
}

function RailItem({ c, i, p }: { c: (typeof CHAPTERS)[number]; i: number; p: MotionValue<number> }) {
  const w = WIN[i];
  const opacity = useTransform(p, w, [i === 0 ? 1 : 0.35, 1, 1, i === 2 ? 1 : 0.35]);
  const fill = useTransform(p, [w[0], w[2] === 1 ? 1 : w[3]], [0, 1]);
  return (
    <motion.li style={{ opacity }}>
      <span className="rail__bar">
        <motion.span style={{ scaleX: fill }} />
      </span>
      <span className="rail__label">
        {c.n} {c.tag}
      </span>
    </motion.li>
  );
}

/* the people who find each other in chapter 03 */
const SATS: PhotoKey[] = ["kathak", "painterFloor", "clapper", "sitar", "potter", "designer", "stage", "dancers"];
const RING = 37; // % of the stage

function Satellite({ k, i, p }: { k: PhotoKey; i: number; p: MotionValue<number> }) {
  const a = (i / SATS.length) * Math.PI * 2 - Math.PI / 2 + 0.2;
  const cx = 50 + Math.cos(a) * RING;
  const cy = 50 + Math.sin(a) * RING;
  const start = 0.62 + i * 0.03;
  const end = Math.min(1, start + 0.14);
  const scale = useTransform(p, [start, end], [0.2, 1]);
  const opacity = useTransform(p, [start, end], [0, 1]);
  const line = useTransform(p, [start - 0.02, end], [0, 1]);
  return (
    <>
      <svg className="stage__lines" viewBox="0 0 100 100" aria-hidden>
        <motion.line x1="50" y1="50" x2={cx} y2={cy} pathLength={line} />
      </svg>
      <motion.div className="sframe sframe--sat" style={{ left: `${cx}%`, top: `${cy}%`, scale, opacity }}>
        <div className="sframe__img">
          <Photo k={k} w={360} />
        </div>
      </motion.div>
    </>
  );
}

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // the lone artwork: washed-out + blurred -> sharp + full colour
  const grey = useTransform(p, [0.08, 0.44], [1, 0]);
  const blur = useTransform(p, [0.08, 0.44], [7, 0]);
  const fade = useTransform(p, [0.08, 0.44], [0.55, 1]);
  const filter = useMotionTemplate`grayscale(${grey}) blur(${blur}px)`;
  const glow = useTransform(p, [0.1, 0.44, 0.7], [0, 1, 0.6]);
  const centerScale = useTransform(p, [0, 0.4, 0.62, 1], [0.94, 1, 1, 0.86]);
  const ring = useTransform(p, [0.6, 0.98], [0, 1]);

  return (
    <section className="story" id="story" ref={ref}>
      <div className="story__sticky">
        <div className="story__grid">
          <div className="story__text">
            <p className="eyebrow">About us — Why we built Art &amp; Artist</p>
            <div className="chapters">
              {CHAPTERS.map((c, i) => (
                <Chapter key={c.n} c={c} i={i} p={p} />
              ))}
            </div>
          </div>

          <div className="stage" aria-hidden>
            <motion.div className="stage__glow" style={{ opacity: glow }} />
            <svg className="stage__lines" viewBox="0 0 100 100">
              <motion.circle cx="50" cy="50" r={RING} pathLength={ring} />
            </svg>
            {SATS.map((k, i) => (
              <Satellite key={i} k={k} i={i} p={p} />
            ))}
            <motion.div className="sframe sframe--main" style={{ scale: centerScale, opacity: fade }}>
              <motion.div className="sframe__img" style={{ filter }}>
                <Photo k="miniature" w={700} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <ol className="rail" aria-hidden>
          {CHAPTERS.map((c, i) => (
            <RailItem key={c.n} c={c} i={i} p={p} />
          ))}
        </ol>
      </div>
    </section>
  );
}
