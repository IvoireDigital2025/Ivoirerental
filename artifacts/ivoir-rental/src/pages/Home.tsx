import Nav from "@/sections/Nav";
import Hero from "@/sections/Hero";
import Ticker from "@/sections/Ticker";
import Stats from "@/sections/Stats";
import HowItWorks from "@/sections/HowItWorks";
import Fleet from "@/sections/Fleet";
import WhyUs from "@/sections/WhyUs";
import Platforms from "@/sections/Platforms";
import Pricing from "@/sections/Pricing";
import Requirements from "@/sections/Requirements";
import Reviews from "@/sections/Reviews";
import FAQ from "@/sections/FAQ";
import Apply from "@/sections/Apply";
import Partner from "@/sections/Partner";
import Footer from "@/sections/Footer";
import WhatsAppButton from "@/sections/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary selection:text-primary-foreground font-sans">
      <Nav />
      <main className="flex-grow">
        <Hero />
        <Ticker />
        <Stats />
        <HowItWorks />
        <Fleet />
        <WhyUs />
        <Platforms />
        <Pricing />
        <Requirements />
        <Reviews />
        <FAQ />
        <Apply />
        <Partner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
