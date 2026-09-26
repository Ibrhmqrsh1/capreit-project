import type { ReactNode } from "react";
import type { Source } from "../data/capreit";

export function Section({
  id,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-line px-6 py-20 md:px-12 lg:px-20 ${
        dark ? "bg-navy text-paper" : "bg-paper text-ink"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className={`mb-3 font-sans text-sm ${dark ? "text-sand/70" : "text-navy2/70"}`}>{eyebrow}</p>
        )}
        <h2 className="mb-10 font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function KPICard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="border border-line bg-white/60 px-5 py-4">
      <p className="font-sans text-xs uppercase tracking-wide text-ink/60">{label}</p>
      <p className="mt-1 font-serif text-2xl font-medium text-navy font-tabular">{value}</p>
      {sublabel && <p className="mt-1 font-sans text-xs text-ink/50">{sublabel}</p>}
    </div>
  );
}

export function SourceNote({ sources }: { sources: (Source | string)[] }) {
  return (
    <p className="mt-4 font-sans text-xs leading-relaxed text-ink/50">
      Source:{" "}
      {sources.map((s, i) => (
        <span key={i}>
          {typeof s === "string" ? (
            s
          ) : (
            <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-line hover:text-rust">
              {s.label}
            </a>
          )}
          {i < sources.length - 1 ? "; " : ""}
        </span>
      ))}
    </p>
  );
}

export function Callout({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "warn" }) {
  return (
    <div
      className={`border-l-2 py-3 pl-5 pr-4 font-sans text-sm leading-relaxed ${
        tone === "warn" ? "border-rust bg-rust/5 text-ink" : "border-navy2 bg-navy2/5 text-ink"
      }`}
    >
      {children}
    </div>
  );
}

export function DataQuestion({
  question,
  observation,
  interpretation,
  implication,
}: {
  question: string;
  observation: string;
  interpretation: string;
  implication: string;
}) {
  return (
    <div className="grid gap-4 border border-line bg-white/40 p-6 md:grid-cols-4">
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-navy2">Question</p>
        <p className="mt-1 font-sans text-sm text-ink">{question}</p>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-navy2">Observation</p>
        <p className="mt-1 font-sans text-sm text-ink">{observation}</p>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-navy2">Interpretation</p>
        <p className="mt-1 font-sans text-sm text-ink">{interpretation}</p>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-rust">CAPREIT implication</p>
        <p className="mt-1 font-sans text-sm text-ink">{implication}</p>
      </div>
    </div>
  );
}
