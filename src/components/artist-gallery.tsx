import { ArtistCard } from './artist-card'
import { Artist } from '@/lib/types'

interface ArtistGalleryProps {
  artists: Artist[]
}

export function ArtistGallery({ artists }: ArtistGalleryProps) {
  if (!artists?.length) {
    return (
      <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
        <p className="text-lg">No artists found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {artists.map((artist) => (
        <div key={artist.id} className="h-full">
          <ArtistCard artist={artist} />
        </div>
      ))}
    </div>
  )
}