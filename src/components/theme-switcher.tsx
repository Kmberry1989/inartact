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
    { id: 'default', name: 'Hoosier (Default)', color: 'bg-[#003366] border-yellow-400' },
    { id: 'cardinal', name: 'Cardinal', color: 'bg-[#C41E3A]' },
    { id: 'peony', name: 'Peony', color: 'bg-[#F64A8A]' },
    { id: 'high-contrast', name: 'High Contrast', color: 'bg-white border-black border-2' },
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