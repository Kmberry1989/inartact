'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { artistsData } from '@/lib/artists-data';
import { Card, CardContent } from '@/components/ui/card';

// Dynamically import the Map component to avoid SSR issues
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-muted">Loading map...</div>
});

export default function MapPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Filter artists who have coordinates
    const mapArtists = artistsData.filter(
        (artist) => artist.latitude && artist.longitude
    );

    if (!isMounted) {
        return null;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Activist Map</h1>
            <p className="text-muted-foreground mb-8">
                Explore the locations of art and activism across Indiana.
            </p>

            <Card className="overflow-hidden border-2">
                <CardContent className="p-0 h-[600px]">
                    <LeafletMap artists={mapArtists} />
                </CardContent>
            </Card>
        </div>
    );
}
