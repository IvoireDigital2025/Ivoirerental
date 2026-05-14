const cities = [
  { name: "Dallas", detail: "All zones · DFW Airport" },
  { name: "Fort Worth", detail: "West side · Alliance" },
  { name: "Arlington", detail: "Mid-Cities · AT&T Stadium" },
  { name: "Irving", detail: "Las Colinas · DFW Airport" },
  { name: "Plano", detail: "North Dallas · Legacy" },
  { name: "Garland", detail: "East Dallas corridor" },
  { name: "Grand Prairie", detail: "Mid-Cities · Six Flags" },
  { name: "Mesquite", detail: "Southeast Dallas" },
  { name: "Frisco", detail: "North corridor · Toyota Stadium" },
  { name: "McKinney", detail: "Far north DFW" },
  { name: "Carrollton", detail: "North Dallas · Addison" },
  { name: "Richardson", detail: "Telecom Corridor" },
  { name: "Lewisville", detail: "Northwest DFW" },
  { name: "Denton", detail: "UNT · TWU area" },
  { name: "Allen", detail: "Collin County" },
  { name: "Euless", detail: "Mid-Cities · HEB" },
];

export default function ServiceAreas() {
  return (
    <section
      id="service-areas"
      aria-label="Service areas across Dallas Fort Worth"
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Where We Operate
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Serving All of{" "}
            <span className="text-primary">Dallas–Fort Worth</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you drive in downtown Dallas, the Mid-Cities, or the outer
            suburbs, Ivoire Rental has you covered across the entire DFW
            metroplex.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <div
              key={city.name}
              className="border border-white/5 bg-card rounded-xl px-5 py-4 hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200"
            >
              <p className="font-display font-semibold text-white text-base">
                {city.name}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{city.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          Don't see your city?{" "}
          <a
            href="https://wa.me/12145550123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Message us on WhatsApp
          </a>{" "}
          — we may still be able to help.
        </p>
      </div>
    </section>
  );
}
