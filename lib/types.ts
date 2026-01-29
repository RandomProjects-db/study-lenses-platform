export type Phase = 'functional' | 'navigational' | 'maintainer' | 'builder';

export interface Exercise {
  id: string;
  type: 'parsons' | 'tracing' | 'bsi' | 'multiple-choice';
  question: string;
  code?: string;
  codeLines?: string[];
  correctAnswer: string[] | string | boolean;
  hints: string[];
  explanation: string;
  tracingSteps?: TracingStep[];
  codeExamples?: { code: string; label: string }[];
}

export interface TracingStep {
  lineNumber: number;
  description: string;
  variables: Record<string, string | number | boolean | null>;
  output?: string;
}

export interface Lesson {
  id: string;
  title: string;
  ring: number;
  phase: Phase;
  videoUrl?: string;
  content: string;
  exercises: Exercise[];
  prerequisites: string[];
}

export interface Module {
  id: string;
  title: string;
  ring: number;
  lessons: Lesson[];
}

export interface Progress {
  completedLessons: string[];
  completedExercises: string[];
  currentLesson: string;
  currentRing: number;
  currentPhase: Phase;
}

export const RING_LABELS = [
  'Markdown',
  'Basic Python',
  'Functions + Loops',
  'Lists + Dictionaries',
  'Classes + Modules',
  'APIs + Libraries',
] as const;

export const PHASE_CONFIG = {
  functional: {
    label: 'Functional',
    description: 'Can you run the program? Can you describe what it does?',
    color: 'phase-functional',
    angle: { start: 0, end: 90 },
  },
  navigational: {
    label: 'Navigational',
    description: 'Can you read the code? Can you connect code to behavior?',
    color: 'phase-navigational',
    angle: { start: 90, end: 180 },
  },
  maintainer: {
    label: 'Maintainer',
    description: 'Can you modify, debug, refactor, test the code?',
    color: 'phase-maintainer',
    angle: { start: 180, end: 270 },
  },
  builder: {
    label: 'Builder',
    description: 'Can you build it from scratch?',
    color: 'phase-builder',
    angle: { start: 270, end: 360 },
  },
} as const;
