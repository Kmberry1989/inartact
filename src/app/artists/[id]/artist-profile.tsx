'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ExternalLink, MapPin, Info, Globe, Newspaper, Instagram, Facebook } from 'lucide-react';
import { Artist } from '@/lib/types';
import { LikeButton } from '@/components/LikeButton';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';
import { parseSocialMediaLink } from '@/lib/social-media-utils';
import { ImageLightbox } from '@/components/ImageLightbox';
import { TextToSpeech } from '@/components/text-to-speech';

interface ArtistProfileProps {
  artist: Artist;
}

export function ArtistProfile({ artist }: ArtistProfileProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const [showLightbox, setShowLightbox] = useState(false);

  // Combine text for the screen reader
  const readableText = `Artist Profile for ${artist.artist.name}. ${
    artist.artist.isAlive ? '' : `Born ${artist.artist.born}, Died ${artist.artist.died}.`
  } ${artist.artist.bio || ''} . The Work: ${artist.artwork.title}. ${
    artist.artwork.description || ''
  }`;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Directory
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Left Column: Image & Key Details */}
        <div className="space-y-8">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border shadow-md cursor-pointer group"
            onClick={() => setShowLightbox(true)}
          >
            <Image
              src={artist.artwork.imageUrl || '/placeholder.svg?height=800&width=600'}
              alt={artist.artwork.alt || `Artwork by ${artist.artist.name}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-md">
                Click to view fullscreen
              </p>
            </div>
          </div>

          {/* Image Credit (if available) */}
          {/* Note: You can add the imageCredit field to your type definition to use this */}
          {/* {artist.artwork.imageCredit && (
            <p className="text-xs text-muted-foreground mt-1 text-right italic">
              Image credit: {artist.artwork.imageCredit}
            </p>
          )} */}

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold mb-4 flex items-center text-lg">
              <Info className="w-5 h-5 mr-2 text-primary" />
              Key Details
            </h3>
            <dl className="grid gap-4 text-sm">
              <div className="grid grid-cols-3 gap-1 items-baseline">
                <dt className="font-medium text-muted-foreground">Title</dt>
                <dd className="col-span-2 font-semibold">{artist.artwork.title}</dd>
              </div>
              {artist.artwork.medium && (
                <>
                  <Separator />
                  <div className="grid grid-cols-3 gap-1 items-baseline">
                    <dt className="font-medium text-muted-foreground">Medium</dt>
                    <dd className="col-span-2">{artist.artwork.medium}</dd>
                  </div>
                </>
              )}
              {artist.artwork.date && (
                <>
                  <Separator />
                  <div className="grid grid-cols-3 gap-1 items-baseline">
                    <dt className="font-medium text-muted-foreground">Date</dt>
                    <dd className="col-span-2">{artist.artwork.date}</dd>
                  </div>
                </>
              )}
              {artist.artwork.location && (
                <>
                  <Separator />
                  <div className="grid grid-cols-3 gap-1 items-baseline">
                    <dt className="font-medium text-muted-foreground">Location</dt>
                    <dd className="col-span-2 flex items-start">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-muted-foreground shrink-0" />
                      {artist.artwork.location}
                    </dd>
                  </div>
                </>
              )}
            </dl>

            {(artist.artwork.categories?.length || artist.artwork.tags?.length) ? (
              <>
                <Separator className="my-4" />
                <div className="space-y-3">
                  {artist.artwork.categories && artist.artwork.categories.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                        Categories
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {artist.artwork.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {artist.artwork.tags && artist.artwork.tags.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {artist.artwork.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Right Column: Bio & Description */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              {artist.artwork.cause && (
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm">
                  {artist.artwork.cause}
                </Badge>
              )}
              {!artist.artist.isAlive && (
                <Badge variant="secondary" className="text-sm">
                  Historical Figure
                </Badge>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {artist.artist.name}
                </h1>
                {artist.artist.born && artist.artist.died && (
                  <p className="text-lg text-muted-foreground">
                    ({artist.artist.born} – {artist.artist.died})
                  </p>
                )}
              </div>
              {/* Text to Speech Button */}
              <div className="mt-2 shrink-0">
                <TextToSpeech text={readableText} label="Listen to Profile" />
              </div>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
            {artist.artist.bio && (
              <>
                <h3 className="text-xl font-semibold mb-3">About the Artist</h3>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  {artist.artist.bio}
                </p>
              </>
            )}

            {artist.artwork.description && (
              <>
                <h3 className="text-xl font-semibold mb-3">The Work</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {artist.artwork.description}
                </p>
              </>
            )}

            {artist.artist.social_media && artist.artist.social_media.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2 uppercase tracking-wider">Follow</h4>
                <div className="flex flex-wrap gap-2">
                  {artist.artist.social_media.map((link, index) => {
                    const socialLink = parseSocialMediaLink(link);
                    const IconComponent =
                      socialLink.icon === 'instagram'
                        ? Instagram
                        : socialLink.icon === 'facebook'
                        ? Facebook
                        : Globe;
                    return (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <IconComponent className="mr-2 h-3 w-3" />
                          {socialLink.handle}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {artist.artwork.news_media_coverage &&
              artist.artwork.news_media_coverage.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2 uppercase tracking-wider flex items-center">
                    <Newspaper className="mr-2 h-4 w-4" />
                    News & Media Coverage
                  </h4>
                  <ul className="space-y-2">
                    {artist.artwork.news_media_coverage.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="mr-2 h-3 w-3" />
                          {new URL(link).hostname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {(artist.artwork.mixcloudEmbed || artist.artwork.vimeoUrl) && (
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-semibold mb-3">Media</h3>
                {artist.artwork.mixcloudEmbed && (
                  <div
                    className="w-full overflow-hidden rounded-lg shadow-sm"
                    dangerouslySetInnerHTML={{ __html: artist.artwork.mixcloudEmbed }}
                  />
                )}
                {artist.artwork.vimeoUrl && (
                  <div className="aspect-video w-full overflow-hidden rounded-lg shadow-sm">
                    <iframe
                      src={`https://player.vimeo.com/video/${artist.artwork.vimeoUrl
                        .split('/')
                        .pop()
                        ?.split('?')[0]}`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t">
            {/* <LikeButton artistId={artist.id} /> */}
            <FavoriteButton artistId={artist.id} />
            <ShareButton
              url={currentUrl}
              title={`${artist.artist.name} - ${artist.artwork.title}`}
              description={artist.artwork.description}
            />

            {artist.artwork.searchQuery && (
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto shadow-sm">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    artist.artwork.searchQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Research
                </a>
              </Button>
            )}

            {artist.artist.website && (
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a href={artist.artist.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Official Website
                </a>
              </Button>
            )}

            {artist.artwork.portfolio_url && (
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a
                  href={artist.artwork.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Portfolio
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {showLightbox && (
        <ImageLightbox
          src={artist.artwork.imageUrl || '/placeholder.svg?height=800&width=600'}
          alt={artist.artwork.alt || `Artwork by ${artist.artist.name}`}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </div>
  );
}