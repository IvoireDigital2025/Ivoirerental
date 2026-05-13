import { useState, useEffect } from 'react';
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
import BookingModal from "@/sections/BookingModal";
import BookingSuccess from "@/sections/BookingSuccess";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedCar, setPreselectedCar] = useState('');
  const [successSessionId, setSuccessSessionId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const booking = params.get('booking');
    const sessionId = params.get('session_id');
    if (booking === 'success' && sessionId) {
      setSuccessSessionId(sessionId);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  function openBooking(carKey?: string) {
    setPreselectedCar(carKey || '');
    setBookingOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary selection:text-primary-foreground font-sans">
      <Nav onBook={() => openBooking()} />
      <main className="flex-grow">
        <Hero onBook={() => openBooking()} />
        <Ticker />
        <Stats />
        <HowItWorks />
        <Fleet onBook={(carKey) => openBooking(carKey)} />
        <WhyUs />
        <Platforms />
        <Pricing onBook={() => openBooking()} />
        <Requirements />
        <Reviews />
        <FAQ />
        <Apply />
        <Partner />
      </main>
      <Footer />
      <WhatsAppButton />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedCar={preselectedCar}
      />

      {successSessionId && (
        <BookingSuccess
          sessionId={successSessionId}
          onDone={() => setSuccessSessionId('')}
        />
      )}
    </div>
  );
}
