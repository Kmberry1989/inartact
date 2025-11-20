import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Palette } from 'lucide-react'
import { Artist } from '@/lib/types'

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="group overflow-hidden h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 border-slate-200 dark:border-slate-800">
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={artist.imageUrl || "/placeholder.svg?height=400&width=600"}
          alt={`Work by ${artist.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!artist.isAlive && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Historical
          </div>
        )}
      </div>
      <CardHeader className="pb-3 pt-5">
        <div className="space-y-1">
          <h3 className="font-bold text-xl leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {artist.name}
          </h3>
          <p className="text-sm font-medium text-primary/80 line-clamp-1">{artist.title}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 py-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Palette className="w-4 h-4 mr-2 shrink-0 text-slate-400" />
          <span className="truncate">{artist.medium}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2 shrink-0 text-slate-400" />
          <span className="truncate">{artist.location}</span>
        </div>
        <div className="pt-3">
          <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-700 hover:bg-slate-200">
            {artist.cause}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-5">
        <Link 
          href={`/artists/${artist.id}`} 
          className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2"
        >
          View Profile
        </Link>
      </CardFooter>
    </Card>
  )
}