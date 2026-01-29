# Code Tracers & Debuggers

This directory contains code tracing exercises for understanding program execution step-by-step.

## Production-Ready Tracers

These are ready to use with students:

1. **hybrid-tracer.html** ⭐ - JavaScript + Python tracer (RECOMMENDED)
   - Both languages in one tool
   - Pyodide for Python (sys.settrace)
   - Manual wrapper for JavaScript
   - PWA-ready, works offline

2. **timetravel-debugger.html** ⭐ - Time-travel debugging
   - Snapshot navigation
   - Step backward/forward
   - State inspection at any point
   - Unique feature, very useful

3. **exercise-generator.html** ⭐ - LLM-powered exercise generation
   - Auto-generate questions from code
   - Multiple exercise types
   - Adaptive difficulty
   - **Note:** Requires LLM API key

4. **js-tracer.html** - JavaScript-only tracer
   - Lightweight, fast
   - Manual function wrapping
   - No dependencies

5. **python-tracer.html** - Python-only tracer
   - Pyodide + sys.settrace()
   - Automatic tracing
   - Full Python support

## Experimental/Testing

These are prototypes for research:

6. **viz-comparison.html** - Compare visualization approaches
7. **animation-comparison.html** - Test animation techniques
8. **ultimate-tracer.html** ⚠️ - **DO NOT USE**
   - Trying to do too much (6 visualizations at once)
   - Overengineered, unfocused
   - LLM integration broken
   - **Recommendation:** Delete or simplify to ONE visualization

## Integration with Next.js App

The tracers are now integrated into the main app:
- `/app/tracers/page.tsx` - Landing page listing all tracers
- `/app/tracers/[tracer]/page.tsx` - Individual tracer viewer (iframe)
- Navigation link added to header

## Usage

### Standalone
Open any HTML file directly in a browser. No server needed!

### In Next.js App
Navigate to `/tracers` to see all available tracers.

## Key Concepts

These exercises demonstrate:
- **Inspectable Pipelines**: Step-by-step execution tracking
- **Manual Tracing**: JavaScript function wrapping pattern
- **Built-in Tracing**: Python's sys.settrace() for automatic instrumentation
- **PWA Capability**: All work offline after first load
- **No F12 Needed**: Custom UI replaces browser DevTools

## Core Pattern

```
Code → Trace → Visualize → Exercise → Learning
```

## Recommendations

**For Immediate Use:**
- Use `hybrid-tracer.html` for dual-language support
- Use `exercise-generator.html` for LLM-powered content
- Use `timetravel-debugger.html` for advanced debugging

**For Research:**
- Keep `viz-comparison.html` for testing approaches
- **Delete or simplify `ultimate-tracer.html`** - it's unfocused

**Deployment:**
- All tracers work as standalone HTML (deploy to any static host)
- PWA-ready (manifest.json + service-worker.js included)
- Python support via Pyodide (~10MB first load, then cached)
