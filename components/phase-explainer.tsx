'use client';

import { motion } from 'framer-motion';
import { PHASE_CONFIG } from '@/lib/types';
import { Play, Eye, Wrench, Hammer } from 'lucide-react';

const phaseIcons = {
  functional: Play,
  navigational: Eye,
  maintainer: Wrench,
  builder: Hammer,
};

const phases = Object.entries(PHASE_CONFIG).map(([key, config]) => ({
  key,
  ...config,
  icon: phaseIcons[key as keyof typeof phaseIcons],
}));

export function PhaseExplainer() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            The Four Learning Phases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each rotation around the spider web takes you through four distinct phases, 
            building your skills progressively.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid gap-8 md:grid-cols-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const colorClasses = {
                functional: 'border-phase-functional bg-phase-functional/5 text-phase-functional',
                navigational: 'border-phase-navigational bg-phase-navigational/5 text-phase-navigational',
                maintainer: 'border-phase-maintainer bg-phase-maintainer/5 text-phase-maintainer',
                builder: 'border-phase-builder bg-phase-builder/5 text-phase-builder',
              };
              const borderColor = colorClasses[phase.key as keyof typeof colorClasses];

              return (
                <motion.div
                  key={phase.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Phase number */}
                  <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 ${borderColor} mb-4`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Angle indicator */}
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    {phase.angle.start}° - {phase.angle.end}°
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {phase.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
