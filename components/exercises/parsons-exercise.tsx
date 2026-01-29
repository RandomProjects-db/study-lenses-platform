'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/lib/progress-store';
import type { Exercise } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GripVertical, Check, X, Lightbulb, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SortableItemProps {
  id: string;
  code: string;
  isCorrect?: boolean | null;
  disabled?: boolean;
}

function SortableItem({ id, code, isCorrect, disabled }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-card p-3 font-mono text-sm transition-colors',
        isDragging && 'opacity-50 shadow-lg',
        isCorrect === true && 'border-phase-functional bg-phase-functional/5',
        isCorrect === false && 'border-destructive bg-destructive/5',
        isCorrect === null && 'border-border',
        disabled && 'cursor-default'
      )}
    >
      {!disabled && (
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none p-1 text-muted-foreground hover:text-foreground"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}
      <code className="flex-1 text-foreground">{code}</code>
      {isCorrect === true && <Check className="h-4 w-4 text-phase-functional" />}
      {isCorrect === false && <X className="h-4 w-4 text-destructive" />}
    </div>
  );
}

interface ParsonsExerciseProps {
  exercise: Exercise;
  lessonId?: string;
}

export function ParsonsExercise({ exercise, lessonId }: ParsonsExerciseProps) {
  const { completeExercise, isExerciseCompleted } = useProgressStore();
  const [items, setItems] = useState<string[]>([]);
  const [checkResult, setCheckResult] = useState<(boolean | null)[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const isCompleted = isExerciseCompleted(exercise.id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (exercise.codeLines) {
      const shuffled = [...exercise.codeLines].sort(() => Math.random() - 0.5);
      setItems(shuffled);
    }
  }, [exercise.codeLines]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
      setCheckResult([]);
    }
  };

  const checkAnswer = () => {
    const correctAnswer = exercise.correctAnswer as string[];
    const results = items.map((item, index) => item === correctAnswer[index]);
    setCheckResult(results);
    setAttempts((a) => a + 1);

    if (results.every((r) => r)) {
      completeExercise(exercise.id);
    }
  };

  const resetExercise = () => {
    if (exercise.codeLines) {
      const shuffled = [...exercise.codeLines].sort(() => Math.random() - 0.5);
      setItems(shuffled);
    }
    setCheckResult([]);
    setShowHint(false);
    setHintIndex(0);
    setShowAnswer(false);
  };

  const showNextHint = () => {
    if (hintIndex < exercise.hints.length - 1) {
      setHintIndex((h) => h + 1);
    }
    setShowHint(true);
  };

  const revealAnswer = () => {
    setItems(exercise.correctAnswer as string[]);
    setShowAnswer(true);
    setCheckResult((exercise.correctAnswer as string[]).map(() => true));
  };

  const allCorrect = checkResult.length > 0 && checkResult.every((r) => r);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary px-3 py-1 text-xs font-medium">
              Parsons Problem
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
            Drag and drop the code lines into the correct order.
          </p>
        </div>

        {/* Exercise area */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <SortableItem
                    key={item}
                    id={item}
                    code={item}
                    isCorrect={checkResult[index] ?? null}
                    disabled={showAnswer}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={checkAnswer} disabled={showAnswer || allCorrect}>
            <Check className="h-4 w-4 mr-2" />
            Check Answer
          </Button>
          <Button variant="outline" onClick={showNextHint} className="bg-transparent">
            <Lightbulb className="h-4 w-4 mr-2" />
            {showHint ? 'Next Hint' : 'Show Hint'}
          </Button>
          <Button variant="outline" onClick={resetExercise} className="bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          {attempts >= 3 && !allCorrect && (
            <Button variant="outline" onClick={revealAnswer} className="bg-transparent">
              Show Answer
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

        {/* Success message */}
        <AnimatePresence>
          {allCorrect && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg border border-phase-functional/30 bg-phase-functional/5 p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-phase-functional mt-0.5" />
                <div>
                  <p className="font-medium text-phase-functional text-sm mb-1">
                    {showAnswer ? 'Correct Answer Revealed' : 'Correct!'}
                  </p>
                  <p className="text-foreground">{exercise.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Try another */}
        {allCorrect && lessonId && (
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
