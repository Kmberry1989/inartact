'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // -- Parallax Transforms --
  // 1. Particles: Slowest, background depth
  const yParticles = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // 2. Indiana Outline: Very slow, anchors the scene
  const yIndiana = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // 3. Text: Drifts up at medium speed
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // 4. Crowd: Moves slightly faster than background
  const yCrowd = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // 5. Fist: Foreground element, moves fast
  const yFist = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  // 6. Cardinal: Floating accent, moves fastest
  const yCardinal = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  return (
    <div 
      ref={ref} 
      className="relative w-full h-[130vh] overflow-hidden bg-background flex flex-col items-center justify-start pt-20 lg:pt-32"
    >
      {/* LAYER 1: Particle Background */}
      <motion.div 
        style={{ y: yParticles }}
        className="absolute inset-0 z-0"
      >
        <ParticleEffect />
      </motion.div>

      {/* LAYER 2: Indiana Outline (SVG or Image) */}
      <motion.div 
        style={{ y: yIndiana }}
        className="absolute top-[5%] left-1/2 -translate-x-1/2 z-0 w-[80vw] h-[60vh] md:w-[600px] md:h-[800px] opacity-10 dark:opacity-20 pointer-events-none"
      >
         <IndianaShape />
      </motion.div>

      {/* LAYER 3: Text (Behind the crowd slightly) */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-10 flex flex-col items-center justify-center w-full text-center mt-10 md:mt-20"
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
          className="mt-6 text-lg md:text-2xl font-medium text-muted-foreground max-w-2xl px-4"
        >
          Advocacy through creativity. Change through expression.
        </motion.p>
      </motion.div>

      {/* LAYER 4: Crowd (Mid-ground) */}
      <motion.div 
        style={{ y: yCrowd }}
        className="absolute bottom-0 left-0 right-0 z-20 w-full flex justify-center items-end pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen"
      >
        <div className="relative w-full h-[400px] md:h-[600px]">
           <Image
             src="/hero/protest-crowd.png"
             alt="Crowd of protestors"
             fill
             className="object-cover object-bottom"
             priority
           />
        </div>
      </motion.div>

      {/* LAYER 5: Cardinal (Floating Accent) */}
      <motion.div 
        style={{ y: yCardinal, x: 50 }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[15%] right-[5%] md:right-[15%] z-30 w-32 h-32 md:w-64 md:h-64 pointer-events-none"
      >
         <Image
           src="/hero/cardinal.png"
           alt="Cardinal"
           fill
           className="object-contain"
         />
      </motion.div>

      {/* LAYER 6: Fist (Foreground) */}
      <motion.div 
        style={{ y: yFist }}
        className="absolute -bottom-[5%] left-[5%] md:left-[10%] z-40 w-[300px] h-[500px] md:w-[500px] md:h-[800px] pointer-events-none"
      >
         <Image
           src="/hero/raised-fist.png"
           alt="Raised Fist"
           fill
           className="object-contain object-bottom drop-shadow-2xl mask-image-gradient"
         />
      </motion.div>
      
      {/* Gradient Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-50" />
    </div>
  );
}

// --- Helper: Indiana SVG Shape ---
function IndianaShape() {
  return (
    <svg viewBox="0 0 350 550" fill="currentColor" className="w-full h-full text-primary/30">
      <path d="M 107.5 20 L 237.5 20 L 242.5 45 L 252.5 55 L 250 85 L 260 100 L 260 140 L 255 150 L 260 170 L 250 185 L 250 220 L 235 240 L 235 260 L 215 275 L 185 275 L 170 295 L 140 295 L 110 325 L 90 325 L 80 335 L 50 335 L 40 325 L 40 305 L 25 290 L 25 270 L 10 255 L 10 225 L 20 215 L 20 185 L 10 175 L 10 155 L 20 145 L 20 125 L 30 115 L 30 85 L 40 75 L 40 45 Z" />
    </svg>
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
