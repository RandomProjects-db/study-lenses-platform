import Link from 'next/link';
import { sampleModules } from '@/lib/sample-data';
import { PHASE_CONFIG, RING_LABELS } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LessonsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Lessons</h1>
        <p className="text-muted-foreground">
          Work through lessons in order, or jump to any topic that interests you.
        </p>
      </div>

      <div className="space-y-8">
        {sampleModules.map((module) => (
          <div key={module.id}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-primary">
                Ring {module.ring}: {RING_LABELS[module.ring]}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {module.title}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {module.lessons.map((lesson) => {
                const phaseConfig = PHASE_CONFIG[lesson.phase];

                const phaseColors = {
                  functional: 'border-l-phase-functional',
                  navigational: 'border-l-phase-navigational',
                  maintainer: 'border-l-phase-maintainer',
                  builder: 'border-l-phase-builder',
                };

                const phaseBadgeColors = {
                  functional: 'bg-phase-functional/10 text-phase-functional',
                  navigational: 'bg-phase-navigational/10 text-phase-navigational',
                  maintainer: 'bg-phase-maintainer/10 text-phase-maintainer',
                  builder: 'bg-phase-builder/10 text-phase-builder',
                };

                return (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className={`group rounded-lg border border-border bg-card p-4 border-l-4 ${phaseColors[lesson.phase]} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${phaseBadgeColors[lesson.phase]}`}>
                      {phaseConfig.label}
                    </span>
                    <p className="text-sm text-muted-foreground mt-2">
                      {lesson.exercises.length} exercise{lesson.exercises.length !== 1 ? 's' : ''}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Ready to start your learning journey?
        </p>
        <Button asChild>
          <Link href="/lessons/lesson-1">
            Start with Lesson 1
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
