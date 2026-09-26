import { Section, SourceNote, DataQuestion, Callout } from "./Shared";
import {
  populationGrowthRate,
  nonPermanentResidents,
  immigrationLevelsPlan,
  immigrationPolicyGoals,
  immigrationSources,
} from "../data/immigration";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

export default function ImmigrationSection() {
  const growthData = populationGrowthRate.map((p) => ({
    period: p.period,
    "Canada growth (%)": p.canadaGrowth * 100,
    "Ontario growth (%)": p.ontarioGrowth ? p.ontarioGrowth * 100 : null,
  }));

  const levelsData = immigrationLevelsPlan.map((l) => ({
    year: l.year,
    "Permanent residents": l.permanentResidentTarget,
    "Temporary residents": l.temporaryResidentTarget,
  }));

  return (
    <Section id="immigration" eyebrow="Demographics" title="Immigration, population &amp; the rental market">
      <p className="max-w-prose font-sans text-base leading-relaxed text-ink/80">
        "Immigration" is not one number. This section separates permanent residents, temporary residents
        (workers and students), and net migration, because Canada's 2026–2028 policy shift treats them very
        differently — and because CAPREIT's rental demand is more sensitive to temporary-resident flows in
        the near term than to permanent immigration targets.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-sans text-xs uppercase tracking-wide text-navy2">Canada &amp; Ontario population growth rate</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#D8D2C2" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={40} unit="%" />
                <Tooltip contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2" }} />
                <Line type="monotone" dataKey="Canada growth (%)" stroke="#16233E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Ontario growth (%)" stroke="#A24936" strokeWidth={2} dot={{ r: 3 }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 font-sans text-xs text-ink/50">
            July-to-July annual growth. Canada peaked at 2.8% in 2023/24 and slowed to 0.5% by 2025/26 — one
            of the fastest deceleration in population growth on record outside a pandemic.
          </p>
          <SourceNote sources={[immigrationSources.statcan2026]} />
        </div>

        <div>
          <p className="mb-2 font-sans text-xs uppercase tracking-wide text-navy2">IRCC admission targets, 2026–2028</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelsData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#D8D2C2" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2" }} />
                <Legend wrapperStyle={{ fontFamily: "IBM Plex Sans", fontSize: 11 }} />
                <Bar dataKey="Permanent residents" fill="#16233E" />
                <Bar dataKey="Temporary residents" fill="#A24936" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 font-sans text-xs text-ink/50">
            Temporary-resident targets cut from 673,650 (2025) to 385,000 (2026) — a 43% reduction. Permanent
            residents held flat at 380,000/yr through 2028.
          </p>
          <SourceNote sources={[immigrationSources.irccLevels]} />
        </div>
      </div>

      <div className="mt-12">
        <DataQuestion
          question="Did the Toronto region's population growth actually slow as sharply as the immigration policy shift implies?"
          observation={`Toronto CMA population growth went from a record +269,143 people (+3.9%) in 2023/24 to essentially flat, -992 people (-0.0%), in 2024/25 — driven by a net non-permanent-resident change of -44,792 and net emigration of -17,159, only partly offset by births (+63,778) and immigrant arrivals (+115,348).`}
          interpretation="This is one of the sharpest one-year demographic reversals in a major Canadian city on record, and it lines up in time with the federal government's 2024–2026 temporary-resident and study-permit cuts."
          implication="CAPREIT's GTA portfolio (35% of its total suites) sits in the single market where this demand-side reversal has been most extreme — a direct, dated, and quantified link between federal policy and the demand side of CAPREIT's largest submarket."
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="border border-line bg-white/50 p-6">
          <p className="font-sans text-xs uppercase tracking-wide text-navy2">Non-permanent residents in Canada</p>
          <table className="mt-3 w-full font-sans text-sm">
            <tbody>
              {nonPermanentResidents.map((n) => (
                <tr key={n.date} className="border-b border-line">
                  <td className="py-2 text-ink/70">{n.date}</td>
                  <td className="py-2 text-right font-tabular">{n.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 font-sans text-xs text-ink/50">
            The 2024 increase (+291,165) was roughly a third the size of 2023's increase (+820,766) — the
            slowdown was already well underway before the 2026-2028 Levels Plan formalized it.
          </p>
        </div>
        <div className="border border-line bg-white/50 p-6">
          <p className="font-sans text-xs uppercase tracking-wide text-navy2">2026-2028 policy goals (IRCC)</p>
          <ul className="mt-3 space-y-2 font-sans text-sm text-ink/80">
            <li>{immigrationPolicyGoals.nprShareTarget}</li>
            <li>{immigrationPolicyGoals.studentPermitCut}</li>
            <li>{immigrationPolicyGoals.workerPermitCut}</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <Callout tone="warn">
          <strong className="font-medium">Correlation ≠ causation.</strong> The Toronto CMA slowdown and the
          rise in rental vacancy happened at the same time as the immigration policy shift, and CMHC's own
          report draws the same connection — but home prices and rents are also affected by interest rates,
          construction costs, household income, and investor demand. This analysis treats the immigration
          link as a well-evidenced contributing factor, not the sole explanation, and does not run a
          formal regression given the short post-policy-shift sample currently available (roughly 4-6
          quarters) — a proper regression should wait for more observations after the 2026 policy takes full
          effect.
        </Callout>
      </div>
    </Section>
  );
}
