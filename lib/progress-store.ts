'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Phase, Progress } from './types';
import { defaultProgress } from './sample-data';

interface ProgressStore extends Progress {
  completeLesson: (lessonId: string) => void;
  completeExercise: (exerciseId: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  setCurrentPosition: (ring: number, phase: Phase) => void;
  resetProgress: () => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isExerciseCompleted: (exerciseId: string) => boolean;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...defaultProgress,

      completeLesson: (lessonId: string) => {
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        }));
      },

      completeExercise: (exerciseId: string) => {
        set((state) => ({
          completedExercises: state.completedExercises.includes(exerciseId)
            ? state.completedExercises
            : [...state.completedExercises, exerciseId],
        }));
      },

      setCurrentLesson: (lessonId: string) => {
        set({ currentLesson: lessonId });
      },

      setCurrentPosition: (ring: number, phase: Phase) => {
        set({ currentRing: ring, currentPhase: phase });
      },

      resetProgress: () => {
        set(defaultProgress);
      },

      isLessonCompleted: (lessonId: string) => {
        return get().completedLessons.includes(lessonId);
      },

      isExerciseCompleted: (exerciseId: string) => {
        return get().completedExercises.includes(exerciseId);
      },
    }),
    {
      name: 'study-lenses-progress',
    }
  )
);
