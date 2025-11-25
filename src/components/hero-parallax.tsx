'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export function HeroParallax({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // -- Parallax Transforms --
  const yParticles = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yIndiana = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const yCrowd = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yFist = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  
  // Cardinal: Swipes OFF screen to the Top-Right
  const yCardinal = useTransform(scrollYProgress, [0, 0.5], ["0%", "-150%"]);
  const xCardinal = useTransform(scrollYProgress, [0, 0.5], ["0%", "150%"]);

  return (
    <div 
      ref={ref} 
      className="relative w-full h-[130vh] overflow-hidden bg-background flex flex-col items-center justify-start pt-20 lg:pt-32"
    >
      {/* LAYER 1: Particle Background (Z-0) */}
      <motion.div style={{ y: yParticles }} className="absolute inset-0 z-0">
        <ParticleEffect />
      </motion.div>

      {/* LAYER 2: Indiana Outline (Centered, Background) */}
      <motion.div 
        style={{ y: yIndiana }}
        className="absolute top-[15%] left-1/2 -translate-x-1/2 z-0 w-[90vw] h-[60vh] md:w-[600px] md:h-[800px] opacity-10 dark:opacity-20 pointer-events-none flex items-center justify-center"
      >
         <Image 
           src="/hero/indiana-outline.png" 
           alt="Indiana State Outline" 
           fill 
           className="object-contain"
           priority
         />
      </motion.div>

      {/* LAYER 3: Crowd (Mid-ground, Z-10) */}
      <motion.div 
        style={{ y: yCrowd }}
        className="absolute bottom-0 left-0 right-0 z-10 w-full flex justify-center items-end pointer-events-none opacity-60 mix-blend-multiply dark:mix-blend-screen"
      >
        <div className="relative w-full h-[400px] md:h-[600px]">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
           <Image
             src="/hero/protest-crowd.png"
             alt="Crowd of protestors"
             fill
             className="object-cover object-bottom"
             priority
           />
        </div>
      </motion.div>

      {/* LAYER 4: Fist (Foreground Left, Z-20) */}
      <motion.div 
        style={{ y: yFist }}
        className="absolute -bottom-[5%] left-[-20%] md:left-[5%] z-20 w-[250px] h-[400px] md:w-[400px] md:h-[700px] pointer-events-none opacity-90"
      >
         <Image
           src="/hero/raised-fist.png"
           alt="Raised Fist"
           fill
           className="object-contain object-bottom drop-shadow-2xl"
         />
      </motion.div>

      {/* LAYER 5: Cardinal (Foreground Right, Z-20) */}
      <motion.div 
        style={{ y: yCardinal, x: xCardinal }}
        className="absolute top-[15%] right-[5%] md:right-[15%] z-20 w-24 h-24 md:w-48 md:h-48 pointer-events-none"
      >
         <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative"
         >
            <Image
              src="/hero/cardinal.png"
              alt="Cardinal"
              fill
              className="object-contain"
            />
         </motion.div>
      </motion.div>

      {/* LAYER 6: Text & Search (Topmost, Z-30) */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-30 flex flex-col items-center justify-center w-full text-center mt-10 md:mt-20 px-4"
      >
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter drop-shadow-xl flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-center">
          {/* Applied animate-gradient with specific color stops */}
          <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            ACT.
          </span>
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient delay-75">
            IN.
          </span>
          <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient delay-150">
            ART.
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-lg md:text-2xl font-medium text-muted-foreground max-w-2xl bg-background/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-sm"
        >
          Advocacy through creativity. Change through expression.
        </motion.p>

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 w-full max-w-xl px-4 pointer-events-auto"
        >
          {children}
        </motion.div>
      </motion.div>
      
      {/* Gradient Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-20" />
    </div>
  );
}

function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const getThemeColor = () => {
      const style = getComputedStyle(document.body);
      const primary = style.getPropertyValue('--primary').trim();
      const accent = style.getPropertyValue('--accent').trim() || primary; 
      return {
        primary: primary ? `hsla(${primary}, 0.5)` : 'rgba(0,0,0,0.2)',
        accent: accent ? `hsla(${accent}, 0.8)` : 'rgba(255,0,0,0.5)',
      };
    };

    let colors = getThemeColor();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -2 - 0.5; 
        this.life = 1.0;
        this.color = Math.random() > 0.5 ? colors.primary : colors.accent;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.005;
        
        if (this.life <= 0 || this.y < 0) {
          this.x = Math.random() * canvas!.width;
          this.y = canvas!.height + 10;
          this.life = 1.0;
          this.speedY = Math.random() * -2 - 0.5;
          this.color = Math.random() > 0.5 ? colors.primary : colors.accent;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.life})`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = 60;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const observer = new MutationObserver(() => {
        colors = getThemeColor();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [mounted, theme]);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60" />;
}
