import Hero from "@/components/sections/Hero";
import ShowcaseScroll from "@/components/sections/ShowcaseScroll";
import TransitionSection from "@/components/sections/TransitionSection";
import Features from "@/components/sections/Features";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ShowcaseScroll />
      <TransitionSection />
      <Features />
      <Footer />
    </main>
  );
}
