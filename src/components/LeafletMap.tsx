'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Artist } from '@/lib/types';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon in Next.js
const iconFix = () => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
};

export default function LeafletMap({ artists }: { artists: Artist[] }) {
    useEffect(() => {
        iconFix();
    }, []);

    return (
        <MapContainer
            center={[39.7684, -86.1581] as [number, number]}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {artists.map((artist) => (
                <Marker
                    key={artist.id}
                    position={[artist.artwork.latitude!, artist.artwork.longitude!] as [number, number]}
                >
                    <Popup>
                        <div className="min-w-[200px]">
                            <h3 className="font-bold text-lg">{artist.artist.name}</h3>
                            <p className="text-sm font-medium mb-1">{artist.artwork.title}</p>
                            <p className="text-xs text-muted-foreground mb-2">
                                {artist.artwork.location}
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
    );
}
