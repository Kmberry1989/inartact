'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArtistGallery } from '@/components/artist-gallery';
import { artists } from '@/lib/artists-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Search, SlidersHorizontal, ArrowDownAZ, Clock, X } from 'lucide-react';

export default function Home() {
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('newest');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extract unique causes for the filter dropdown
  const uniqueCauses = useMemo(() => {
    const causes = new Set(artists.map((a) => a.artwork.cause || 'Other'));
    return Array.from(causes).sort();
  }, []);

  // Filter and Sort Logic
  const filteredAndSortedArtists = useMemo(() => {
    let result = [...artists];

    // 1. Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.artist.name.toLowerCase().includes(query) ||
          item.artwork.title.toLowerCase().includes(query) ||
          item.artwork.description?.toLowerCase().includes(query) ||
          item.artwork.cause?.toLowerCase().includes(query)
      );
    }

    // 2. Filter by Cause
    if (selectedCause && selectedCause !== 'all') {
      result = result.filter((item) => item.artwork.cause === selectedCause);
    }

    // 3. Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'name_asc':
          return a.artist.name.localeCompare(b.artist.name);
        case 'name_desc':
          return b.artist.name.localeCompare(a.artist.name);
        case 'newest':
          return Number(b.id) - Number(a.id); 
        case 'oldest':
           return Number(a.id) - Number(b.id);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCause, sortOption]);

  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedCause, sortOption]);

  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem('directoryScrollPos');
    if (savedScrollPos) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScrollPos, 10));
        sessionStorage.removeItem('directoryScrollPos');
      });
    }
  }, []);

  const visibleArtists = filteredAndSortedArtists.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedArtists.length;

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans transition-colors duration-300">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-slate-900 text-white transition-colors duration-300">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-sm">
              {artists.length} Stories of Change
            </Badge>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 text-white leading-[1.1]">
              Art as Activism <br className="hidden md:block" />
              {/* UPDATED GRADIENT: from-primary (Blue) to-secondary (Gold) */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x pb-2">
                in Indiana
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover the artists, murals, and movements shaping social justice and community identity across the Hoosier state.
            </p>
            
            <div className="max-w-md mx-auto relative">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-primary"
                    placeholder="Search artists, topics, or cities..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (window.scrollY < 400) {
                         document.getElementById('directory-section')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
               </div>
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory-section" className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950/50">
          <div className="container mx-auto px-4">
            
            {/* Controls Bar */}
            <div className="sticky top-0 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm py-4 -mx-4 px-4 mb-8 border-b border-slate-200 dark:border-slate-800 transition-all">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto items-center">
                  <h2 className="text-2xl font-bold tracking-tight mr-4 hidden md:block">Directory</h2>
                  
                  <div className="relative w-full md:w-64 md:hidden">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <Select value={selectedCause} onValueChange={setSelectedCause}>
                      <SelectTrigger className="w-full md:w-[200px] bg-white dark:bg-slate-900">
                        <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Filter by Cause" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Causes</SelectItem>
                        {uniqueCauses.map(cause => (
                          <SelectItem key={cause} value={cause}>{cause}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-slate-900">
                         {sortOption === 'newest' ? <Clock className="w-4 h-4 mr-2 text-muted-foreground"/> : <ArrowDownAZ className="w-4 h-4 mr-2 text-muted-foreground"/>}
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest Added</SelectItem>
                        <SelectItem value="oldest">Oldest Added</SelectItem>
                        <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <span>{filteredAndSortedArtists.length} result{filteredAndSortedArtists.length !== 1 && 's'}</span>
                   {(searchQuery || selectedCause !== 'all') && (
                     <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCause('all');
                        }}
                        className="h-8 px-2 text-xs hover:bg-red-100 hover:text-red-600"
                      >
                        <X className="w-3 h-3 mr-1" /> Clear filters
                     </Button>
                   )}
                </div>
              </div>
            </div>

            <div className="min-h-[400px]">
              <ArtistGallery artists={visibleArtists} />
            </div>

            {hasMore && (
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="bg-white dark:bg-slate-900 min-w-[200px]"
                >
                  Load More Artists
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}