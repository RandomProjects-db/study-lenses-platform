'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/lib/progress-store';
import type { Exercise } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check, X, Lightbulb, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface BSIExerciseProps {
  exercise: Exercise;
  lessonId?: string;
}

const BSI_OPTIONS = [
  {
    value: 'behavior',
    label: 'Behavior',
    description: 'Same result/output, but different approach',
  },
  {
    value: 'strategy',
    label: 'Strategy',
    description: 'Same approach, but different code details',
  },
  {
    value: 'implementation',
    label: 'Implementation',
    description: 'Exactly the same code',
  },
];

export function BSIExercise({ exercise, lessonId }: BSIExerciseProps) {
  const { completeExercise, isExerciseCompleted } = useProgressStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const isCompleted = isExerciseCompleted(exercise.id);

  const codeExamples = exercise.codeExamples || [];
  const isCorrect = selectedAnswer === exercise.correctAnswer;

  const checkAnswer = () => {
    if (selectedAnswer) {
      setIsChecked(true);
      if (isCorrect) {
        completeExercise(exercise.id);
      }
    }
  };

  const resetExercise = () => {
    setSelectedAnswer(null);
    setIsChecked(false);
    setShowHint(false);
    setHintIndex(0);
  };

  const showNextHint = () => {
    if (hintIndex < exercise.hints.length - 1) {
      setHintIndex((h) => h + 1);
    }
    setShowHint(true);
  };

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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-phase-maintainer/10 border border-phase-maintainer/20 text-phase-maintainer px-3 py-1 text-xs font-medium">
              BSI Comparison
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
            Compare the code examples and identify whether they share the same Behavior, Strategy, or Implementation.
          </p>
        </div>

        {/* Code examples */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {codeExamples.map((example, index) => (
            <div key={index} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/50">
                <h2 className="font-semibold text-sm text-foreground">{example.label}</h2>
              </div>
              <SyntaxHighlighter
                style={oneDark}
                language="python"
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                  background: 'transparent',
                }}
              >
                {example.code}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>

        {/* BSI explanation cards */}
        <div className="rounded-xl border border-border bg-card p-4 mb-6">
          <h3 className="font-semibold text-sm text-foreground mb-4">
            What do these terms mean?
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium text-sm text-foreground mb-1">Behavior</p>
              <p className="text-xs text-muted-foreground">
                What the code does - its observable output or effect
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium text-sm text-foreground mb-1">Strategy</p>
              <p className="text-xs text-muted-foreground">
                The approach or algorithm used to achieve the behavior
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium text-sm text-foreground mb-1">Implementation</p>
              <p className="text-xs text-muted-foreground">
                The exact code syntax and structure used
              </p>
            </div>
          </div>
        </div>

        {/* Answer options */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">
            These two code examples have the same:
          </h3>
          <div className="space-y-3">
            {BSI_OPTIONS.map((option) => {
              const isSelected = selectedAnswer === option.value;
              const showResult = isChecked && isSelected;
              const isOptionCorrect = option.value === exercise.correctAnswer;

              return (
                <button
                  key={option.value}
                  onClick={() => !isChecked && setSelectedAnswer(option.value)}
                  disabled={isChecked}
                  className={cn(
                    'w-full flex items-center gap-4 rounded-lg border p-4 text-left transition-colors',
                    isSelected && !isChecked && 'border-primary bg-primary/5',
                    !isSelected && !isChecked && 'border-border hover:border-primary/50 hover:bg-muted/50',
                    showResult && isCorrect && 'border-phase-functional bg-phase-functional/5',
                    showResult && !isCorrect && 'border-destructive bg-destructive/5',
                    isChecked && isOptionCorrect && !isSelected && 'border-phase-functional/50 bg-phase-functional/5',
                    isChecked && 'cursor-default'
                  )}
                >
                  <div className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border-2 flex-shrink-0',
                    isSelected ? 'border-primary' : 'border-muted-foreground/30',
                    showResult && isCorrect && 'border-phase-functional',
                    showResult && !isCorrect && 'border-destructive'
                  )}>
                    {isSelected && !isChecked && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                    {showResult && isCorrect && (
                      <Check className="h-3 w-3 text-phase-functional" />
                    )}
                    {showResult && !isCorrect && (
                      <X className="h-3 w-3 text-destructive" />
                    )}
                    {isChecked && isOptionCorrect && !isSelected && (
                      <Check className="h-3 w-3 text-phase-functional" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            onClick={checkAnswer} 
            disabled={!selectedAnswer || isChecked}
          >
            <Check className="h-4 w-4 mr-2" />
            Submit Answer
          </Button>
          <Button variant="outline" onClick={showNextHint} className="bg-transparent">
            <Lightbulb className="h-4 w-4 mr-2" />
            {showHint ? 'Next Hint' : 'Show Hint'}
          </Button>
          <Button variant="outline" onClick={resetExercise} className="bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg border border-phase-maintainer/30 bg-phase-maintainer/5 p-4 mb-6"
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

        {/* Result feedback */}
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                'rounded-lg border p-4 mb-6',
                isCorrect 
                  ? 'border-phase-functional/30 bg-phase-functional/5' 
                  : 'border-destructive/30 bg-destructive/5'
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Check className="h-5 w-5 text-phase-functional mt-0.5" />
                ) : (
                  <X className="h-5 w-5 text-destructive mt-0.5" />
                )}
                <div>
                  <p className={cn(
                    'font-medium text-sm mb-1',
                    isCorrect ? 'text-phase-functional' : 'text-destructive'
                  )}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </p>
                  <p className="text-foreground">{exercise.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue link */}
        {isChecked && isCorrect && lessonId && (
          <div className="flex gap-3">
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
