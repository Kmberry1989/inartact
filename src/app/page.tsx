'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SmoothScroller } from "@/components/smooth-scroller";
import { HeroParallax } from "@/components/hero-parallax";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CurrentEventsWidget } from "@/components/current-events-widget";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/artists?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <SmoothScroller />
      <Header />
      
      <main>
        <HeroParallax>
          <div className="relative shadow-xl rounded-full" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search artists, causes, or locations..."
                className="h-14 w-full rounded-full border-2 border-white/20 bg-background/80 pl-12 pr-32 text-lg backdrop-blur-md transition-all focus:border-primary focus:ring-4 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 top-2 bottom-2">
                <Button 
                  type="submit" 
                  className="h-full rounded-full px-6 font-semibold"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </HeroParallax>

        <section className="container relative z-10 -mt-20 md:-mt-32 pb-24 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 md:p-10 rounded-3xl border border-border shadow-2xl">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Connecting Artists, Activists, and Communities
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Explore the intersection of art and activism in Indiana. From the historic mural on Indiana Avenue to the grassroots movements in smaller towns, discover the stories behind the creators shaping our cultural landscape.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/artists">
                    <Button size="lg" className="text-lg px-8 h-12">
                      Browse Directory
                    </Button>
                  </Link>
                  <Link href="/activists/map">
                    <Button variant="outline" size="lg" className="text-lg px-8 h-12">
                      Explore Map
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Sidebar: Events Widget */}
            <div className="lg:col-span-4 sticky top-24">
              <CurrentEventsWidget />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
