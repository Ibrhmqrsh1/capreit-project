import { Section, SourceNote, DataQuestion, Callout } from "./Shared";
import {
  rentalMarket,
  cmhcKeyFinding,
  housingStartsNational,
  housingStartsNote,
  rates,
  ontarioRentGuideline,
  nationalHomePrices2026,
  housingSources,
} from "../data/housing";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HousingSection() {
  const startsData = housingStartsNational.map((h) => ({ year: h.year, "Housing starts": h.starts }));
  const guidelineData = ontarioRentGuideline.map((g) => ({ year: g.year, "Rent guideline (%)": g.guideline * 100 }));

  return (
    <Section id="housing" eyebrow="Housing market" title="Ontario housing: prices, rents, and supply">
      <p className="max-w-prose font-sans text-base leading-relaxed text-ink/80">
        CAPREIT's valuation ultimately depends on rents, occupancy, expenses, and capital requirements — all
        of which are shaped by the housing market it operates in. Ontario's market moved through very
        different regimes over the past decade: a low-rate acceleration through 2020–2022, a sharp rate-hike
        correction in 2022–2023, and a 2025–2026 period of loosening rental conditions driven by weaker
        population growth.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-sans text-xs uppercase tracking-wide text-navy2">National housing starts (all areas)</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={startsData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#D8D2C2" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2" }} />
                <Bar dataKey="Housing starts" fill="#16233E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 font-sans text-xs text-ink/50">{housingStartsNote}</p>
          <SourceNote sources={[housingSources.cmhcStarts2025]} />
        </div>

        <div>
          <p className="mb-2 font-sans text-xs uppercase tracking-wide text-navy2">Ontario rent-control guideline vs. CPI</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={guidelineData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#D8D2C2" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={40} unit="%" />
                <Tooltip contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2" }} />
                <Bar dataKey="Rent guideline (%)" fill="#A24936" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 font-sans text-xs text-ink/50">
            This is the single most direct, deterministic policy constraint on CAPREIT's Ontario revenue —
            it caps renewal rent growth on pre-2018 units regardless of market conditions.
          </p>
          <SourceNote sources={["CAPREIT FY2025 Annual Report, MD&A (discloses this guideline annually)"]} />
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <DataQuestion
          question="Has Canada's rental market kept pace with demand, or is it loosening?"
          observation={`National purpose-built rental vacancy rose from 2.2% (2024) to 3.1% (2025); the GTA rose to 3.0%; 2025 marked a second consecutive year of record rental construction (over half of all urban housing starts). National home prices were roughly flat YoY (+0.6% to $${nationalHomePrices2026.augAvgPrice.toLocaleString()} in Aug 2026) while the benchmark HPI fell 3.0%.`}
          interpretation={cmhcKeyFinding.text}
          implication="Rental markets are currently loosening, not tightening — supporting CAPREIT's own disclosed FY2025 softening (negative blended rent change, higher incentive use) rather than an unrelated or coincidental trend."
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="border border-line bg-white/50 p-6">
          <p className="font-sans text-xs uppercase tracking-wide text-navy2">Rental vacancy &amp; rent by market (2025)</p>
          <table className="mt-3 w-full font-sans text-sm">
            <thead>
              <tr className="border-b border-ink/20 text-left text-ink/50">
                <th className="py-1 font-normal">Market</th>
                <th className="py-1 text-right font-normal">Vacancy</th>
                <th className="py-1 text-right font-normal">2-bed rent</th>
              </tr>
            </thead>
            <tbody className="font-tabular">
              {rentalMarket.map((r) => (
                <tr key={r.area} className="border-b border-line">
                  <td className="py-2 text-ink/80">{r.area}</td>
                  <td className="py-2 text-right">{r.vacancy2025 ? `${(r.vacancy2025 * 100).toFixed(1)}%` : "—"}</td>
                  <td className="py-2 text-right">{r.twoBedRent2025 ? `$${r.twoBedRent2025.toLocaleString()}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <SourceNote sources={[housingSources.cmhcRentalReport]} />
        </div>

        <div className="border border-line bg-white/50 p-6">
          <p className="font-sans text-xs uppercase tracking-wide text-navy2">Interest-rate environment</p>
          <ul className="mt-3 space-y-2 font-sans text-sm text-ink/80">
            <li>Bank of Canada policy rate: <span className="font-tabular font-medium">2.25%</span> (held since Oct 2025)</li>
            <li>10-year GoC bond yield: <span className="font-tabular font-medium">3.95%</span> (Sept 24, 2026)</li>
            <li>CAPREIT weighted-avg mortgage rate: <span className="font-tabular font-medium">3.30%</span> (up from 3.11% in 2024)</li>
          </ul>
          <Callout tone="warn">
            Higher-for-longer rates cut both ways for CAPREIT: they keep homeownership less affordable
            (supporting rental demand) while simultaneously raising CAPREIT's own financing costs and the
            discount rate applied to its future cash flows. See the Policy section for the full transmission
            diagram.
          </Callout>
          <SourceNote sources={[rates.source]} />
        </div>
      </div>
    </Section>
  );
}
