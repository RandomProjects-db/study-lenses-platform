'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SpiderWeb } from '@/components/spider-web';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              New: Python Fundamentals Course
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Learn to Read Code{' '}
              <span className="text-primary">Before You Write It</span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground text-pretty">
              Master programming through the Spider Web learning model - revisit concepts at 
              increasing complexity, build deep understanding layer by layer.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/lessons/lesson-1">
                  Start Learning Python
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Play className="h-4 w-4" />
                Watch Introduction
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">40+</span>
                <span className="text-sm text-muted-foreground">Interactive Lessons</span>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">120+</span>
                <span className="text-sm text-muted-foreground">Practice Exercises</span>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">Free</span>
                <span className="text-sm text-muted-foreground">Always</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Spider Web */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <SpiderWeb size={400} interactive={false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
