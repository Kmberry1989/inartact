'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // -- Parallax Transforms --
  // Background particles move slowly
  const yParticles = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Text moves at medium speed (drifts up)
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Crowd moves slightly faster than background to create depth
  const yCrowd = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Fist moves fastest (foreground element)
  const yFist = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  // Cardinal has a floating animation independent of scroll, plus scroll movement
  const yCardinal = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  return (
    <div 
      ref={ref} 
      className="relative w-full h-[120vh] overflow-hidden bg-background flex flex-col items-center justify-start pt-20 lg:pt-32"
    >
      {/* 1. Particle Background Layer */}
      <motion.div 
        style={{ y: yParticles }}
        className="absolute inset-0 z-0"
      >
        <ParticleEffect />
      </motion.div>

      {/* 2. Text Layer (Behind the crowd slightly or integrated) */}
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

      {/* 3. Crowd Layer (Mid-ground) */}
      {/* NOTE: Replace src with your actual file path: '/hero/protest-crowd.png' */}
      <motion.div 
        style={{ y: yCrowd }}
        className="absolute bottom-0 left-0 right-0 z-20 w-full flex justify-center items-end pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen"
      >
        <div className="relative w-full h-[400px] md:h-[600px]">
           {/* Fallback placeholder if image is missing */}
           <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
           <Image
             src="/loggers.png" // TEMPORARY: Replace with "/hero/protest-crowd.png"
             alt="Crowd of protestors"
             fill
             className="object-cover object-bottom"
             priority
           />
        </div>
      </motion.div>

      {/* 4. Cardinal Layer (Floating Accent) */}
      {/* NOTE: Replace src with your actual file path: '/hero/cardinal.png' */}
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
           src="/Poplar_Trees_2015.webp" // TEMPORARY: Replace with "/hero/cardinal.png"
           alt="Cardinal"
           fill
           className="object-contain"
         />
      </motion.div>

      {/* 5. Fist Layer (Foreground) */}
      {/* NOTE: Replace src with your actual file path: '/hero/raised-fist.png' */}
      <motion.div 
        style={{ y: yFist }}
        className="absolute -bottom-[10%] left-[5%] md:left-[10%] z-40 w-[300px] h-[500px] md:w-[500px] md:h-[800px] pointer-events-none"
      >
         <Image
           src="/blkkklivesdontmatter.jpg" // TEMPORARY: Replace with "/hero/raised-fist.png"
           alt="Raised Fist"
           fill
           className="object-contain object-bottom drop-shadow-2xl mask-image-gradient"
         />
      </motion.div>
      
      {/* Gradient Fade at bottom to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-50" />
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
  const { theme, systemTheme } = useTheme();
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

    // Set dimensions
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Determine Colors based on CSS variables
    // We grab the computed style of the --primary variable to match the theme
    const getThemeColor = () => {
      const style = getComputedStyle(document.body);
      // This usually returns standard CSS format, e.g., "240 5.9% 10%" if using Tailwind HSL
      // We'll try to grab the HSL value and wrap it in hsla
      const primary = style.getPropertyValue('--primary').trim();
      const accent = style.getPropertyValue('--accent').trim();
      
      return {
        primary: primary ? `hsla(${primary}, 0.5)` : 'rgba(0,0,0,0.2)',
        accent: accent ? `hsla(${accent}, 0.8)` : 'rgba(255,0,0,0.5)',
        isDark: document.documentElement.classList.contains('dark')
      };
    };

    let colors = getThemeColor();

    // Particle Class
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
        this.y = canvas!.height + Math.random() * 100; // Start slightly below
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -2 - 0.5; // Always move up
        this.life = 1.0;
        
        // Randomly choose between primary and accent color
        this.color = Math.random() > 0.5 ? colors.primary : colors.accent;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.005; // Fade out slowly
        
        // Reset if dead or out of bounds
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
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.life})`); // Hacky opacity replace
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = 50;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
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

    // Observer for Theme Changes to update colors dynamically
    const observer = new MutationObserver(() => {
        colors = getThemeColor();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [mounted, theme, systemTheme]);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60" />;
}

