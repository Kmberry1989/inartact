'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Megaphone, Newspaper, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Define the shape of a news event
type EventItem = {
  id: string;
  title: string;
  date: string;
  organization: string;
  category: 'Grant' | 'Exhibition' | 'Performance' | 'Advocacy';
  summary: string;
  imageUrl: string;
  link: string;
};

// Mock Data: Based on real Indiana Art Activism events (2024-2025)
const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Public Art for All: Addressing Equity',
    date: 'August 5, 2025',
    organization: 'Indy Arts Council',
    category: 'Grant',
    summary: 'New grants awarded for "Transformation Art in an Under-Resourced Area" and murals honoring historic neighborhoods, aiming to advance cultural equity in Indianapolis public spaces.',
    imageUrl: '/mcmillenparkbasketballcourtmural.jpeg', // Using your existing relevant image
    link: 'https://indyarts.org',
  },
  {
    id: '2',
    title: 'All of Us: An Anti-Asian-Hate Opera',
    date: 'Fall 2025',
    organization: 'Allied Solutions Center',
    category: 'Performance',
    summary: 'Composer Hippocrates Cheng debuts a new opera shedding light on Asian hate. The work emphasizes unity and empathy, blending Asian traditional and Western classical elements.',
    imageUrl: '/together.jpg', // Using your existing relevant image
    link: 'https://thecenterpresents.org',
  },
  {
    id: '3',
    title: 'Advocacy Alert: Arts Funding at Risk',
    date: 'Urgent Action',
    organization: 'Indiana Arts Coalition',
    category: 'Advocacy',
    summary: 'Statewide call to action: Local artists mobilize against proposed federal and state funding cuts that threaten community identity and the livelihood of creative workers.',
    imageUrl: '/wethepeople.webp', // Using your existing relevant image
    link: 'https://indyarts.org/indyartsaction',
  },
  {
    id: '4',
    title: 'Muncie Neighborhood Revitalization',
    date: 'August 19, 2025',
    organization: 'MuncieArts',
    category: 'Exhibition',
    summary: 'A $500,000 investment in community-based art launches in the Whitely and South Central neighborhoods, focusing on works that reflect local history, hope, and resilience.',
    imageUrl: '/whispersfromthedivide.png', // Using your existing relevant image
    link: 'https://munciejournal.com',
  }
];

export function CurrentEventsWidget() {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        
        {/* Widget Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Megaphone className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Current Happenings</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
              Art Activism <span className="text-muted-foreground">News & Events</span>
            </h2>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            View All News <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                    <span className="mx-1">•</span>
                    <span>{item.organization}</span>
                  </div>
                  <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.summary}
                  </p>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button asChild variant="ghost" size="sm" className="w-full justify-between hover:bg-muted group/btn">
                    <Link href={item.link} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ExternalLink className="h-3 w-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full gap-2">
            View All News <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </section>
  );
}