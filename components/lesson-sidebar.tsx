'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { sampleModules } from '@/lib/sample-data';
import { PHASE_CONFIG, RING_LABELS } from '@/lib/types';
import { useProgressStore } from '@/lib/progress-store';
import { ChevronDown, Check, Circle, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function LessonSidebar() {
  const pathname = usePathname();
  const { isLessonCompleted } = useProgressStore();
  const [expandedModules, setExpandedModules] = useState<string[]>(['module-1']);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <aside className="w-72 border-r border-border bg-sidebar h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-sidebar-primary" />
          <span className="font-semibold text-sidebar-foreground">Course Content</span>
        </div>

        <nav className="space-y-2">
          {sampleModules.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            const completedCount = module.lessons.filter((l) =>
              isLessonCompleted(l.id)
            ).length;

            return (
              <div key={module.id}>
                <button
                  onClick={() => toggleModule(module.id)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-sidebar-primary font-semibold">
                      Ring {module.ring}
                    </span>
                    <span className="truncate">{module.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {completedCount}/{module.lessons.length}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-1 ml-2 space-y-1">
                    {module.lessons.map((lesson) => {
                      const isActive = pathname === `/lessons/${lesson.id}`;
                      const isCompleted = isLessonCompleted(lesson.id);
                      const phaseConfig = PHASE_CONFIG[lesson.phase];

                      const phaseColors = {
                        functional: 'text-phase-functional',
                        navigational: 'text-phase-navigational',
                        maintainer: 'text-phase-maintainer',
                        builder: 'text-phase-builder',
                      };

                      return (
                        <Link
                          key={lesson.id}
                          href={`/lessons/${lesson.id}`}
                          className={cn(
                            'flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                            isActive
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                              : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                          )}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {isCompleted ? (
                              <Check className="h-4 w-4 text-phase-functional" />
                            ) : (
                              <Circle className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-medium">{lesson.title}</p>
                            <p className={cn('text-xs', phaseColors[lesson.phase])}>
                              {phaseConfig.label}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
