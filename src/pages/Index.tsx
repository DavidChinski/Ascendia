import Hero from "@/components/Hero";
import Mascot from "@/components/Mascot";
import InteractiveDemo from "@/components/InteractiveDemo";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      {/* Floating mascot across sections */}
      <Mascot sectionIds={["hero", "demo", "about", "contact"]} />

      {/* Section anchors so the mascot can wave near boundaries */}
      <section id="hero" data-section="hero">
        <Hero />
      </section>
      <section id="demo" data-section="demo">
        <InteractiveDemo />
      </section>
      <section id="about" data-section="about">
        <About />
      </section>
      <section id="contact" data-section="contact">
        <Contact />
      </section>
    </main>
  );
};

export default Index;
