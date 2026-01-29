'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">Study Lenses</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link 
            href="/lessons" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Lessons
          </Link>
          <Link 
            href="/tracers" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Tracers
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Button asChild>
            <Link href="/lessons/lesson-1">
              Start Learning
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 border-t border-border',
          mobileMenuOpen ? 'max-h-64' : 'max-h-0 border-t-0'
        )}
      >
        <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
          <Link 
            href="/lessons" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BookOpen className="h-4 w-4" />
            Lessons
          </Link>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Button asChild className="w-full">
            <Link href="/lessons/lesson-1">
              Start Learning
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
