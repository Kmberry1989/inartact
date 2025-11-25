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
  
  // 1. Particles: Slow background movement
  const yParticles = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // 2. Indiana Outline: Very subtle movement, anchors the background
  const yIndiana = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  
  // 3. Text: Drifts up at medium speed
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // 4. Crowd: Moves slightly faster than background
  const yCrowd = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // 5. Fist: Foreground element, moves faster
  const yFist = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // 6. Cardinal: Swipes OFF screen to the Top-Right
  // y: 0% -> -150% (Moves Up)
  // x: 0% -> 150% (Moves Right)
  const yCardinal = useTransform(scrollYProgress, [0, 0.8], ["0%", "-150%"]);
  const xCardinal = useTransform(scrollYProgress, [0, 0.8], ["0%", "150%"]);

  return (
    <div 
      ref={ref} 
      className="relative w-full h-[130vh] overflow-hidden bg-background flex flex-col items-center justify-start pt-20 lg:pt-32"
    >
      {/* --- BACKGROUND LAYERS (Z-0) --- */}
      
      {/* LAYER 1: Particle Background */}
      <motion.div 
        style={{ y: yParticles }}
        className="absolute inset-0 z-0"
      >
        <ParticleEffect />
      </motion.div>

      {/* LAYER 2: Indiana Outline (PNG) */}
      {/* Centered horizontally with left-1/2 and -translate-x-1/2 */}
      <motion.div 
        style={{ y: yIndiana }}
        className="absolute top-[10%] left-1/2 -translate-x-1/2 z-0 w-[90vw] h-[60vh] md:w-[600px] md:h-[800px] opacity-20 dark:opacity-30 pointer-events-none flex items-center justify-center"
      >
         <div className="relative w-full h-full">
           <Image 
             src="/hero/indiana-outline.png" 
             alt="Indiana State Outline" 
             fill 
             className="object-contain"
             priority
           />
         </div>
      </motion.div>

      {/* --- MID-GROUND LAYERS (Z-10) --- */}
      {/* Moved these to z-10 so they are BEHIND the text (z-30) */}

      {/* LAYER 3: Crowd */}
      <motion.div 
        style={{ y: yCrowd }}
        className="absolute bottom-0 left-0 right-0 z-10 w-full flex justify-center items-end pointer-events-none opacity-60 mix-blend-multiply dark:mix-blend-screen"
      >
        <div className="relative w-full h-[400px] md:h-[600px]">
           <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
           <Image
             src="/hero/protest-crowd.png"
             alt="Crowd of protestors"
             fill
             className="object-cover object-bottom"
             priority
           />
        </div>
      </motion.div>

      {/* LAYER 4: Fist (Moved Left) */}
      <motion.div 
        style={{ y: yFist }}
        className="absolute -bottom-[5%] left-[-15%] md:left-[-5%] z-10 w-[300px] h-[500px] md:w-[500px] md:h-[800px] pointer-events-none opacity-90"
      >
         <Image
           src="/hero/raised-fist.png"
           alt="Raised Fist"
           fill
           className="object-contain object-bottom drop-shadow-2xl"
         />
      </motion.div>

      {/* LAYER 5: Cardinal (Swipes away) */}
      <motion.div 
        style={{ y: yCardinal, x: xCardinal }}
        className="absolute top-[15%] right-[5%] md:right-[15%] z-10 w-32 h-32 md:w-64 md:h-64 pointer-events-none"
      >
         {/* Inner div for the hovering idle animation */}
         <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
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

      {/* --- FOREGROUND LAYER (Z-30) --- */}
      {/* Text and Interactive Children (Search Bar) are now on top */}
      
      <motion.div 
        style={{ y: yText }}
        className="relative z-30 flex flex-col items-center justify-center w-full text-center mt-10 md:mt-20 px-4"
      >
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground/90 drop-shadow-2xl flex gap-4 md:gap-8 flex-wrap justify-center">
          <SplitText word="ACT." delay={0} />
          <SplitText word="IN." delay={0.2} />
          <SplitText word="ART." delay={0.4} />
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 text-lg md:text-2xl font-medium text-muted-foreground max-w-2xl bg-background/20 backdrop-blur-sm p-2 rounded-xl"
        >
          Advocacy through creativity. Change through expression.
        </motion.p>

        {/* RENDER CHILDREN (Search Bar) HERE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 w-full max-w-xl px-4"
        >
          {children}
        </motion.div>
      </motion.div>
      
      {/* Gradient Fade at bottom to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-40" />
    </div>
  );
}

// --- Helper: Split Text Animation ---
function SplitText({ word, delay }: { word: string, delay: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: delay + (i * 0.05), 
            type: "spring", 
            stiffness: 100,
            damping: 20 
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// --- Helper: Particle System ---
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
