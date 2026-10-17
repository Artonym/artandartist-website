import { useCallback, useState } from "react";
import { Hero } from "./Hero";
import { Atelier, Footer, Join, Manifesto, Marquee, Nav, Process, Tribe } from "./Sections";
import { Story } from "./Story";
import { Preloader } from "./Preloader";
import { Cursor, useSmoothScroll } from "./ui";

export default function App() {
  useSmoothScroll();
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);


  return (
    <>
      <Preloader onDone={done} />
      <Cursor />
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
