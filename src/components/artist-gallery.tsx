'use client';

import { useState } from 'react';
import { Artist } from "@/lib/types";
import { ArtistCard } from "@/components/artist-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { artists as allArtistsData } from "@/lib/artists-data";

// Make props optional to support usage where data isn't passed explicitly
export interface ArtistGalleryProps {
  artists?: Artist[];
}

export function ArtistGallery({ artists = allArtistsData }: ArtistGalleryProps) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);

  // Filter logic
  const filteredArtists = artists.filter(item => {
    const matchesSearch = (
      item.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artwork.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artwork.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesCause = selectedCause 
      ? item.artwork.cause.includes(selectedCause)
      : true;

    return matchesSearch && matchesCause;
  });

  // Get unique causes for filter dropdown (optional enhancement)
  const allCauses = Array.from(new Set(artists.map(a => a.artwork.cause.split(',')[0].trim())));

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-background/60 backdrop-blur-md border rounded-xl sticky top-20 z-40 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by artist, artwork, or cause..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <Button 
            variant={selectedCause === null ? "default" : "outline"}
            onClick={() => setSelectedCause(null)}
            size="sm"
          >
            All
          </Button>
          {allCauses.slice(0, 5).map(cause => (
            <Button
              key={cause}
              variant={selectedCause === cause ? "default" : "outline"}
              onClick={() => setSelectedCause(cause === selectedCause ? null : cause)}
              size="sm"
              className="whitespace-nowrap"
            >
              {cause}
            </Button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No artists found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          <Button 
            variant="link" 
            onClick={() => { setSearchQuery(''); setSelectedCause(null); }}
            className="mt-2"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
