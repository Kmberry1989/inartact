'use client';

import * as React from 'react';
import { Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Default (Light)', color: 'bg-slate-100 border-slate-300' },
    { id: 'dark', name: 'Dark', color: 'bg-slate-900 border-slate-700' },
    { id: 'high-contrast', name: 'High Contrast', color: 'bg-white border-black border-2' },
    { id: 'crimson', name: 'Crimson', color: 'bg-[#D61F3D]' },
    { id: 'royal', name: 'Royal', color: 'bg-[#6b21a8]' },
    { id: 'elegant', name: 'Elegant', color: 'bg-[#fcfbf7] border-[#9c6b42]' },
    { id: 'noir', name: 'Noir', color: 'bg-black border-white/20' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Theme Settings">
          <Settings className="h-5 w-5 transition-transform duration-500 hover:rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id as any)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={cn("h-4 w-4 rounded-full border", t.color)} />
              <span>{t.name}</span>
            </div>
            {theme === t.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}