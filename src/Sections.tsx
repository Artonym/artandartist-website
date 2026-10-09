import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Art, type Variant } from "./art";
import { Brand, EASE, Magnetic, Reveal, SplitText, Star, scrollToId } from "./ui";

/* =========================================================
   NAV — floating pill, hides on scroll down, returns on up
   ========================================================= */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <motion.header
        className="nav"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <a href="#top" className="nav__brand" data-cursor="Top" onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>
          <Brand />
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="#story" onClick={(e) => { e.preventDefault(); scrollToId("story"); }}>Story</a>
          <a href="#tribe" onClick={(e) => { e.preventDefault(); scrollToId("tribe"); }}>Who it&rsquo;s for</a>
          <a href="#atelier" onClick={(e) => { e.preventDefault(); scrollToId("atelier"); }}>Atelier</a>
          <a href="/privacypolicy">Privacy Policy</a>
        </nav>
        <a href="#join" className="btn btn--lime btn--sm" onClick={(e) => { e.preventDefault(); scrollToId("join"); }}>
          Join Our Community
        </a>
      </motion.header>
    </>
  );
}

/* =========================================================
   MARQUEE — speeds up with scroll velocity
   ========================================================= */
const WORDS = ["Painters", "Filmmakers", "Actors", "Musicians", "Designers", "Dancers", "Storytellers", "Makers"];

function Row({ dir, outline }: { dir: 1 | -1; outline?: boolean }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(vel, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const dirRef = useRef<number>(dir);
  const wrapped = useTransform(x, (v) => `${(((v % 25) + 25) % 25) - 25}%`);
  useAnimationFrame((_, delta) => {
    const b = boost.get();
    if (b !== 0) dirRef.current = (b > 0 ? 1 : -1) * dir;
    x.set(x.get() + dirRef.current * (0.9 + Math.abs(b)) * (delta / 1000) * 1.8);
  });
  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div className="marquee__row">
      <motion.div className={`marquee__track ${outline ? "is-outline" : ""}`} style={{ x: wrapped }}>
        {items.map((w, i) => (
          <span key={i} className="marquee__item">
            {w}
            <Star className="marquee__star" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="marquee" aria-label="Disciplines we celebrate">
      <Row dir={-1} />
      <Row dir={1} outline />
    </section>
  );
}

/* =========================================================
   MANIFESTO — words light up as you scroll
   ========================================================= */
function Word({ children, p, range }: { children: string; p: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(p, range, [0.14, 1]);
  const y = useTransform(p, range, [8, 0]);
  return (
    <motion.span style={{ opacity: o, y }} className="word">
      {children}
    </motion.span>
  );
}

const MANIFESTO =
  "Art has always been more than expression — it is a language that connects souls. But talent needs a home, not just a platform. We are building a place where artists are discovered, collaborate, and grow together. Because art deserves more than applause — it deserves connection, recognition, and love.";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const words = MANIFESTO.split(" ");
  return (
    <section className="manifesto" id="manifesto" ref={ref}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">About us — Why we built Art &amp; Artist</p>
        </Reveal>
        <p className="manifesto__text">
          {words.map((w, i) => (
            <Word key={i} p={scrollYProgress} range={[i / words.length, Math.min(1, (i + 4) / words.length)]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   STORY — pinned horizontal scroll: Problem / Vision / Journey
   ========================================================= */
const STORY: { n: string; tag: string; title: string; body: ReactNode; v: Variant; pal: number }[] = [
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
    v: "figure",
    pal: 3,
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
    v: "arches",
    pal: 0,
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
    v: "sun",
    pal: 2,
  },
];

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(STORY.length - 1) * (100 / STORY.length)}%`]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="story" id="story" ref={ref} style={{ height: `${STORY.length * 100 + 40}vh` }}>
      <div className="story__sticky">
        <motion.div className="story__track" style={{ x, width: `${STORY.length * 100}vw` }}>
          {STORY.map((s, i) => (
            <article className="panel" key={s.n}>
              <div className="panel__text">
                <p className="panel__tag">
                  <span>{s.n}</span> {s.tag}
                </p>
                <h2 className="panel__title">{s.title}</h2>
                <div className="panel__body">{s.body}</div>
              </div>
              <PanelArt v={s.v} pal={s.pal} p={scrollYProgress} i={i} />
            </article>
          ))}
        </motion.div>
        <div className="story__rail" aria-hidden>
          <motion.span style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  );
}

function PanelArt({ v, pal, p, i }: { v: Variant; pal: number; p: MotionValue<number>; i: number }) {
  const mid = i / (STORY.length - 1 || 1);
  const rot = useTransform(p, [mid - 0.5, mid, mid + 0.5], [-10, 0, 10], { clamp: false });
  const sc = useTransform(p, [mid - 0.35, mid, mid + 0.35], [0.82, 1, 0.82]);
  return (
    <motion.div className="panel__art" style={{ rotate: rot, scale: sc }} data-cursor="">
      <Art variant={v} seed={i + 40} palette={pal} className="panel__svg" label={`Illustration for ${v}`} />
    </motion.div>
  );
}

/* =========================================================
   TRIBE — expanding disciplines
   ========================================================= */
const TRIBE: { name: string; line: string; v: Variant; pal: number }[] = [
  { name: "Painters", line: "Find the galleries and patrons that were looking for you.", v: "blobs", pal: 0 },
  { name: "Filmmakers", line: "Find your crew — the cinematographers, editors and composers.", v: "film", pal: 1 },
  { name: "Actors", line: "Know where to start, and get seen by the people casting.", v: "figure", pal: 3 },
  { name: "Musicians", line: "Meet collaborators, stages and the ears that need your sound.", v: "waves", pal: 2 },
  { name: "Designers", line: "Turn a portfolio into projects, partners and a practice.", v: "mandala", pal: 4 },
];

export function Tribe() {
  const [open, setOpen] = useState(0);
  return (
    <section className="tribe" id="tribe">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Who it&rsquo;s for</p>
        </Reveal>
        <SplitText as="h2" className="h2" text="Find your people. Find your tribe." />
        <div className="tribe__row" role="tablist" aria-label="Disciplines">
          {TRIBE.map((t, i) => (
            <motion.button
              key={t.name}
              role="tab"
              aria-selected={open === i}
              className={`tcard ${open === i ? "is-open" : ""}`}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              layout
              transition={{ duration: 0.7, ease: EASE }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              data-cursor=""
            >
              <Art variant={t.v} seed={i + 70} palette={t.pal} className="tcard__art" />
              <span className="tcard__shade" />
              <span className="tcard__index">0{i + 1}</span>
              <span className="tcard__name">{t.name}</span>
              <AnimatePresence>
                {open === i && (
                  <motion.span
                    className="tcard__line"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                  >
                    {t.line}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS — stacking cards
   ========================================================= */
const STEPS = [
  { n: "01", t: "Showcase", d: "Give your work a home. Portfolios become stories people actually stop and read.", bg: "var(--turmeric)", fg: "var(--ink)" },
  { n: "02", t: "Connect", d: "Find like-minded people — the crew, the collaborator, the patron — wherever they are.", bg: "var(--indigo)", fg: "var(--paper)" },
  { n: "03", t: "Collaborate", d: "Projects become collaborations. Ideas find hands, and hands find stages.", bg: "var(--vermilion)", fg: "var(--paper)" },
  { n: "04", t: "Grow", d: "Connections become lifelong partnerships and meaningful careers.", bg: "var(--ink)", fg: "var(--lime)" },
];

function StepCard({ s, i, p }: { s: (typeof STEPS)[number]; i: number; p: MotionValue<number> }) {
  const target = 1 - (STEPS.length - 1 - i) * 0.06;
  const scale = useTransform(p, [i / STEPS.length, 1], [1, target - 0.04 * (STEPS.length - 1 - i)]);
  return (
    <motion.div className="step" style={{ top: `calc(12vh + ${i * 28}px)`, scale, background: s.bg, color: s.fg }}>
      <span className="step__n">{s.n}</span>
      <h3 className="step__t">{s.t}</h3>
      <p className="step__d">{s.d}</p>
      <Art variant={(["sun", "mandala", "stripes", "waves"] as Variant[])[i]} seed={i + 90} palette={i} className="step__art" />
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="process" ref={ref}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">How it works</p>
        </Reveal>
        <SplitText as="h2" className="h2" text="Where portfolios become stories." />
        <div className="process__stack">
          {STEPS.map((s, i) => (
            <StepCard key={s.n} s={s} i={i} p={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ATELIER — draggable preview of the curated stream
   ========================================================= */
const FEED: { tag: string; title: string; meta: string; v: Variant; pal: number }[] = [
  { tag: "Open call", title: "Group exhibition seeks new voices", meta: "Painters · Sculptors", v: "blobs", pal: 1 },
  { tag: "Casting", title: "Short film looking for its lead", meta: "Actors · Filmmakers", v: "film", pal: 0 },
  { tag: "Collab", title: "Folk-meets-electronic EP needs a vocalist", meta: "Musicians", v: "waves", pal: 2 },
  { tag: "Feature", title: "Studio visit: a muralist at work", meta: "Fine art", v: "arches", pal: 4 },
  { tag: "Crew call", title: "Documentary needs a cinematographer", meta: "Filmmakers", v: "stripes", pal: 3 },
  { tag: "Brief", title: "Identity for an independent gallery", meta: "Designers", v: "mandala", pal: 5 },
];

function FeedCard({ f, i }: { f: (typeof FEED)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      className="fcard"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      data-cursor="Drag"
    >
      <div className="fcard__img">
        <Art variant={f.v} seed={i + 120} palette={f.pal} className="fcard__art" />
        <span className="fcard__tag">{f.tag}</span>
      </div>
      <h3 className="fcard__title">{f.title}</h3>
      <p className="fcard__meta">{f.meta}</p>
    </motion.div>
  );
}

export function Atelier() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const measure = () => {
    if (wrap.current && track.current) setLimit(Math.min(0, wrap.current.clientWidth - track.current.scrollWidth));
  };
  return (
    <section className="atelier" id="atelier">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow eyebrow--light">The Digital Atelier</p>
        </Reveal>
        <SplitText as="h2" className="h2 h2--light" text="A curated stream, made only for artists." />
        <Reveal delay={0.1}>
          <p className="lede lede--light">
            Explore fine art, creative updates and opportunities tailored exclusively for artists and art professionals.
          </p>
        </Reveal>
      </div>
      <div className="atelier__viewport" ref={wrap}>
        <motion.div
          className="atelier__track"
          ref={track}
          drag="x"
          dragConstraints={{ left: limit, right: 0 }}
          dragElastic={0.12}
          onViewportEnter={measure}
          whileTap={{ cursor: "grabbing" }}
        >
          {FEED.map((f, i) => (
            <FeedCard f={f} i={i} key={f.title} />
          ))}
        </motion.div>
      </div>
      <p className="atelier__note">Sneak peek · sample content — drag to explore</p>
    </section>
  );
}

/* =========================================================
   JOIN — waitlist
   ========================================================= */
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

export function Join() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [burst, setBurst] = useState(0);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("sending");
    try {
      if (ENDPOINT) {
        const r = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!r.ok) throw new Error(String(r.status));
      }
      setState("done");
      setBurst((b) => b + 1);
    } catch {
      setState("error");
    }
  };
  return (
    <section className="join" id="join">
      <div className="join__stars" aria-hidden>
        {[...Array(6)].map((_, i) => (
          <motion.span key={i} animate={{ rotate: 360 }} transition={{ duration: 18 + i * 4, repeat: Infinity, ease: "linear" }} style={{ left: `${8 + i * 17}%`, top: `${(i % 3) * 28 + 8}%` }}>
            <Star />
          </motion.span>
        ))}
      </div>
      <div className="wrap join__inner">
        <Reveal>
          <p className="eyebrow">Art meets opportunity</p>
        </Reveal>
        <SplitText as="h2" className="join__title" text="Join our community." />
        <Reveal delay={0.15}>
          <p className="lede">Be first through the door when we open. Share your email and we&rsquo;ll let you know.</p>
        </Reveal>
        <Reveal delay={0.25}>
          <form className="form" onSubmit={submit} noValidate={false}>
            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div key="ok" className="form__ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: EASE, duration: 0.6 }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
                    <motion.path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 }} />
                  </svg>
                  You&rsquo;re on the list. Welcome to the tribe.
                  <Burst key={burst} />
                </motion.div>
              ) : (
                <motion.div key="form" className="form__row" exit={{ opacity: 0, y: -10 }}>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" required placeholder="you@yourstudio.com" autoComplete="email" disabled={state === "sending"} />
                  <Magnetic strength={0.25}>
                    <button className="btn btn--ink" type="submit" disabled={state === "sending"} data-cursor="Send">
                      {state === "sending" ? "Sending…" : "Join the waitlist"}
                    </button>
                  </Magnetic>
                </motion.div>
              )}
            </AnimatePresence>
            {state === "error" && <p className="form__err" role="alert">Something went wrong — please try again.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Burst() {
  const colors = ["#E2492B", "#22256B", "#F2B52A", "#16130E", "#1E6B52"];
  return (
    <span className="burst" aria-hidden>
      {Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2;
        const d = 90 + ((i * 37) % 80);
        return (
          <motion.i
            key={i}
            style={{ background: colors[i % colors.length] }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 0, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
          />
        );
      })}
    </span>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */
export function Footer() {
  const letters = "Art & Artist".split("");
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <p>Art deserves more than applause.</p>
        <div className="footer__links">
          <a href="/privacypolicy">Privacy Policy</a>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>Back to top ↑</a>
        </div>
      </div>
      <div className="footer__word" aria-label="Art & Artist">
        {letters.map((c, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.05 }}
            whileHover={{ y: "-6%", transition: { duration: 0.25 } }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Art &amp; Artist. All rights reserved.</p>
    </footer>
  );
}
