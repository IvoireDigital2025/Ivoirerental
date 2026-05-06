import { SiWhatsapp } from 'react-icons/si';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a 
        href="https://wa.me/12145550123" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-green-500/30 transition-all duration-300 relative"
      >
        <SiWhatsapp className="w-8 h-8" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-card text-white text-sm font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl">
          Chat on WhatsApp
          <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 border-y-4 border-l-4 border-y-transparent border-l-card"></div>
        </div>
        
        {/* Ping animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 -z-10"></div>
      </a>
    </div>
  );
}
