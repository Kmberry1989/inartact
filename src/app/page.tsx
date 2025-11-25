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
          <div className="relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search artists, causes, or locations..."
                className="h-12 w-full rounded-full border-2 border-primary/20 bg-background/80 pl-10 pr-4 text-lg backdrop-blur-sm transition-all focus:border-primary focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 rounded-full"
                size="sm"
              >
                Search
              </Button>
            </form>
          </div>
        </HeroParallax>

        <section className="container py-24 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Connecting Artists, Activists, and Communities
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore the intersection of art and activism in Indiana. Discover murals, sculptures, and the stories behind the creators shaping our cultural landscape.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/artists">
                    <Button size="lg" className="text-lg px-8">
                      Browse Directory
                    </Button>
                  </Link>
                  <Link href="/activists/map">
                    <Button variant="outline" size="lg" className="text-lg px-8">
                      Explore Map
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Current Events Widget Sidebar */}
            <div className="lg:col-span-1">
              <CurrentEventsWidget />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
