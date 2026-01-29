'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function SampleLessonPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch a sample lesson and try an interactive exercise to experience 
            the Study Lenses approach.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Video placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-xl overflow-hidden bg-foreground/5 border border-border shadow-lg"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                  <Play className="h-7 w-7 ml-1" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Introduction to Python Programs
                </p>
              </div>
            </div>
          </motion.div>

          {/* Exercise preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-phase-functional" />
                <span className="text-sm font-medium text-muted-foreground">
                  Parsons Problem Exercise
                </span>
              </div>

              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Order the Code Lines
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop code lines into the correct order to create a 
                working Python program.
              </p>

              {/* Preview of code blocks */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 font-mono text-sm">
                  <span className="text-muted-foreground">1</span>
                  <code className="text-foreground">{"print(\"Hello, World!\")"}</code>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-background p-3">
                  <span className="text-muted-foreground text-sm">Drop here...</span>
                </div>
              </div>

              <Button asChild className="w-full gap-2">
                <Link href="/exercises/parsons/ex-1-1">
                  Try This Exercise
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/exercises/tracing/ex-2-1">
                  Try Code Tracing
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/exercises/bsi/ex-3-1">
                  Try BSI Exercise
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
