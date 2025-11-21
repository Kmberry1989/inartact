'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Archive', href: '/' },
    { name: 'Map', href: '/activists/map' },
    { name: 'Timeline', href: '/activists/timeline' },
    { name: 'Zine', href: '/activists/zine' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="flex items-center space-x-2 group" 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              IA
            </div>
            <span className="hidden font-bold sm:inline-block text-lg tracking-tight text-foreground/90">
              Indiana Art Activist
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                pathname === item.href 
                  ? "text-primary bg-primary/5 font-semibold" 
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          {/* Theme Gear */}
          <div className="ml-2 pl-2 border-l border-border/50">
             <ThemeSwitcher />
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            className="hover:bg-transparent"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground transition-transform rotate-90" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl p-4 shadow-2xl animate-in slide-in-from-top-5 fade-in-20">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center p-3 text-base font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}