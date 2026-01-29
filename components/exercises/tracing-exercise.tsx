'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/lib/progress-store';
import type { Exercise, TracingStep } from '@/lib/types';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Lightbulb, 
  RotateCcw, 
  ArrowLeft,
  Play,
  SkipForward
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface TracingExerciseProps {
  exercise: Exercise;
  lessonId?: string;
}

export function TracingExercise({ exercise, lessonId }: TracingExerciseProps) {
  const { completeExercise, isExerciseCompleted } = useProgressStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const isCompleted = isExerciseCompleted(exercise.id);

  const steps = exercise.tracingSteps || [];
  const currentStepData = steps[currentStep];
  const codeLines = (exercise.code || '').split('\n');

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      completeExercise(exercise.id);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const resetExercise = () => {
    setCurrentStep(0);
    setShowHint(false);
    setHintIndex(0);
    setShowAllSteps(false);
  };

  const showNextHint = () => {
    if (hintIndex < exercise.hints.length - 1) {
      setHintIndex((h) => h + 1);
    }
    setShowHint(true);
  };

  const revealAllSteps = () => {
    setShowAllSteps(true);
    setCurrentStep(steps.length - 1);
    completeExercise(exercise.id);
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        {lessonId && (
          <Link
            href={`/lessons/${lessonId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to lesson
          </Link>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-phase-navigational/10 border border-phase-navigational/20 text-phase-navigational px-3 py-1 text-xs font-medium">
              Code Tracing
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-phase-functional/10 border border-phase-functional/20 text-phase-functional px-3 py-1 text-xs font-medium">
                <Check className="h-3 w-3" />
                Completed
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {exercise.question}
          </h1>
          <p className="text-muted-foreground">
            Step through the code execution and observe how variables change.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Code panel */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/50">
              <h2 className="font-semibold text-sm text-foreground">Code</h2>
            </div>
            <div className="relative">
              <div className="p-4 font-mono text-sm">
                {codeLines.map((line, index) => {
                  const lineNumber = index + 1;
                  const isActive = currentStepData?.lineNumber === lineNumber;

                  return (
                    <div
                      key={index}
                      className={cn(
                        'flex items-start gap-3 py-1 px-2 -mx-2 rounded transition-colors',
                        isActive && 'bg-phase-navigational/10'
                      )}
                    >
                      <span className="w-5 text-right text-muted-foreground select-none">
                        {lineNumber}
                      </span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-phase-navigational flex-shrink-0 mt-0.5" />
                      )}
                      {!isActive && <span className="w-4" />}
                      <code className={cn(
                        'flex-1',
                        isActive ? 'text-phase-navigational font-medium' : 'text-foreground'
                      )}>
                        {line || ' '}
                      </code>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Execution trace panel */}
          <div className="space-y-4">
            {/* Step description */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center justify-between">
                <h2 className="font-semibold text-sm text-foreground">
                  Step {currentStep + 1} of {steps.length}
                </h2>
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        index === currentStep
                          ? 'bg-phase-navigational'
                          : index < currentStep
                          ? 'bg-phase-functional'
                          : 'bg-border'
                      )}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-foreground"
                  >
                    {currentStepData?.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Variables table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/50">
                <h2 className="font-semibold text-sm text-foreground">Variables</h2>
              </div>
              <div className="p-4">
                {currentStepData && Object.keys(currentStepData.variables).length > 0 ? (
                  <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                      {Object.entries(currentStepData.variables).map(([name, value]) => (
                        <motion.div
                          key={name}
                          layout
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 font-mono text-sm"
                        >
                          <span className="text-phase-navigational font-medium">{name}</span>
                          <span className="text-foreground">
                            {value === null ? 'None' : String(value)}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No variables yet</p>
                )}
              </div>
            </div>

            {/* Output */}
            {currentStepData?.output && (
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/50">
                  <h2 className="font-semibold text-sm text-foreground">Output</h2>
                </div>
                <div className="p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg bg-foreground/5 px-3 py-2 font-mono text-sm text-phase-functional"
                  >
                    {currentStepData.output}
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={goToPrevStep} 
            disabled={currentStep === 0}
            className="bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={goToNextStep}>
            {isLastStep ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Complete
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
          <Button variant="outline" onClick={showNextHint} className="bg-transparent">
            <Lightbulb className="h-4 w-4 mr-2" />
            {showHint ? 'Next Hint' : 'Show Hint'}
          </Button>
          <Button variant="outline" onClick={resetExercise} className="bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          {!showAllSteps && (
            <Button variant="outline" onClick={revealAllSteps} className="bg-transparent">
              <SkipForward className="h-4 w-4 mr-2" />
              Show All Steps
            </Button>
          )}
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg border border-phase-maintainer/30 bg-phase-maintainer/5 p-4 mt-6"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-phase-maintainer mt-0.5" />
                <div>
                  <p className="font-medium text-phase-maintainer text-sm mb-1">
                    Hint {hintIndex + 1} of {exercise.hints.length}
                  </p>
                  <p className="text-foreground">{exercise.hints[hintIndex]}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion message */}
        <AnimatePresence>
          {isLastStep && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg border border-phase-functional/30 bg-phase-functional/5 p-4 mt-6"
            >
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-phase-functional mt-0.5" />
                <div>
                  <p className="font-medium text-phase-functional text-sm mb-1">
                    Final Answer: {exercise.correctAnswer}
                  </p>
                  <p className="text-foreground">{exercise.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue link */}
        {isLastStep && lessonId && (
          <div className="flex gap-3 mt-6">
            <Button asChild>
              <Link href={`/lessons/${lessonId}`}>
                Continue Lesson
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
