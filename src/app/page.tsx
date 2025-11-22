// src/app/page.tsx
'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
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
import { Search, SlidersHorizontal, ArrowDownAZ, Clock, X, RotateCcw, User, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

// Type for our suggestions
type Suggestion = {
  id: string;
  text: string;
  type: 'artist' | 'artwork';
  artistId: string;
};

export default function Home() {
  // --- State ---
  
  // Search State
  const [searchInput, setSearchInput] = useState(''); // What the user types
  const [appliedSearch, setAppliedSearch] = useState(''); // What actually filters the grid
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Filters & Sort
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('newest');
  
  // Pagination / Hydration
  const [visibleCount, setVisibleCount] = useState(12);
  const [isClient, setIsClient] = useState(false);

  // Refs for click-outside detection
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  useEffect(() => {
    setIsClient(true);
    
    // Click outside to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Restore scroll position logic
  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem('directoryScrollPos');
    if (savedScrollPos) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScrollPos, 10));
        sessionStorage.removeItem('directoryScrollPos');
      });
    }
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [appliedSearch, selectedCause, sortOption, selectedLetter]);


  // --- Data Logic ---

  const alphabet = useMemo(() => '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), []);

  // Updated: Generate unique causes list by splitting comma-separated strings
  const uniqueCauses = useMemo(() => {
    const causes = new Set<string>();
    artists.forEach((artist) => {
      // Split by comma, trim whitespace
      const artistCauses = artist.artwork.cause 
        ? artist.artwork.cause.split(',').map(c => c.trim()) 
        : ['Other'];
      
      artistCauses.forEach(cause => {
        if (cause && cause !== '') {
          causes.add(cause);
        }
      });
    });
    return Array.from(causes).sort();
  }, []);

  // Generate Suggestions based on 'searchInput'
  const suggestions: Suggestion[] = useMemo(() => {
    if (!searchInput || searchInput.length < 2) return [];
    
    const query = searchInput.toLowerCase();
    const matches: Suggestion[] = [];

    artists.forEach(item => {
      // Check Artist Name
      if (item.artist.name.toLowerCase().includes(query)) {
        matches.push({
          id: `artist-${item.id}`,
          text: item.artist.name,
          type: 'artist',
          artistId: item.id
        });
      }
      // Check Artwork Title
      if (item.artwork.title.toLowerCase().includes(query)) {
        matches.push({
          id: `work-${item.id}`,
          text: item.artwork.title,
          type: 'artwork',
          artistId: item.id
        });
      }
    });

    // Sort by relevance: Starts with > Includes
    return matches.sort((a, b) => {
      const aStarts = a.text.toLowerCase().startsWith(query);
      const bStarts = b.text.toLowerCase().startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    }).slice(0, 6); // Limit to 6 suggestions
  }, [searchInput]);

  // Main Gallery Filtering (Uses 'appliedSearch')
  const filteredAndSortedArtists = useMemo(() => {
    let result = [...artists];

    // 1. Filter by Applied Search (from Enter or Click Suggestion)
    if (appliedSearch) {
      const query = appliedSearch.toLowerCase();
      result = result.filter(
        (item) =>
          item.artist.name.toLowerCase().includes(query) ||
          item.artwork.title.toLowerCase().includes(query) ||
          item.artwork.description?.toLowerCase().includes(query) ||
          item.artwork.cause?.toLowerCase().includes(query)
      );
    }

    // 2. Filter by Cause (Updated to check included causes)
    if (selectedCause && selectedCause !== 'all') {
      result = result.filter((item) => {
        const itemCauses = item.artwork.cause 
          ? item.artwork.cause.split(',').map(c => c.trim())
          : ['Other'];
        return itemCauses.includes(selectedCause);
      });
    }

    // 3. Filter by Alphabet Letter
    if (selectedLetter) {
      if (selectedLetter === '#') {
        result = result.filter((item) => /^\d/.test(item.artist.name));
      } else {
        result = result.filter((item) => 
          item.artist.name.toUpperCase().startsWith(selectedLetter)
        );
      }
    }

    // 4. Sort
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
  }, [appliedSearch, selectedCause, sortOption, selectedLetter]);

  const visibleArtists = filteredAndSortedArtists.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedArtists.length;

  // --- Handlers ---

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setAppliedSearch(searchInput); // Apply the filter to the grid
    setShowSuggestions(false);
    
    // Scroll to results
    if (window.scrollY < 400) {
      document.getElementById('directory-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchInput(suggestion.text);
    setAppliedSearch(suggestion.text);
    setShowSuggestions(false);
    
    if (window.scrollY < 400) {
      document.getElementById('directory-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setAppliedSearch('');
    setSelectedCause('all');
    setSelectedLetter(null);
  };

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
  Art as Activism 
  {/* FORCED LINE BREAK */}
  <br className="block" />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x pb-2 bg-[length:200%_auto]">
    in Indiana
  </span>
</h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover the artists, murals, and movements shaping social justice and community identity across the Hoosier state.
            </p>
            
            {/* Hero Search with Suggestions */}
            <div className="max-w-md mx-auto relative" ref={searchContainerRef}>
               <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-primary backdrop-blur-sm"
                    placeholder="Search artists, topics, or cities..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                  />
               </form>
               
               {/* Suggestions Dropdown */}
               {showSuggestions && suggestions.length > 0 && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-background text-foreground rounded-md shadow-xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                   {suggestions.map((suggestion) => (
                     <div
                       key={suggestion.id}
                       onClick={() => handleSuggestionClick(suggestion)}
                       className="flex items-center px-4 py-3 hover:bg-muted cursor-pointer border-b border-border/40 last:border-0 transition-colors"
                     >
                       {suggestion.type === 'artist' ? (
                         <User className="h-4 w-4 mr-3 text-primary/70" />
                       ) : (
                         <Palette className="h-4 w-4 mr-3 text-secondary/70" />
                       )}
                       <span className="text-sm font-medium">{suggestion.text}</span>
                       {suggestion.type === 'artwork' && (
                         <span className="ml-auto text-xs text-muted-foreground">Artwork</span>
                       )}
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory-section" className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950/50">
          <div className="container mx-auto px-4">
            
            {/* Controls Bar */}
            <div className="sticky top-0 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 border-b border-slate-200 dark:border-slate-800 transition-all shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                
                {/* Left Side: Title & Mobile Search */}
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto items-center">
                  <h2 className="text-2xl font-bold tracking-tight mr-4 hidden md:block">Directory</h2>
                  
                  {/* Mobile Search Input (Synced with Hero Search) */}
                  <div className="relative w-full md:w-64 md:hidden">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search..." 
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                        // Mobile typically doesn't use suggestions dropdown as heavily, but we apply the search on Enter
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearchSubmit();
                      }}
                      className="pl-9 bg-white dark:bg-slate-900"
                    />
                  </div>

                  {/* Dropdowns */}
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
                
                {/* Right Side: Results & Clear */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <span>{filteredAndSortedArtists.length} result{filteredAndSortedArtists.length !== 1 && 's'}</span>
                   {(appliedSearch || searchInput || selectedCause !== 'all' || selectedLetter) && (
                     <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="h-8 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-3 h-3 mr-1" /> Clear
                     </Button>
                   )}
                </div>
              </div>

              {/* Alphabet Slider */}
              <div className="w-full overflow-x-auto no-scrollbar pb-2">
                <div className="flex space-x-1 min-w-max px-1">
                  <Button
                     variant={selectedLetter === null ? "default" : "ghost"}
                     size="sm"
                     onClick={() => setSelectedLetter(null)}
                     className={cn(
                       "h-8 w-auto px-3 rounded-full text-xs font-medium transition-all",
                       selectedLetter === null ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                     )}
                  >
                    All
                  </Button>
                  {alphabet.map((letter) => (
                    <Button
                      key={letter}
                      variant={selectedLetter === letter ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                      className={cn(
                        "h-8 w-8 p-0 rounded-full text-xs font-medium transition-all",
                        selectedLetter === letter 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {letter}
                    </Button>
                  ))}
                </div>
              </div>

            </div>

            {/* Gallery Grid */}
            <div className="min-h-[400px] pt-6">
              {filteredAndSortedArtists.length > 0 ? (
                <ArtistGallery artists={visibleArtists} />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-muted">
                  <div className="bg-muted/50 p-4 rounded-full mb-4">
                    <RotateCcw className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">No artists found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search, filters, or selected letter.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="bg-white dark:bg-slate-900 min-w-[200px] shadow-sm hover:bg-accent"
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

