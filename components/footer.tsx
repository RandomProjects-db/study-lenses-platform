import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Study Lenses</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Learn to read code before you write it. Master programming through 
              progressive, spiral learning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Learn</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/lessons" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Lessons
                </Link>
              </li>
              <li>
                <Link href="/lessons/lesson-1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Your Progress
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Exercises</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/exercises/parsons/ex-1-1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Parsons Problems
                </Link>
              </li>
              <li>
                <Link href="/exercises/tracing/ex-2-1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Code Tracing
                </Link>
              </li>
              <li>
                <Link href="/exercises/bsi/ex-3-1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  BSI Comparison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  The Spider Web Model
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Study Lenses - An open approach to programming education.
          </p>
        </div>
      </div>
    </footer>
  );
}
