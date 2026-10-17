import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { Fragment, useRef, useState, type FormEvent } from "react";
import { PHOTOS, type PhotoKey } from "./photos";
import { Brand, EASE, Magnetic, Photo, Reveal, SplitText, scrollToId } from "./ui";

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
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };
  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <motion.header
        className="nav"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <a href="#top" className="nav__brand" data-cursor="Top" onClick={go("top")}>
          <Brand />
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="#story" onClick={go("story")}>Story</a>
          <a href="#tribe" onClick={go("tribe")}>Who it&rsquo;s for</a>
          <a href="#atelier" onClick={go("atelier")}>Atelier</a>
          <a href="/privacypolicy">Privacy Policy</a>
          <a href="/terms">Terms</a>
        </nav>
        <a href="#join" className="btn btn--lime btn--sm" onClick={go("join")}>
          Join Our Community
        </a>
      </motion.header>
    </>
  );
}

/* =========================================================
   PHOTO STRIPS — two rows that never stop moving, and speed
   up (and even reverse) with your scrolling
   ========================================================= */
const ROW_A: PhotoKey[] = ["kathak", "painterFloor", "filmSet", "sitar", "potter", "gallery", "stage", "designer"];
const ROW_B: PhotoKey[] = ["pichwai", "camera", "painterOutdoor", "dancers", "studio", "miniature", "lettering", "mural"];

function StripRow({ keys, dir, tall }: { keys: PhotoKey[]; dir: 1 | -1; tall: boolean }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(vel, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const dirRef = useRef<number>(dir);
  const wrapped = useTransform(x, (v) => `${(((v % 25) + 25) % 25) - 25}%`);
  useAnimationFrame((_, delta) => {
    const b = boost.get();
    if (b !== 0) dirRef.current = (b > 0 ? 1 : -1) * dir;
    x.set(x.get() + dirRef.current * (0.9 + Math.abs(b)) * (delta / 1000) * 1.7);
  });
  const items = [...keys, ...keys, ...keys, ...keys];
  return (
    <div className="strip__row">
      <motion.div className="strip__track" style={{ x: wrapped }}>
        {items.map((k, i) => (
          <figure key={i} className={`scard${tall ? " scard--tall" : ""}`} data-cursor="">
            <div className="scard__img">
              <Photo k={k} w={420} />
            </div>
            <figcaption>{PHOTOS[k].label}</figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="strip" aria-label="A glimpse of the community">
      <StripRow keys={ROW_A} dir={-1} tall />
      <StripRow keys={ROW_B} dir={1} tall={false} />
    </section>
  );
}

/* =========================================================
   MANIFESTO — words (and little photos) light up as you scroll
   ========================================================= */
type Item = { t: "w"; x: string } | { t: "c"; k: PhotoKey };

const MANIFESTO: (string | PhotoKey)[] = [
  "Art has always been more than expression —",
  "@paintClose",
  "it is a language that connects souls.",
  "@sitarClose",
  "But talent needs a home, not just a platform.",
  "@potter",
  "We are building a place where artists are discovered, collaborate, and grow together.",
  "@dancersJump",
  "Because art deserves more than applause — it deserves connection, recognition, and love.",
];

const ITEMS: Item[] = MANIFESTO.flatMap((s): Item[] =>
  s.startsWith("@") ? [{ t: "c", k: s.slice(1) as PhotoKey }] : s.split(" ").map((x) => ({ t: "w", x })),
);

function Piece({ it, p, range }: { it: Item; p: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(p, range, [0.13, 1]);
  const y = useTransform(p, range, [10, 0]);
  const sc = useTransform(p, range, [0.6, 1]);
  if (it.t === "c")
    return (
      <motion.span style={{ opacity: o, scale: sc }} className="chip" aria-hidden>
        <Photo k={it.k} w={320} />
      </motion.span>
    );
  return (
    <motion.span style={{ opacity: o, y }} className="word">
      {it.x}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  return (
    <section className="manifesto" id="manifesto" ref={ref}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">About us — Why we built Art &amp; Artist</p>
        </Reveal>
        <p className="manifesto__text">
          {ITEMS.map((it, i) => (
            <Piece key={i} it={it} p={scrollYProgress} range={[i / ITEMS.length, Math.min(1, (i + 4) / ITEMS.length)]} />
          ))}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   TRIBE — expanding disciplines
   ========================================================= */
const TRIBE: { name: string; line: string; k: PhotoKey }[] = [
  { name: "Painters", line: "Find the galleries and patrons that were looking for you.", k: "painterFloor" },
  { name: "Filmmakers", line: "Find your crew — the cinematographers, editors and composers.", k: "filmSet" },
  { name: "Actors", line: "Know where to start, and get seen by the people casting.", k: "stage" },
  { name: "Musicians", line: "Meet collaborators, stages and the ears that need your sound.", k: "sitar" },
  { name: "Designers", line: "Turn a portfolio into projects, partners and a practice.", k: "designer" },
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
              <Photo k={t.k} w={900} className="tcard__art" />
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
const STEPS: { n: string; t: string; d: string; bg: string; fg: string; k: PhotoKey }[] = [
  { n: "01", t: "Showcase", d: "Give your work a home. Portfolios become stories people actually stop and read.", bg: "var(--sand)", fg: "var(--charcoal)", k: "gallery" },
  { n: "02", t: "Connect", d: "Find like-minded people — the crew, the collaborator, the patron — wherever they are.", bg: "var(--ivory)", fg: "var(--charcoal)", k: "dancers" },
  { n: "03", t: "Collaborate", d: "Projects become collaborations. Ideas find hands, and hands find stages.", bg: "var(--terracotta)", fg: "var(--ivory)", k: "crew" },
  { n: "04", t: "Grow", d: "Connections become lifelong partnerships and meaningful careers.", bg: "var(--charcoal)", fg: "var(--ivory)", k: "painterSmile" },
];

function StepCard({ s, i, p }: { s: (typeof STEPS)[number]; i: number; p: MotionValue<number> }) {
  const target = 1 - (STEPS.length - 1 - i) * 0.06;
  const scale = useTransform(p, [i / STEPS.length, 1], [1, target - 0.04 * (STEPS.length - 1 - i)]);
  return (
    <motion.div className="step" style={{ top: `calc(12vh + ${i * 28}px)`, scale, background: s.bg, color: s.fg }}>
      <span className="step__n">{s.n}</span>
      <h3 className="step__t">{s.t}</h3>
      <p className="step__d">{s.d}</p>
      <div className="step__img">
        <Photo k={s.k} w={700} />
      </div>
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
const FEED: { tag: string; title: string; meta: string; k: PhotoKey }[] = [
  { tag: "Open call", title: "Group exhibition seeks new voices", meta: "Painters · Sculptors", k: "gallery" },
  { tag: "Casting", title: "Short film looking for its lead", meta: "Actors · Filmmakers", k: "stage" },
  { tag: "Collab", title: "Folk-meets-electronic EP needs a vocalist", meta: "Musicians", k: "studio" },
  { tag: "Feature", title: "Studio visit: a muralist at work", meta: "Fine art", k: "mural" },
  { tag: "Crew call", title: "Documentary needs a cinematographer", meta: "Filmmakers", k: "camera" },
  { tag: "Brief", title: "Identity for an independent gallery", meta: "Designers", k: "lettering" },
];

function FeedCard({ f }: { f: (typeof FEED)[number] }) {
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
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      data-cursor="Drag"
    >
      <div className="fcard__img">
        <Photo k={f.k} w={640} className="fcard__photo" />
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
          <p className="eyebrow">The Digital Atelier</p>
        </Reveal>
        <SplitText as="h2" className="h2" text="A curated stream, made only for artists." />
        <Reveal delay={0.1}>
          <p className="lede">
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
          {FEED.map((f) => (
            <FeedCard f={f} key={f.title} />
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

/* a gallery wall that never stops moving, behind the pass */
const WALL: { keys: PhotoKey[]; secs: number; up: boolean; drop: number }[] = [
  { keys: ["kathak", "camera", "potter", "gallery", "lettering", "sitar"], secs: 70, up: true, drop: 0 },
  { keys: ["pichwai", "painterSmile", "stage", "dancers", "brushes", "mural"], secs: 55, up: false, drop: -90 },
  { keys: ["miniature2", "filmSet", "painterOutdoor", "designer", "kathakali", "curtain"], secs: 80, up: true, drop: -30 },
  { keys: ["sitarClose", "crew", "easel", "dancersJump", "paintClose", "clapper"], secs: 62, up: false, drop: -130 },
  { keys: ["studio", "greenhouse", "miniature", "potter", "painterFloor", "stage"], secs: 74, up: true, drop: -60 },
  { keys: ["dancers", "lettering", "kathak", "mural", "camera", "pichwai"], secs: 58, up: false, drop: -110 },
  { keys: ["sitar", "painterFloor", "gallery", "brushes", "kathakali", "easel"], secs: 66, up: true, drop: -20 },
];

/** the membership pass: tilts toward your cursor, catches the light, gets stamped when you join */
function Pass({ state, onSubmit, burst }: { state: "idle" | "sending" | "done" | "error"; onSubmit: (e: FormEvent<HTMLFormElement>) => void; burst: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 16, mass: 0.6 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 16, mass: 0.6 });
  const sx = useMotionValue(30);
  const sy = useMotionValue(20);
  const sheen = useMotionTemplate`radial-gradient(480px circle at ${sx}% ${sy}%, rgba(246,241,233,0.9), rgba(183,154,107,0.38) 38%, rgba(183,154,107,0) 65%)`;
  return (
    <motion.div
      ref={ref}
      className="pass"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 70, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 12);
        rx.set(-(py - 0.5) * 12);
        sx.set(px * 100);
        sy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        sx.set(30);
        sy.set(20);
      }}
    >
      <div className="pass__body">
        <div className="pass__main">
          <header className="pass__head">
            <span className="pass__brand">
              <Brand />
            </span>
            <span className="pass__tag">Founding member</span>
          </header>

          <h3 className="pass__title">{state === "done" ? "You\u2019re on the list." : "Your seat at the table."}</h3>
          <p className="pass__text">
            {state === "done"
              ? "Welcome to the tribe. We\u2019ll email you the moment the doors open."
              : "Be first through the door when we open. Share your email and we\u2019ll let you know."}
          </p>

          <AnimatePresence mode="wait">
            {state === "done" ? (
              <motion.div key="ok" className="pass__ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE, duration: 0.6 }}>
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
                  <motion.path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.25 }} />
                </svg>
                <span>Confirmed</span>
                <Burst key={burst} />
              </motion.div>
            ) : (
              <motion.form key="form" className="pass__form" onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }}>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" required placeholder="you@yourstudio.com" autoComplete="email" disabled={state === "sending"} />
                <Magnetic strength={0.2}>
                  <button className="btn btn--ink" type="submit" disabled={state === "sending"} data-cursor="Send">
                    {state === "sending" ? "Sending…" : "Join the waitlist"} <span aria-hidden>→</span>
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
          {state === "error" && <p className="form__err" role="alert">Something went wrong — please try again.</p>}
        </div>

        <aside className="pass__stub" aria-hidden>
          <div className="pass__photo">
            <Photo k="kathak" w={360} />
          </div>
          <span className="pass__admit">Admit one artist</span>
          <span className="pass__year">Est. {new Date().getFullYear()}</span>
        </aside>

        <motion.div className="pass__sheen" style={{ backgroundImage: sheen }} aria-hidden />

        {state === "done" && (
          <motion.div
            className="stamp"
            initial={{ scale: 2.6, rotate: -26, opacity: 0 }}
            animate={{ scale: 1, rotate: -9, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.15 }}
            aria-hidden
          >
            Welcome
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function Join() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [burst, setBurst] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // the wall drifts gently as you scroll through
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wallY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

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
    <section
      className="join"
      id="join"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <motion.div className="join__wall" style={{ y: wallY }} aria-hidden>
        {WALL.map((c, i) => (
          <div key={i} className="wcol" style={{ marginTop: c.drop }}>
            <div className="wcol__track" style={{ animationDuration: `${c.secs}s`, animationDirection: c.up ? "normal" : "reverse" }}>
              {[...c.keys, ...c.keys].map((k, j) => (
                <div key={j} className="wcol__img">
                  <Photo k={k} w={360} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
      <div className="join__veil" aria-hidden />
      <div className="join__glow" aria-hidden />

      <div className="wrap join__inner">
        <Reveal>
          <p className="eyebrow">Art meets opportunity</p>
        </Reveal>
        <h2 className="join__title" aria-label="Join our community.">
          <SplitText text="Join our" />
          <br />
          <span className="hl2">
            <motion.i
              className="hl2__bar"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
            />
            <SplitText text="community." delay={0.15} />
          </span>
        </h2>
        <Pass state={state} onSubmit={submit} burst={burst} />
      </div>
    </section>
  );
}

function Burst() {
  const colors = ["#A65D3F", "#B79A6B", "#292522", "#DCD2C4"];
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
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>Back to top ↑</a>
        </div>
      </div>
      <div className="footer__word" aria-label="Art & Artist">
        {letters.map((c, i) => (
          <Fragment key={i}>
            <motion.span
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: i * 0.05 }}
              whileHover={{ y: "-6%", transition: { duration: 0.25 } }}
            >
              {c === " " ? " " : c === "&" ? <span className="amp">&amp;</span> : c}
            </motion.span>
          </Fragment>
        ))}
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Art &amp; Artist. All rights reserved.</p>
    </footer>
  );
}
