'use client';

import { motion } from 'framer-motion';
import { BookOpen, RefreshCw, Layers } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Read First, Write Later',
    description: 'Build comprehension through exercises that help you understand code before you write it. No more staring at a blank editor.',
    color: 'text-phase-functional',
    bgColor: 'bg-phase-functional/10',
  },
  {
    icon: RefreshCw,
    title: 'Spiral Learning',
    description: 'Revisit concepts at increasing complexity. Each ring of the spider web adds new technology while reinforcing fundamentals.',
    color: 'text-phase-navigational',
    bgColor: 'bg-phase-navigational/10',
  },
  {
    icon: Layers,
    title: 'Four Phases',
    description: 'Progress through Functional, Navigational, Maintainer, and Builder phases. Master understanding before creation.',
    color: 'text-phase-maintainer',
    bgColor: 'bg-phase-maintainer/10',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HowItWorks() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our unique approach helps you build lasting programming skills through structured, 
            progressive learning.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`inline-flex rounded-lg p-3 ${feature.bgColor} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
