import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import Speakers from "./pages/Speakers";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      {/* <WhyAttend /> */}
      <Speakers />
      {/* <Programme /> */}
      <FAQ />
      <Footer />
    </main>
  );
}
