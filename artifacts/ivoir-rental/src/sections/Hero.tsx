import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let frame = 0;
    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height / 2,
      s: Math.random() * 2,
      a: Math.random()
    }));

    const headlights = Array.from({ length: 3 }).map((_, i) => ({
      z: i * 400 + 200,
      lane: Math.random() > 0.5 ? -1 : -2,
      speed: 4 + Math.random() * 3
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = '#080810';
      ctx.fillRect(0, 0, width, height);
      
      const horizonY = height * 0.45;
      const vpX = width / 2;
      
      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(frame * 0.02 + star.a))})`;
        ctx.fillRect(star.x, star.y, star.s, star.s);
      });
      
      // Draw road
      ctx.fillStyle = '#0E0E1A';
      ctx.beginPath();
      ctx.moveTo(vpX, horizonY);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fill();
      
      // Draw center double gold line
      const t = (frame * 0.05) % 1;
      
      for(let i=0; i<20; i++) {
        const z1 = i + t;
        const z2 = i + t + 0.5;
        
        if (z1 < 0.1) continue;
        
        const y1 = horizonY + (height - horizonY) / z1;
        const y2 = horizonY + (height - horizonY) / z2;
        
        const w1 = 15 / z1;
        const w2 = 15 / z2;
        
        ctx.fillStyle = '#D4A843';
        
        // Left line
        ctx.beginPath();
        ctx.moveTo(vpX - 5/z1, y1);
        ctx.lineTo(vpX - 5/z2, y2);
        ctx.lineTo(vpX - 5/z2 - w2, y2);
        ctx.lineTo(vpX - 5/z1 - w1, y1);
        ctx.fill();
        
        // Right line
        ctx.beginPath();
        ctx.moveTo(vpX + 5/z1, y1);
        ctx.lineTo(vpX + 5/z2, y2);
        ctx.lineTo(vpX + 5/z2 + w2, y2);
        ctx.lineTo(vpX + 5/z1 + w1, y1);
        ctx.fill();
        
        // Lane dividers (white dashed)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        const laneOffset1 = vpX - (width * 0.2) / z1;
        const laneOffset2 = vpX - (width * 0.2) / z2;
        ctx.moveTo(laneOffset1, y1);
        ctx.lineTo(laneOffset2, y2);
        ctx.lineTo(laneOffset2 - 3/z2, y2);
        ctx.lineTo(laneOffset1 - 3/z1, y1);
        ctx.fill();
        
        ctx.beginPath();
        const laneOffsetR1 = vpX + (width * 0.2) / z1;
        const laneOffsetR2 = vpX + (width * 0.2) / z2;
        ctx.moveTo(laneOffsetR1, y1);
        ctx.lineTo(laneOffsetR2, y2);
        ctx.lineTo(laneOffsetR2 + 3/z2, y2);
        ctx.lineTo(laneOffsetR1 + 3/z1, y1);
        ctx.fill();
      }
      
      // Draw oncoming headlights
      headlights.forEach(hl => {
        hl.z -= hl.speed * 0.1;
        if (hl.z <= 0) {
          hl.z = 100 + Math.random() * 50;
          hl.lane = Math.random() > 0.5 ? -1 : -2;
        }
        
        if (hl.z > 0.1) {
          const y = horizonY + (height - horizonY) / hl.z;
          const rx = vpX + (width * 0.15 * hl.lane) / hl.z;
          const rSize = 20 / hl.z;
          
          ctx.beginPath();
          ctx.arc(rx, y, rSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(rx + rSize*2, y, rSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow
          const grad = ctx.createRadialGradient(rx+rSize, y, 0, rx+rSize, y, rSize*5);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(rx+rSize, y, rSize*5, 0, Math.PI*2);
          ctx.fill();
        }
      });
      
      // Gradient overlay at bottom
      const overlayGrad = ctx.createLinearGradient(0, height*0.6, 0, height);
      overlayGrad.addColorStop(0, 'rgba(8, 8, 16, 0)');
      overlayGrad.addColorStop(1, 'rgba(8, 8, 16, 1)');
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, width, height);

      frame++;
      requestAnimationFrame(draw);
    }
    
    draw();
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center pt-20">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Now Accepting Drivers — Dallas, TX
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-display tracking-tight text-white mb-6 leading-tight"
          >
            Drive Dallas. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Earn More.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
          >
            Weekly car rentals for Uber, Lyft & gig drivers. No credit check. Insurance included. Starting at $200/week.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a 
              href="#apply"
              data-testid="hero-btn-apply"
              className="inline-flex justify-center items-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-md hover:bg-accent transition-colors duration-300"
            >
              Apply Now
            </a>
            <a 
              href="#fleet"
              data-testid="hero-btn-fleet"
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300"
            >
              View Fleet
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
              No Credit Check
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
              Insurance Included
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
              24hr Approval
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
              Dallas, TX
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
