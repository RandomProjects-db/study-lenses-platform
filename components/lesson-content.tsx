'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MarkdownContent } from '@/components/markdown-content';
import { PHASE_CONFIG, RING_LABELS, type Lesson } from '@/lib/types';
import { useProgressStore } from '@/lib/progress-store';
import { ArrowLeft, ArrowRight, Check, Play, ExternalLink } from 'lucide-react';
import { sampleLessons } from '@/lib/sample-data';

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const { completeLesson, isLessonCompleted } = useProgressStore();
  const phaseConfig = PHASE_CONFIG[lesson.phase];
  const isCompleted = isLessonCompleted(lesson.id);

  const currentIndex = sampleLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? sampleLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sampleLessons.length - 1 ? sampleLessons[currentIndex + 1] : null;

  const phaseColors = {
    functional: 'bg-phase-functional/10 text-phase-functional border-phase-functional/20',
    navigational: 'bg-phase-navigational/10 text-phase-navigational border-phase-navigational/20',
    maintainer: 'bg-phase-maintainer/10 text-phase-maintainer border-phase-maintainer/20',
    builder: 'bg-phase-builder/10 text-phase-builder border-phase-builder/20',
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/lessons" className="hover:text-foreground transition-colors">
            Lessons
          </Link>
          <span>/</span>
          <span>Ring {lesson.ring}: {RING_LABELS[lesson.ring]}</span>
          <span>/</span>
          <span className="text-foreground">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${phaseColors[lesson.phase]}`}>
              {phaseConfig.label} Phase
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-phase-functional/10 border border-phase-functional/20 text-phase-functional px-3 py-1 text-xs font-medium">
                <Check className="h-3 w-3" />
                Completed
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {lesson.title}
          </h1>
          <p className="text-muted-foreground">
            {phaseConfig.description}
          </p>
        </div>

        {/* Video embed */}
        {lesson.videoUrl && (
          <div className="mb-8">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Play className="h-6 w-6 ml-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">Video placeholder</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <MarkdownContent content={lesson.content} />

        {/* Exercises section */}
        {lesson.exercises.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Practice Exercises
            </h2>
            <div className="space-y-3">
              {lesson.exercises.map((exercise) => {
                const exerciseType = {
                  parsons: { label: 'Parsons Problem', path: 'parsons' },
                  tracing: { label: 'Code Tracing', path: 'tracing' },
                  bsi: { label: 'BSI Comparison', path: 'bsi' },
                  'multiple-choice': { label: 'Multiple Choice', path: 'quiz' },
                };

                const typeConfig = exerciseType[exercise.type];

                return (
                  <Link
                    key={exercise.id}
                    href={`/exercises/${typeConfig.path}/${exercise.id}`}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium text-card-foreground group-hover:text-foreground">
                          {exercise.question}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {typeConfig.label}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Mark complete button */}
        {!isCompleted && (
          <div className="mt-8">
            <Button
              onClick={() => completeLesson(lesson.id)}
              className="w-full"
              size="lg"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark Lesson as Complete
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          {prevLesson ? (
            <Button variant="outline" asChild className="bg-transparent">
              <Link href={`/lessons/${prevLesson.id}`} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {prevLesson.title}
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Button asChild>
              <Link href={`/lessons/${nextLesson.id}`} className="gap-2">
                {nextLesson.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard" className="gap-2">
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
