// Topic: Error Handling: Setting Up Error Boundaries
// NOTE
// Always be client component, get error object itself
// In each sub page, it can have their own boundaries
// IMPT Error boundaries works for all error and exceptions that happen anywhere in the app, but only in rendering!
// Any errors that will happen in callback functions will actually not be caught by a React error boundary
// This error boundary might not cause error that might happen in the root layout (layout.js).
// If we want to catch error in the root layout, you need to create file named global-error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
