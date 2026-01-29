import { notFound } from 'next/navigation';
import { LessonContent } from '@/components/lesson-content';
import { sampleLessons } from '@/lib/sample-data';

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export async function generateStaticParams() {
  return sampleLessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = sampleLessons.find((l) => l.id === lessonId);

  if (!lesson) {
    notFound();
  }

  return <LessonContent lesson={lesson} />;
}
