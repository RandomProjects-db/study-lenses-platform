import { notFound } from 'next/navigation';
import { ParsonsExercise } from '@/components/exercises/parsons-exercise';
import { sampleLessons } from '@/lib/sample-data';
import { Header } from '@/components/header';

interface ParsonsExercisePageProps {
  params: Promise<{
    exerciseId: string;
  }>;
}

function findExercise(exerciseId: string) {
  for (const lesson of sampleLessons) {
    const exercise = lesson.exercises.find(
      (ex) => ex.id === exerciseId && ex.type === 'parsons'
    );
    if (exercise) {
      return { exercise, lessonId: lesson.id };
    }
  }
  return null;
}

export async function generateStaticParams() {
  const exercises: { exerciseId: string }[] = [];
  for (const lesson of sampleLessons) {
    for (const exercise of lesson.exercises) {
      if (exercise.type === 'parsons') {
        exercises.push({ exerciseId: exercise.id });
      }
    }
  }
  return exercises;
}

export default async function ParsonsExercisePage({ params }: ParsonsExercisePageProps) {
  const { exerciseId } = await params;
  const result = findExercise(exerciseId);

  if (!result) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ParsonsExercise exercise={result.exercise} lessonId={result.lessonId} />
      </main>
    </div>
  );
}
