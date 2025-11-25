import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArtistGallery } from "@/components/artist-gallery";
import { Suspense } from "react";

export const metadata = {
  title: "Artist Directory | Activism IN Artistry",
  description: "Browse the directory of artists and activists shaping Indiana's cultural landscape.",
};

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      
      <main className="container py-12 md:py-20">
        <div className="space-y-6 pb-10 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Artist <span className="text-primary">Directory</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Discover the creatives behind the movement. Search and filter to find artists, muralists, and activists working across Indiana.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading directory...</div>}>
          {/* No props needed now, uses default export from artists-data.ts */}
          <ArtistGallery />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
