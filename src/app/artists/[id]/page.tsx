import { notFound } from 'next/navigation'
import { artists } from '@/lib/artists-data'
import { ArtistProfile } from './artist-profile'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

// Generate static params for all known artists at build time
export async function generateStaticParams() {
  return artists.map((artist) => ({
    id: artist.id,
  }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // Await the params promise
  const { id } = await params
  const artist = artists.find((a) => a.id === id)

  if (!artist) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <ArtistProfile artist={artist} />
      </main>
      <Footer />
    </div>
  )
}