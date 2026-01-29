import React from "react"
import { Header } from '@/components/header';
import { LessonSidebar } from '@/components/lesson-sidebar';

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <LessonSidebar />
        <main className="flex-1 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
