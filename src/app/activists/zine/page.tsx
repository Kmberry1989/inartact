'use client';

import { useState } from 'react';
import { artistsData } from '@/lib/artists-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function ZinePage() {
    const [selectedCause, setSelectedCause] = useState<string>('all');
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

    // Get unique causes
    const causes = Array.from(new Set(artistsData.map((a) => a.cause)));

    // Filter artists by cause
    const filteredArtists =
        selectedCause === 'all'
            ? artistsData
            : artistsData.filter((a) => a.cause === selectedCause);

    const toggleArtist = (id: string) => {
        setSelectedArtists((prev) =>
            prev.includes(id)
                ? prev.filter((artistId) => artistId !== id)
                : [...prev, id]
        );
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container mx-auto py-8 px-4 print:p-0">
            {/* No-print controls */}
            <div className="print:hidden mb-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Zine Generator</h1>
                    <p className="text-muted-foreground">
                        Select artists to create a printable zine layout.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 items-end">
                    <div className="space-y-2 w-[200px]">
                        <Label>Filter by Cause</Label>
                        <Select value={selectedCause} onValueChange={setSelectedCause}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a cause" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Causes</SelectItem>
                                {causes.map((cause) => (
                                    <SelectItem key={cause} value={cause}>
                                        {cause}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={handlePrint} disabled={selectedArtists.length === 0}>
                        Print Zine ({selectedArtists.length})
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredArtists.map((artist) => (
                        <div
                            key={artist.id}
                            className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                            <Checkbox
                                id={`artist-${artist.id}`}
                                checked={selectedArtists.includes(artist.id)}
                                onCheckedChange={() => toggleArtist(artist.id)}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor={`artist-${artist.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {artist.name}
                                </label>
                                <p className="text-xs text-muted-foreground">{artist.title}</p>
                                <p className="text-xs text-muted-foreground">{artist.cause}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Printable Layout */}
            <div className="hidden print:block">
                <div className="grid grid-cols-2 gap-8">
                    {/* Cover Page */}
                    <div className="h-[50vh] flex flex-col justify-center items-center text-center border-b-2 border-dashed pb-8">
                        <h1 className="text-4xl font-bold mb-4">InArtAct Zine</h1>
                        <p className="text-xl mb-2">Art & Activism in Indiana</p>
                        <p className="text-sm text-muted-foreground">
                            Generated on {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    {/* Artist Pages */}
                    {artistsData
                        .filter((a) => selectedArtists.includes(a.id))
                        .map((artist) => (
                            <div
                                key={artist.id}
                                className="h-[50vh] flex flex-col p-8 border-b-2 border-dashed break-inside-avoid"
                            >
                                <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
                                <p className="font-medium mb-4">{artist.title}</p>
                                <p className="text-sm mb-4 flex-grow">{artist.bio}</p>
                                <div className="mt-auto">
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1">
                                        Cause
                                    </p>
                                    <p className="text-sm">{artist.cause}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
