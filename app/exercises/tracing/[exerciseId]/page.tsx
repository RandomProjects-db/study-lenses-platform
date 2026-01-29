import { notFound } from 'next/navigation';
import { TracingExercise } from '@/components/exercises/tracing-exercise';
import { sampleLessons } from '@/lib/sample-data';
import { Header } from '@/components/header';

interface TracingExercisePageProps {
  params: Promise<{
    exerciseId: string;
  }>;
}

function findExercise(exerciseId: string) {
  for (const lesson of sampleLessons) {
    const exercise = lesson.exercises.find(
      (ex) => ex.id === exerciseId && ex.type === 'tracing'
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
      if (exercise.type === 'tracing') {
        exercises.push({ exerciseId: exercise.id });
      }
    }
  }
  return exercises;
}

export default async function TracingExercisePage({ params }: TracingExercisePageProps) {
  const { exerciseId } = await params;
  const result = findExercise(exerciseId);

  if (!result) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TracingExercise exercise={result.exercise} lessonId={result.lessonId} />
      </main>
    </div>
  );
}
