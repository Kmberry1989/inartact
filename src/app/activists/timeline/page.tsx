import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { artistsData } from '@/lib/artists-data'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function TimelinePage() {
    // Sort artists by date (simple string comparison for now, can be improved with real dates)
    const sortedArtists = [...artistsData].sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-2">Activism Timeline</h1>
                <p className="text-muted-foreground mb-12">
                    A chronological journey through art and activism in Indiana.
                </p>

                <div className="relative border-l-2 border-muted ml-4 md:ml-12 space-y-12 pb-12">
                    {sortedArtists.map((artist, index) => (
                        <div key={artist.id} className="relative pl-8 md:pl-12">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-32 shrink-0 pt-1">
                                    <span className="font-bold text-xl text-primary">{artist.date}</span>
                                </div>

                                <Card className="flex-1">
                                    <CardHeader>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <Badge variant="secondary">{artist.cause}</Badge>
                                            <Badge variant="outline">{artist.location}</Badge>
                                        </div>
                                        <CardTitle className="text-2xl">
                                            <Link href={`/artists/${artist.id}`} className="hover:underline">
                                                {artist.title}
                                            </Link>
                                        </CardTitle>
                                        <p className="text-muted-foreground font-medium">{artist.name}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-sm md:text-base">{artist.workDescription}</p>
                                        <Link
                                            href={`/artists/${artist.id}`}
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            Read full profile →
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
