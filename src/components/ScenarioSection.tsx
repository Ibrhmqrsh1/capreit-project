import { useState } from "react";
import { Section, KPICard, Callout } from "./Shared";
import { calculateScenario, fmtPercent, bearAssumptions, baseAssumptions, bullAssumptions } from "../utils/dcf";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const scenarios = [
  {
    key: "bear" as const,
    label: "Scenario C — Slower growth, more supply",
    description: "Lower population growth, higher completions, higher vacancy, weaker rent growth.",
    assumptions: bearAssumptions,
  },
  {
    key: "base" as const,
    label: "Scenario B — Balanced market",
    description: "Moderate population growth, moderate construction, normalizing vacancy.",
    assumptions: baseAssumptions,
  },
  {
    key: "bull" as const,
    label: "Scenario A — High demand, constrained supply",
    description: "Stronger population growth, slow construction, low vacancy, strong rent growth.",
    assumptions: bullAssumptions,
  },
];

export default function ScenarioSection() {
  const [active, setActive] = useState<"bear" | "base" | "bull">("base");
  const results = scenarios.map((s) => ({ ...s, result: calculateScenario(s.key) }));
  const chartData = results.map((r) => ({
    name: r.key === "bear" ? "C · Slower growth" : r.key === "base" ? "B · Balanced" : "A · High demand",
    "Intrinsic value / unit": Number(r.result.intrinsicValuePerUnit.toFixed(2)),
    key: r.key,
  }));
  const activeResult = results.find((r) => r.key === active)!;

  return (
    <Section id="scenarios" eyebrow="Scenario analysis" title="Three housing-market scenarios">
      <p className="max-w-prose font-sans text-base leading-relaxed text-ink/80">
        These are not political labels — they're combinations of revenue growth and NOI-margin assumptions
        consistent with different population-growth and supply outcomes described in the Housing and
        Immigration sections above.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {results.map((r) => (
          <button
            key={r.key}
            onClick={() => setActive(r.key)}
            className={`border p-4 text-left transition-colors ${
              active === r.key ? "border-navy bg-navy text-paper" : "border-line bg-white/50 text-ink hover:border-navy2"
            }`}
          >
            <p className="font-sans text-xs uppercase tracking-wide opacity-70">{r.label.split("—")[0]}</p>
            <p className="mt-1 font-serif text-lg">{r.label.split("—")[1]}</p>
            <p className={`mt-2 font-sans text-xs ${active === r.key ? "text-sand/70" : "text-ink/60"}`}>{r.description}</p>
            <p className="mt-3 font-tabular text-2xl">${r.result.intrinsicValuePerUnit.toFixed(2)}</p>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#D8D2C2" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={45} />
              <Tooltip formatter={(v: unknown) => `$${Number(v).toFixed(2)}`} contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2" }} />
              <Bar dataKey="Intrinsic value / unit">
                {chartData.map((d) => (
                  <Cell key={d.key} fill={d.key === active ? "#16233E" : "#D8D2C2"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 self-start lg:grid-cols-1">
          <KPICard label="Revenue growth (p.a.)" value={fmtPercent(activeResult.assumptions.revenueGrowth, 2)} />
          <KPICard label="NOI margin by 2030" value={fmtPercent(activeResult.assumptions.noiMarginEnd, 1)} />
          <KPICard label="Intrinsic value / unit" value={`$${activeResult.result.intrinsicValuePerUnit.toFixed(2)}`} />
          <KPICard
            label="Upside / downside"
            value={`${activeResult.result.upsideDownside >= 0 ? "+" : ""}${fmtPercent(activeResult.result.upsideDownside)}`}
          />
        </div>
      </div>

      <div className="mt-10">
        <Callout>
          Even the bull case (+5% revenue growth, expanding margins) only takes intrinsic value to $
          {results.find((r) => r.key === "bull")!.result.intrinsicValuePerUnit.toFixed(2)} — while the WACC
          assumption alone (see Sensitivity table) can move the answer by 3–4x that amount. Discount-rate
          uncertainty dominates operating-assumption uncertainty in this particular valuation.
        </Callout>
      </div>
    </Section>
  );
}
