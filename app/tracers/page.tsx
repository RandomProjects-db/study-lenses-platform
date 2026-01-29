import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TracersPage() {
  const tracers = [
    {
      name: 'Multi-Lens Viewer',
      description: 'View the same code through multiple learning perspectives',
      file: 'multi-lens.html',
      status: 'production',
      features: ['Study', 'Trace', 'Parsons', 'Variables', 'AST', 'Blanks']
    },
    {
      name: 'Hybrid Tracer',
      description: 'JavaScript + Python code execution tracer with full tracing support',
      file: 'hybrid-tracer.html',
      status: 'production',
      features: ['JavaScript', 'Python (Pyodide)', 'sys.settrace()', 'PWA Ready']
    },
    {
      name: 'Time-Travel Debugger',
      description: 'Step backward and forward through code execution with snapshots',
      file: 'timetravel-debugger.html',
      status: 'production',
      features: ['Snapshots', 'Time Travel', 'State Inspection', 'Replay']
    },
    {
      name: 'Exercise Generator',
      description: 'AI-powered exercise generation from any code',
      file: 'exercise-generator.html',
      status: 'production',
      features: ['LLM Integration', 'Auto Questions', 'Multiple Types', 'Adaptive']
    },
    {
      name: 'JavaScript Tracer',
      description: 'Pure JavaScript execution tracer with automatic instrumentation',
      file: 'js-tracer.html',
      status: 'production',
      features: ['Babel AST', 'Lightweight', 'Fast', 'Automatic']
    },
    {
      name: 'Python Tracer',
      description: 'Python-only tracer using Pyodide and sys.settrace()',
      file: 'python-tracer.html',
      status: 'production',
      features: ['Pyodide', 'sys.settrace()', 'Full Python', 'Automatic']
    },
    {
      name: 'Visualization Comparison',
      description: 'Compare different visualization approaches for code execution',
      file: 'viz-comparison.html',
      status: 'experimental',
      features: ['Multiple Views', 'Comparison', 'Research', 'Testing']
    },
    {
      name: 'Animation Comparison',
      description: 'Interactive animations, drag-drop, and flow-based programming',
      file: 'animation-comparison.html',
      status: 'experimental',
      features: ['Anime.js', 'GSAP', 'Flow Editor', 'Blockly']
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Code Tracers & Debuggers</h1>
          <p className="text-lg text-muted-foreground">
            Interactive tools for understanding code execution. These tracers visualize how code runs step-by-step,
            helping students understand program flow and debugging.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracers.map((tracer) => (
            <Card key={tracer.file} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{tracer.name}</CardTitle>
                  <Badge variant={tracer.status === 'production' ? 'default' : 'secondary'}>
                    {tracer.status}
                  </Badge>
                </div>
                <CardDescription>{tracer.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tracer.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link
                    href={`/tracers/${tracer.file}`}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
                  >
                    Open Tracer →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4">About These Tracers</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              These tracers allow students to see exactly how code executes, step by step.
              They use inspectable execution pipelines to make program flow visible and understandable.
            </p>
            <p>
              <strong>Production tracers</strong> are ready for use with students. 
              <strong> Experimental tracers</strong> are for research and testing new approaches.
            </p>
            <p>
              All tracers work offline after first load (PWA-capable) and require no server-side execution.
              Python support is provided via Pyodide (CPython compiled to WebAssembly).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
