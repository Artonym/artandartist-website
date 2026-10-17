import { motion, useScroll, useSpring } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { DOCS, type Block, type LegalDoc } from "./legal";
import { Brand, EASE, scrollToId, useSmoothScroll } from "./ui";

/* emails become links; [Placeholders] are highlighted so they can't be missed */
const TOKEN = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|\[[^\]]+\])/g;

function linkify(text: string): ReactNode {
  return text.split(TOKEN).map((part, i) => {
    if (/^[\w.+-]+@[\w-]+/.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    if (/^\[[^\]]+\]$/.test(part))
      return (
        <mark key={i} className="legal__todo" title="Still to be filled in">
          {part}
        </mark>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/* **bold** + links */
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{linkify(part.slice(2, -2))}</strong> : <Fragment key={i}>{linkify(part)}</Fragment>,
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return <p>{rich(b.x)}</p>;
    case "h3":
      return <h3>{b.x}</h3>;
    case "ul":
      return (
        <ul>
          {b.x.map((li) => (
            <li key={li}>{rich(li)}</li>
          ))}
        </ul>
      );
    case "lines":
      return (
        <p className="policy__lines">
          {b.x.map((l, i) => (
            <span key={i}>{rich(l)}</span>
          ))}
        </p>
      );
  }
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  useSmoothScroll();
  const [active, setActive] = useState(doc.sections[0].id);
  const toc = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.title = `${doc.title} — Art & Artist`;
    // honour deep links such as /privacypolicy#section-8
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 400);
  }, [doc]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -70% 0px" },
    );
    doc.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [doc]);

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
            {doc.sections.map((s) => (
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
            <nav className="policy__switch" aria-label="Legal documents">
              {DOCS.map((d) => (
                <a key={d.slug} href={d.slug} className={d === doc ? "is-active" : ""} aria-current={d === doc ? "page" : undefined}>
                  {d.title}
                </a>
              ))}
            </nav>
            <p className="eyebrow">{doc.title}</p>
            <h1 className="policy__title">Art &amp; Artist</h1>
            <p className="policy__op">Operated by {doc.operator}</p>
            <p className="policy__updated">Last updated: {doc.updated}</p>
            <div className="policy__intro">
              {doc.intro.map((t) => (
                <p key={t}>{rich(t)}</p>
              ))}
            </div>
          </motion.div>

          {doc.sections.map((s) => (
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

          {doc.closing && <p className="policy__closing">{doc.closing}</p>}
        </main>
      </div>
    </div>
  );
}
