import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { HowItWorks } from '@/components/how-it-works';
import { PhaseExplainer } from '@/components/phase-explainer';
import { SampleLessonPreview } from '@/components/sample-lesson-preview';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <PhaseExplainer />
        <SampleLessonPreview />
      </main>
      <Footer />
    </div>
  );
}
