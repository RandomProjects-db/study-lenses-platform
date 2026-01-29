'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SpiderWeb } from '@/components/spider-web';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/lib/progress-store';
import { sampleLessons, sampleModules } from '@/lib/sample-data';
import { PHASE_CONFIG, RING_LABELS, type Phase } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  Award, 
  Target, 
  ArrowRight, 
  RotateCcw,
  Check,
  Circle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const { 
    completedLessons, 
    completedExercises, 
    currentRing, 
    currentPhase,
    currentLesson,
    resetProgress,
    setCurrentPosition
  } = useProgressStore();

  const totalLessons = sampleLessons.length;
  const totalExercises = sampleLessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0);

  const lessonsProgress = Math.round((completedLessons.length / totalLessons) * 100);
  const exercisesProgress = Math.round((completedExercises.length / totalExercises) * 100);

  const phaseConfig = PHASE_CONFIG[currentPhase];

  const handleSegmentClick = (ring: number, phase: Phase) => {
    setCurrentPosition(ring, phase);
    const lesson = sampleLessons.find(l => l.ring === ring && l.phase === phase);
    if (lesson) {
      router.push(`/lessons/${lesson.id}`);
    }
  };

  const currentLessonData = sampleLessons.find(l => l.id === currentLesson);

  // Get recent activity (last 5 completed lessons)
  const recentActivity = completedLessons
    .slice(-5)
    .reverse()
    .map(id => sampleLessons.find(l => l.id === id))
    .filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Learning Journey
            </h1>
            <p className="text-muted-foreground">
              Track your progress through the Spider Web learning model.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left column - Spider Web and stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Spider Web visualization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="font-semibold text-foreground mb-4">Progress Map</h2>
                <div className="flex justify-center">
                  <SpiderWeb 
                    size={350} 
                    interactive={true}
                    onSegmentClick={handleSegmentClick}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Click on any segment to navigate to that section
                </p>
              </motion.div>

              {/* Stats grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {completedLessons.length}
                      </p>
                      <p className="text-xs text-muted-foreground">of {totalLessons} lessons</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${lessonsProgress}%` }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-functional/10">
                      <Target className="h-5 w-5 text-phase-functional" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {completedExercises.length}
                      </p>
                      <p className="text-xs text-muted-foreground">of {totalExercises} exercises</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-phase-functional rounded-full transition-all duration-500"
                      style={{ width: `${exercisesProgress}%` }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-builder/10">
                      <Award className="h-5 w-5 text-phase-builder" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        Ring {currentRing}
                      </p>
                      <p className="text-xs text-muted-foreground">{RING_LABELS[currentRing]}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {phaseConfig.label} Phase
                  </p>
                </motion.div>
              </div>

              {/* Lessons progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="font-semibold text-foreground mb-4">All Lessons</h2>
                <div className="space-y-4">
                  {sampleModules.map((module) => (
                    <div key={module.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {module.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {module.lessons.filter(l => completedLessons.includes(l.id)).length} / {module.lessons.length}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {module.lessons.map((lesson) => {
                          const isComplete = completedLessons.includes(lesson.id);
                          const isCurrent = lesson.id === currentLesson;
                          const phaseColors = {
                            functional: 'bg-phase-functional',
                            navigational: 'bg-phase-navigational',
                            maintainer: 'bg-phase-maintainer',
                            builder: 'bg-phase-builder',
                          };

                          return (
                            <Link
                              key={lesson.id}
                              href={`/lessons/${lesson.id}`}
                              className={`
                                flex-1 h-8 rounded-md flex items-center justify-center transition-all
                                ${isComplete 
                                  ? phaseColors[lesson.phase] 
                                  : 'bg-muted hover:bg-muted/80'
                                }
                                ${isCurrent && !isComplete ? 'ring-2 ring-primary ring-offset-2' : ''}
                              `}
                              title={lesson.title}
                            >
                              {isComplete && (
                                <Check className="h-4 w-4 text-white" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column - Current position and activity */}
            <div className="space-y-6">
              {/* Current position */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="font-semibold text-foreground mb-4">Current Position</h2>
                
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Ring</p>
                    <p className="text-lg font-semibold text-foreground">
                      {currentRing}: {RING_LABELS[currentRing]}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Phase</p>
                    <p className="text-lg font-semibold text-foreground">
                      {phaseConfig.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {phaseConfig.description}
                    </p>
                  </div>

                  {currentLessonData && (
                    <Button asChild className="w-full">
                      <Link href={`/lessons/${currentLesson}`}>
                        Continue Learning
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Recent activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
                
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.map((lesson) => {
                      if (!lesson) return null;
                      const phaseConfig = PHASE_CONFIG[lesson.phase];
                      
                      return (
                        <Link
                          key={lesson.id}
                          href={`/lessons/${lesson.id}`}
                          className="flex items-start gap-3 rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors"
                        >
                          <Check className="h-4 w-4 text-phase-functional mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {phaseConfig.label} Phase
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Circle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No lessons completed yet
                    </p>
                    <Button asChild size="sm" className="mt-3">
                      <Link href="/lessons/lesson-1">
                        Start Learning
                      </Link>
                    </Button>
                  </div>
                )}
              </motion.div>

              {/* Reset progress */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="font-semibold text-foreground mb-2">Reset Progress</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Start fresh by clearing all your progress data.
                </p>
                <Button 
                  variant="outline" 
                  onClick={resetProgress}
                  className="w-full bg-transparent"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset All Progress
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
