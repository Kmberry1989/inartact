import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              IA
            </div>
            <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
              Indiana Art Activist
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            href="/about" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="https://www.google.com/search?q=Indiana+Art+Activism" target="_blank">
              Resources
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}