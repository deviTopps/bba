"use client";

export default function InsightError({ reset }: { reset: () => void }) {
  return <main id="main-content" className="container-advisory" style={{ paddingBlock: "9rem" }}>
    <h1>Insights are temporarily unavailable</h1>
    <p>Please try again shortly.</p>
    <button onClick={reset} className="btn-pill btn-pill-gold">Try again</button>
  </main>;
}
