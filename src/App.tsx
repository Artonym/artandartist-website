import { useCallback, useState } from "react";
import { Hero } from "./Hero";
import { Atelier, Footer, Join, Manifesto, Marquee, Nav, Process, Story, Tribe } from "./Sections";
import { Cursor, Preloader, useSmoothScroll } from "./ui";

export default function App() {
  useSmoothScroll();
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);


  return (
    <>
      {!ready && <Preloader onDone={done} />}
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <Story />
        <Tribe />
        <Process />
        <Atelier />
        <Join />
      </main>
      <Footer />
    </>
  );
}
