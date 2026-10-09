import { motion, useScroll, useSpring } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { POLICY, POLICY_META, type Block } from "./privacyData";
import { Brand, EASE, scrollToId, useSmoothScroll } from "./ui";

const LINK = /(tech@artonym\.in|www\.artandartist\.co\.in)/g;
const BOLD = ["Child Safety / CSAE Reporting Email:", "Art & Artist / Artonym Pvt. Ltd.", "Company:"];

/* turn the contact email / website into real links, and bold the contact labels */
function linkify(text: string): ReactNode {
  const label = BOLD.find((b) => text.startsWith(b));
  if (label)
    return (
      <>
        <strong>{label}</strong>
        {linkify(text.slice(label.length))}
      </>
    );
  return text.split(LINK).map((part, i) => {
    if (part === "tech@artonym.in") return <a key={i} href={`mailto:${part}`}>{part}</a>;
    if (part === "www.artandartist.co.in") return <a key={i} href={`https://${part}`}>{part}</a>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return <p>{linkify(b.x)}</p>;
    case "h3":
      return <h3>{b.x}</h3>;
    case "ul":
      return (
        <ul>
          {b.x.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
      );
    case "path":
      return <p className="policy__path">{b.x}</p>;
    case "lines":
      return (
        <p className="policy__lines">
          {b.x.map((l, i) => (
            <span key={i}>{linkify(l)}</span>
          ))}
        </p>
      );
  }
}

export default function PrivacyPage() {
  useSmoothScroll();
  const [active, setActive] = useState(POLICY[0].id);
  const toc = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.title = "Privacy Policy — Art & Artist";
    // honour deep links such as /privacypolicy#section-11
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 400);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -70% 0px" },
    );
    POLICY.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // keep the highlighted TOC entry in view inside the sidebar
  useEffect(() => {
    const box = toc.current;
    const el = box?.querySelector<HTMLElement>("a.is-active");
    if (!box || !el) return;
    const top = el.offsetTop - box.offsetTop;
    if (top < box.scrollTop || top + el.offsetHeight > box.scrollTop + box.clientHeight)
      box.scrollTo({ top: top - box.clientHeight / 2, behavior: "smooth" });
  }, [active]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    history.replaceState(null, "", `#${id}`);
    scrollToId(id);
  };

  return (
    <div className="policy">
      <motion.div className="progress" style={{ scaleX: bar }} />
      <header className="policy__bar">
        <a href="/" className="nav__brand">
          <Brand />
        </a>
        <a href="/" className="btn btn--lime btn--sm">← Back to Home</a>
      </header>

      <div className="policy__layout">
        <aside className="policy__toc" aria-label="On this page" ref={toc}>
          <p className="eyebrow">On this page</p>
          <ul>
            {POLICY.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? "is-active" : ""} onClick={go(s.id)}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="policy__main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
            <p className="eyebrow">Privacy Policy</p>
            <h1 className="policy__title">Art &amp; Artist</h1>
            <p className="policy__op">Operated by {POLICY_META.operator}</p>
            <p className="policy__updated">Last updated: {POLICY_META.updated}</p>
            <div className="policy__intro">
              {POLICY_META.intro.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </motion.div>

          {POLICY.map((s) => (
            <motion.section
              key={s.id}
              id={s.id}
              className="policy__section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2>{s.title}</h2>
              {s.blocks.map((b, i) => (
                <BlockView b={b} key={i} />
              ))}
            </motion.section>
          ))}

          <p className="policy__copy">{POLICY_META.copyright}</p>
        </main>
      </div>
    </div>
  );
}
