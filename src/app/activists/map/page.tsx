'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { artistsData } from '@/lib/artists-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

// Dynamically import MapContainer and TileLayer to avoid SSR issues with Leaflet
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

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
        return <div className="p-8">Loading map...</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Activist Map</h1>
            <p className="text-muted-foreground mb-8">
                Explore the locations of art and activism across Indiana.
            </p>

            <Card className="overflow-hidden border-2">
                <CardContent className="p-0 h-[600px]">
                    <MapContainer
                        center={[39.7684, -86.1581]} // Indianapolis center
                        zoom={7}
                        style={{ height: '100%', width: '100%' }}
                        className="z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {mapArtists.map((artist) => (
                            <Marker
                                key={artist.id}
                                position={[artist.latitude!, artist.longitude!]}
                            >
                                <Popup>
                                    <div className="min-w-[200px]">
                                        <h3 className="font-bold text-lg">{artist.name}</h3>
                                        <p className="text-sm font-medium mb-1">{artist.title}</p>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {artist.location}
                                        </p>
                                        <Link
                                            href={`/artists/${artist.id}`}
                                            className="text-primary hover:underline text-sm"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </CardContent>
            </Card>
        </div>
    );
}
