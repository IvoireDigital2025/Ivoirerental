import { useState } from 'react';
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
import ServiceAreas from "@/sections/ServiceAreas";
import Apply from "@/sections/Apply";
import Partner from "@/sections/Partner";
import Footer from "@/sections/Footer";
import WhatsAppButton from "@/sections/WhatsAppButton";
import BookingModal from "@/sections/BookingModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary selection:text-primary-foreground font-sans">
      <Nav onBook={() => setBookingOpen(true)} />
      <main className="flex-grow">
        <Hero onBook={() => setBookingOpen(true)} />
        <Ticker />
        <Stats />
        <HowItWorks />
        <Fleet onBook={() => setBookingOpen(true)} />
        <WhyUs />
        <Platforms />
        <Pricing onBook={() => setBookingOpen(true)} />
        <Requirements />
        <Reviews />
        <FAQ />
        <ServiceAreas />
        <Apply />
        <Partner />
      </main>
      <Footer />
      <WhatsAppButton />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
