import { Phone, Mail, MapPin } from 'lucide-react';
import logoSrc from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <div className="mb-6" style={{ height: '110px', width: '340px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={logoSrc}
                alt="Ivoire Rental"
                style={{
                  position: 'absolute',
                  height: '330px',
                  width: 'auto',
                  top: '-126px',
                  left: '-22px',
                  filter: 'brightness(0) invert(1)',
                  imageRendering: 'auto',
                }}
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Dallas–Fort Worth's premier rideshare vehicle rental service. Built for gig drivers who want premium vehicles without the red tape.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Navigate</h4>
            <ul className="space-y-3">
              <li><a href="#how" className="text-muted-foreground hover:text-primary transition-colors text-sm">How It Works</a></li>
              <li><a href="#fleet" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Fleet</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pricing</a></li>
              <li><a href="#requirements" className="text-muted-foreground hover:text-primary transition-colors text-sm">Requirements</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Platforms</h4>
            <ul className="space-y-3">
              <li><span className="text-muted-foreground text-sm">Uber & Uber XL</span></li>
              <li><span className="text-muted-foreground text-sm">Lyft</span></li>
              <li><span className="text-muted-foreground text-sm">DoorDash</span></li>
              <li><span className="text-muted-foreground text-sm">Amazon Flex</span></li>
              <li><span className="text-muted-foreground text-sm">Instacart</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">(214) 555-0123</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">info@ivoirerental.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">Dallas, TX<br/>(By Appointment Only)</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Ivoire Rental. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors text-xs">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors text-xs">Rental Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
