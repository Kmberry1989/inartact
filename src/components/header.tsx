import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Indiana Art Activist
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/about">
              About
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://www.google.com/search?q=Indiana+Art+Activism" target="_blank">
              Resources
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}