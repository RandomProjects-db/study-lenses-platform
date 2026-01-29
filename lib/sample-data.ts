import type { Lesson, Module } from './types';

export const sampleLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'What is a Python Program?',
    ring: 1,
    phase: 'functional',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
# What is a Python Program?

When you write Python code, you're giving instructions to the computer. Let's understand what happens when you **run** a program.

## What Happens When You Run Code?

1. Python reads your code from top to bottom
2. It executes each instruction one at a time
3. It produces output (or sometimes errors!)

## Your First Program

The simplest Python program prints text to the screen:

\`\`\`python
print("Hello, World!")
\`\`\`

When this runs, Python displays: \`Hello, World!\`

## Understanding Error Messages

Sometimes your code won't run. That's okay! Python gives you helpful error messages:

\`\`\`python
print("Hello, World!)  # Missing closing quote!
\`\`\`

This produces a **SyntaxError** - Python couldn't understand your code.

## Key Takeaways

- Programs run from top to bottom
- \`print()\` displays text on screen
- Error messages help you fix problems
    `,
    exercises: [
      {
        id: 'ex-1-1',
        type: 'parsons',
        question: 'Order these lines to create a program that prints "Hello, World!"',
        codeLines: [
          'print("Hello, World!")',
        ],
        correctAnswer: ['print("Hello, World!")'],
        hints: [
          'This program only needs one line',
          'Use the print() function to display text',
        ],
        explanation: 'The print() function displays text to the screen. We pass the text we want to display as a string inside the parentheses.',
      },
      {
        id: 'ex-1-2',
        type: 'parsons',
        question: 'Order these lines to greet the user by name:',
        codeLines: [
          'name = input("What is your name? ")',
          'print("Hello, " + name + "!")',
        ],
        correctAnswer: [
          'name = input("What is your name? ")',
          'print("Hello, " + name + "!")',
        ],
        hints: [
          'First, we need to get the user\'s name',
          'Then we can greet them using that name',
        ],
        explanation: 'We first use input() to get the name and store it in a variable. Then we use print() with string concatenation to display a greeting.',
      },
    ],
    prerequisites: [],
  },
  {
    id: 'lesson-2',
    title: 'Reading Variable Assignments',
    ring: 1,
    phase: 'navigational',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
# Reading Variable Assignments

Variables are like labeled boxes that store values. Let's learn to **read** and **trace** what happens when we use them.

## How to Read \`x = 5\`

When you see code like this:

\`\`\`python
x = 5
\`\`\`

Read it as: "The variable **x** now holds the value **5**"

The \`=\` sign doesn't mean "equals" here - it means "assign" or "store."

## Tracing Variable Changes

Watch how values change as the code runs:

\`\`\`python
count = 0        # count is now 0
count = count + 1  # count is now 1
count = count + 1  # count is now 2
\`\`\`

Each line updates the value stored in \`count\`.

## Connecting Code to Output

\`\`\`python
name = "Alice"
age = 25
print(name)    # Outputs: Alice
print(age)     # Outputs: 25
\`\`\`

When you see \`print(variable)\`, the current value of that variable is displayed.

## Practice Reading Code

Before running code, try to **predict** what it will output. This builds your code comprehension skills!
    `,
    exercises: [
      {
        id: 'ex-2-1',
        type: 'tracing',
        question: 'Trace through this code and predict the final output:',
        code: `x = 10
y = 3
x = x + y
print(x)`,
        tracingSteps: [
          { lineNumber: 1, description: 'Assign 10 to x', variables: { x: 10 } },
          { lineNumber: 2, description: 'Assign 3 to y', variables: { x: 10, y: 3 } },
          { lineNumber: 3, description: 'Add x + y (10 + 3), assign result to x', variables: { x: 13, y: 3 } },
          { lineNumber: 4, description: 'Print the value of x', variables: { x: 13, y: 3 }, output: '13' },
        ],
        correctAnswer: '13',
        hints: [
          'Start by writing down what x and y are after lines 1 and 2',
          'On line 3, x + y means "current value of x" plus "current value of y"',
        ],
        explanation: 'x starts at 10, y is 3. When we compute x + y, we get 13, which becomes the new value of x.',
      },
      {
        id: 'ex-2-2',
        type: 'tracing',
        question: 'Trace through this code step by step:',
        code: `a = 5
b = a
a = 10
print(b)`,
        tracingSteps: [
          { lineNumber: 1, description: 'Assign 5 to a', variables: { a: 5 } },
          { lineNumber: 2, description: 'Assign the current value of a (5) to b', variables: { a: 5, b: 5 } },
          { lineNumber: 3, description: 'Assign 10 to a (b stays unchanged!)', variables: { a: 10, b: 5 } },
          { lineNumber: 4, description: 'Print the value of b', variables: { a: 10, b: 5 }, output: '5' },
        ],
        correctAnswer: '5',
        hints: [
          'When b = a runs, b gets the VALUE that a had at that moment',
          'Changing a later does not affect b',
        ],
        explanation: 'When b = a runs, b gets the value 5 (what a held at that moment). Later changing a to 10 does not affect b.',
      },
    ],
    prerequisites: ['lesson-1'],
  },
  {
    id: 'lesson-3',
    title: 'Debugging Print Statements',
    ring: 1,
    phase: 'maintainer',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
# Debugging with Print Statements

When code doesn't work as expected, we need to **investigate**. Print statements are your detective toolkit!

## Why Use Print Debugging?

You can't see what's happening inside your program - unless you add prints to show you:

\`\`\`python
result = calculate_something(data)
print("Result is:", result)  # Now we can see what we got!
\`\`\`

## Strategic Print Placement

Add prints at key points:

1. **Before** important operations - to see inputs
2. **After** important operations - to see outputs
3. **Inside loops** - to see each iteration

## Example: Finding a Bug

This code should double a number, but it doesn't work:

\`\`\`python
def double(n):
    n + n  # BUG: forgot to return!
    
result = double(5)
print(result)  # Outputs: None (not 10!)
\`\`\`

Adding a print inside the function reveals the issue:

\`\`\`python
def double(n):
    print("n + n =", n + n)  # We CAN calculate it...
    n + n  # ...but we never RETURN it!
\`\`\`

## Key Insight

Print debugging helps you see the **actual** values versus what you **expected**.
    `,
    exercises: [
      {
        id: 'ex-3-1',
        type: 'bsi',
        question: 'Compare these two code examples. Do they have the same behavior, strategy, or implementation?',
        codeExamples: [
          {
            label: 'Code A',
            code: `for i in range(len(numbers)):
    total += numbers[i]`,
          },
          {
            label: 'Code B',
            code: `for num in numbers:
    total += num`,
          },
        ],
        correctAnswer: 'behavior',
        hints: [
          'Think about what each code produces as output',
          'Consider: do they use the same approach?',
        ],
        explanation: 'Both code examples sum all numbers in the list (same BEHAVIOR). However, Code A uses index-based iteration while Code B uses direct iteration (different STRATEGY and IMPLEMENTATION).',
      },
      {
        id: 'ex-3-2',
        type: 'bsi',
        question: 'Compare these two ways to check if a number is even:',
        codeExamples: [
          {
            label: 'Code A',
            code: `if n % 2 == 0:
    print("even")`,
          },
          {
            label: 'Code B',
            code: `if n % 2 == 0:
    print("even")`,
          },
        ],
        correctAnswer: 'implementation',
        hints: [
          'Look very carefully at both code examples',
          'Are there ANY differences at all?',
        ],
        explanation: 'These two code examples are completely identical - same behavior, same strategy, AND same implementation. They are the exact same code.',
      },
    ],
    prerequisites: ['lesson-2'],
  },
];

export const sampleModules: Module[] = [
  {
    id: 'module-1',
    title: 'Getting Started with Python',
    ring: 1,
    lessons: sampleLessons,
  },
];

export const defaultProgress = {
  completedLessons: [],
  completedExercises: [],
  currentLesson: 'lesson-1',
  currentRing: 1,
  currentPhase: 'functional' as const,
};
