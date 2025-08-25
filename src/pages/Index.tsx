import Hero from "@/components/Hero";
import InteractiveDemo from "@/components/InteractiveDemo";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <InteractiveDemo />
      <About />
      <Contact />
    </main>
  );
};

export default Index;
