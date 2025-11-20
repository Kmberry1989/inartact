import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ExternalLink, MapPin, Info } from 'lucide-react'
import { Artist } from '@/lib/types'

interface ArtistProfileProps {
  artist: Artist
}

export function ArtistProfile({ artist }: ArtistProfileProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Inventory
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Image Column */}
        <div className="space-y-8">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border shadow-md">
            <Image
              src={artist.imageUrl || "/placeholder.svg?height=800&width=600"}
              alt={`Artwork by ${artist.name}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold mb-4 flex items-center text-lg">
              <Info className="w-5 h-5 mr-2 text-primary" />
              Key Details
            </h3>
            <dl className="grid gap-4 text-sm">
              <div className="grid grid-cols-3 gap-1 items-baseline">
                <dt className="font-medium text-muted-foreground">Title</dt>
                <dd className="col-span-2 font-semibold">{artist.title}</dd>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-1 items-baseline">
                <dt className="font-medium text-muted-foreground">Medium</dt>
                <dd className="col-span-2">{artist.medium}</dd>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-1 items-baseline">
                <dt className="font-medium text-muted-foreground">Date</dt>
                <dd className="col-span-2">{artist.date}</dd>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-1 items-baseline">
                <dt className="font-medium text-muted-foreground">Location</dt>
                <dd className="col-span-2 flex items-start">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-muted-foreground shrink-0" />
                  {artist.location}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm">
                {artist.cause}
              </Badge>
              {!artist.isAlive && (
                <Badge variant="secondary" className="text-sm">Historical Figure</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{artist.name}</h1>
            {artist.born && artist.died && (
              <p className="text-lg text-muted-foreground">
                ({artist.born} – {artist.died})
              </p>
            )}
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
            <h3 className="text-xl font-semibold mb-3">About the Artist</h3>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              {artist.bio}
            </p>
            
            <h3 className="text-xl font-semibold mb-3">The Work</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {artist.workDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-sm">
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(artist.searchQuery)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Research this Artist
              </a>
            </Button>
            {artist.link && (
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a href={artist.link} target="_blank" rel="noopener noreferrer">
                  Visit Official Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}