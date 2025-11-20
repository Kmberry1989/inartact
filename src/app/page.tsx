import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArtistGallery } from '@/components/artist-gallery'
import { artists } from '@/lib/artists-data'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Art as Activism in Indiana
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10">
              Discover the artists, murals, and movements shaping social justice and community identity across the Hoosier state.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Explore the Inventory
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 bg-transparent">
                About the Project
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">The Inventory</h2>
                <p className="text-muted-foreground">
                  Exploring {artists.length} works of art and activism.
                </p>
              </div>
              {/* Search/Filter functionality would go here */}
            </div>

            <ArtistGallery artists={artists} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}