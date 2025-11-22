"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

// Changed from '@/' to relative paths '..' to fix resolution errors
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ArtistGallery } from "../components/artist-gallery";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { artists } from "../lib/artists-data";

export default function Home() {
    const [searchInput, setSearchInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // -------------------------------------------
    // 1. Parallax & Animation Hooks
    // -------------------------------------------
    const { scrollY } = useScroll();

    // Text moves down slower than scroll (Parallax)
    const yText = useTransform(scrollY, [0, 300], [0, 100]);

    // Text fades out as you scroll down
    const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

    // -------------------------------------------
    // 2. Search & Filter Logic
    // -------------------------------------------
    const filteredArtists = artists.filter((artist) =>
        artist.artist.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        (artist.artwork.location && artist.artwork.location.toLowerCase().includes(searchInput.toLowerCase())) ||
        (artist.artwork.tags && artist.artwork.tags.some(tag => tag.toLowerCase().includes(searchInput.toLowerCase())))
    );

    const searchSuggestions = searchInput.length > 0
        ? artists
            .filter((artist) =>
                artist.artist.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .slice(0, 5)
        : [];

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        // Optional: Programmatically scroll to directory
        const directory = document.getElementById("directory");
        if (directory) directory.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans transition-colors duration-300 overflow-x-hidden selection:bg-primary/30">
            <Header />

            <main className="flex-1">

                {/* ----------------------------------------------------------------- */}
                {/* HERO SECTION (Parallax & Animated)                                */}
                {/* ----------------------------------------------------------------- */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20">

                    {/* Background Ambient Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-0 pointer-events-none" />

                    <motion.div
                        style={{ y: yText, opacity: opacityText }}
                        className="container relative z-10 mx-auto px-4 text-center"
                    >
                        {/* 1. Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center"
                        >
                            <Badge variant="secondary" className="mb-8 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm shadow-sm hover:bg-primary/20 transition-colors cursor-default">
                                {artists.length} Stories of Change
                            </Badge>
                        </motion.div>

                        {/* 2. Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-5xl md:text-7xl lg:text-9xl font-bold font-heading tracking-tighter mb-8 text-foreground leading-[1.1]"
                        >
                            Art as Activism
                            <br className="block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x pb-2 bg-[length:200%_auto]">
                                in Indiana
                            </span>
                        </motion.h1>

                        {/* 3. Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-sans"
                        >
                            Discover the artists, murals, and movements shaping social justice and community identity across the Hoosier state.
                        </motion.p>

                        {/* 4. Search Bar Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="max-w-lg mx-auto relative z-20"
                            ref={searchContainerRef}
                        >
                            <form onSubmit={handleSearchSubmit} className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                                <Input
                                    className="pl-14 h-16 rounded-full bg-background/60 border-input/50 text-lg shadow-lg hover:shadow-2xl hover:bg-background/80 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 backdrop-blur-xl"
                                    placeholder="Search artists, cities, or topics..."
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    // Small delay on blur to allow clicking links in dropdown
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                />
                            </form>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && searchSuggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="absolute mt-3 w-full bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left z-50"
                                >
                                    {searchSuggestions.map((artist) => (
                                        <Link
                                            key={artist.id}
                                            href={`/artists/${artist.id}`}
                                            className="block px-6 py-4 hover:bg-primary/5 transition-colors border-b border-border/40 last:border-0"
                                            onClick={() => setShowSuggestions(false)}
                                        >
                                            <div className="font-semibold text-foreground text-lg">{artist.artist.name}</div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span className="inline-block w-2 h-2 rounded-full bg-primary/50" />
                                                {artist.artwork.medium}
                                                <span className="text-border">|</span>
                                                {artist.artwork.location}
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </section>

                {/* ----------------------------------------------------------------- */}
                {/* DIRECTORY SECTION (Masonry Grid)                                  */}
                {/* ----------------------------------------------------------------- */}
                <section className="container mx-auto px-4 pb-24 relative z-10" id="directory">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border/40 pb-6 gap-4">
                            <div>
                                <h2 className="text-4xl font-bold font-heading mb-2 text-foreground">Artist Directory</h2>
                                <p className="text-muted-foreground text-lg">
                                    {searchInput ? `Showing results for "${searchInput}"` : "Explore the complete collection of Indiana activists"}
                                </p>
                            </div>

                            {searchInput && (
                                <button
                                    onClick={() => setSearchInput("")}
                                    className="text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>

                        {filteredArtists.length > 0 ? (
                            <ArtistGallery artists={filteredArtists} />
                        ) : (
                            <div className="text-center py-32 bg-muted/30 rounded-3xl border border-dashed border-border">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                    <Search className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">No artists found</h3>
                                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                    We couldn't find any artists matching "{searchInput}". Try searching for a different keyword or location.
                                </p>
                                <button
                                    onClick={() => setSearchInput("")}
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Reset Search
                                </button>
                            </div>
                        )}
                    </motion.div>
                </section>

            </main>

            <Footer />
        </div>
    );
}