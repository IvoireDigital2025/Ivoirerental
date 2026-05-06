export default function Ticker() {
  const text = "WEEKLY RENTALS · NO CREDIT CHECK · INSURANCE INCLUDED · 24HR APPROVAL · DALLAS, TX · UBER · LYFT · DOORDASH · AMAZON FLEX · ";
  const repeatedText = text.repeat(4);

  return (
    <div className="w-full bg-primary overflow-hidden py-3 border-y border-accent">
      <div className="whitespace-nowrap flex text-primary-foreground font-bold text-sm tracking-wider">
        <div className="animate-ticker inline-block shrink-0 px-2">
          {repeatedText}
        </div>
        <div className="animate-ticker inline-block shrink-0 px-2">
          {repeatedText}
        </div>
      </div>
    </div>
  );
}
