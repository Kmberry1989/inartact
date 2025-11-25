import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SmoothScroller } from "@/components/smooth-scroller";
import { HeroParallax } from "@/components/hero-parallax";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <SmoothScroller />
      <Header />
      
      <main>
        {/* Parallax Hero Section 
          NOTE: If you have your search bar logic (ref, handleSearch, form) in your local file,
          you can now safely place it inside <HeroParallax>...</HeroParallax> without causing a type error.
        */}
        <HeroParallax />

        <section className="container py-24 space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Connecting Artists, Activists, and Communities
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore the intersection of art and activism in Indiana. Discover murals, sculptures, and the stories behind the creators shaping our cultural landscape.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/activists/map">
                <Button size="lg" className="text-lg px-8">
                  Explore Map
                </Button>
              </Link>
              <Link href="/activists/zine">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  View Zine
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Content / Grid could go here */}
      </main>

      <Footer />
    </div>
  );
}
