import { Section, Callout } from "./Shared";
import { calculateDCF, baseAssumptions, fmtPercent } from "../utils/dcf";
import { companySnapshot } from "../data/capreit";

const changeCards = [
  {
    title: "Population growth",
    trend: "Slowing sharply (Toronto CMA growth ~0% in 2024/25 vs. +3.9% a year earlier)",
    impact: "Fewer new renters; softer occupancy and turnover pricing power in the GTA specifically",
    variable: "Revenue growth",
  },
  {
    title: "Rent control policy",
    trend: "Ontario guideline capped at 2.1% for 2026, below CPI",
    impact: "Deterministic ceiling on renewal-driven revenue growth for pre-2018 Ontario units",
    variable: "Same-property revenue growth",
  },
  {
    title: "Rental construction",
    trend: "Record national rental starts in 2025 (2nd consecutive record year)",
    impact: "More competing supply over the medium term, pressuring vacancy and pricing power",
    variable: "NOI margin / rent growth",
  },
  {
    title: "Interest rates",
    trend: "BoC held at 2.25% through Sept 2026; 10Y GoC yield near 3.95% and rising on inflation risk",
    impact: "Higher financing costs and a higher discount rate — but also more support for rental demand",
    variable: "WACC (direct) and revenue growth (indirect, opposing sign)",
  },
  {
    title: "Discount-rate judgment call",
    trend: "CAPM-only WACC (4.8%) vs. WACC with a size/liquidity premium (5.6%)",
    impact: "Flips the conclusion from ~+47% upside to ~-11% downside — this single assumption matters more than any operating assumption tested",
    variable: "WACC",
  },
  {
    title: "European wind-down execution",
    trend: "ERES privatization completed May 2026; remaining Dutch portfolio still being sold",
    impact: "Removes a shrinking, non-core cash-flow stream and associated tax complexity, but disposal proceeds and timing carry execution risk",
    variable: "Net debt / cash used in the bridge to equity value",
  },
];

export default function ConclusionSection() {
  const base = calculateDCF(baseAssumptions);
  return (
    <>
      <Section id="conclusion" eyebrow="Findings" title="What would change this valuation?">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {changeCards.map((c) => (
            <div key={c.title} className="border border-line bg-white/50 p-5">
              <p className="font-serif text-lg text-navy">{c.title}</p>
              <p className="mt-2 font-sans text-xs text-ink/50">Current trend</p>
              <p className="font-sans text-sm text-ink/80">{c.trend}</p>
              <p className="mt-2 font-sans text-xs text-ink/50">CAPREIT impact</p>
              <p className="font-sans text-sm text-ink/80">{c.impact}</p>
              <p className="mt-2 font-sans text-xs text-rust">DCF variable</p>
              <p className="font-sans text-sm text-ink/80">{c.variable}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="conclusion-2" eyebrow="Conclusion" title="Conclusion &amp; investment framing" dark>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 font-sans text-base leading-relaxed text-paper/90">
            <p>
              The base-case DCF produces an intrinsic value of ${base.intrinsicValuePerUnit.toFixed(2)} per
              unit against a market price of ${companySnapshot.marketPrice.toFixed(2)}, implying{" "}
              {base.upsideDownside >= 0 ? "potential upside" : "potential overvaluation"} of{" "}
              {fmtPercent(Math.abs(base.upsideDownside))}. That result is highly sensitive to the WACC
              assumption specifically: a pure-CAPM discount rate (4.8%) implies meaningful undervaluation
              (~+47%), while adding a modest, defensible size/liquidity premium (WACC 5.6%) flips the sign to
              modest overvaluation (~-11%).
            </p>
            <p>
              CAPREIT's own reported NAV per unit ($56.41) and the 14-analyst consensus target ($40.99) both
              sit above the market price, which is directionally consistent with — though numerically larger
              than — this DCF's base case. That triangulation is the most defensible single conclusion this
              analysis supports: CAR.UN is not obviously overvalued on any of the three independent
              benchmarks, but the DCF's own point estimate should not be treated as more precise than it is.
            </p>
            <p>
              Population growth and immigration policy matter most through their effect on same-property
              rent growth and occupancy in Ontario specifically, not through a generic "Canada" channel — the
              Toronto CMA data makes that channel unusually concrete and dated. Housing supply growth (record
              2025 rental starts) is the main countervailing force. Of the government policies examined, the
              2026-2028 Immigration Levels Plan and Ontario's rent-control guideline are the two with the
              most direct, quantifiable link to CAPREIT's revenue line; the Bank of Canada's rate path is the
              most consequential but also the most ambiguous, since it affects both the numerator (rental
              demand) and the denominator (WACC) of the valuation in opposite directions.
            </p>
          </div>
          <div className="space-y-4">
            <Callout>
              <span className="text-ink">This is not an investment recommendation.</span> A second-year
              corporate finance project cannot and should not substitute for professional financial advice.
              The purpose of this DCF is to demonstrate the mechanics linking public policy to a specific
              company's cash flows and valuation — not to call a trade.
            </Callout>
            <div className="border border-line bg-white p-5">
              <p className="font-sans text-xs uppercase tracking-wide text-navy2">What could invalidate this valuation</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 font-sans text-sm text-ink/80">
                <li>A reversal of the 2026-2028 immigration cuts (would raise the base case)</li>
                <li>Further Ontario/Ontario-municipal rent regulation tightening (would lower it)</li>
                <li>A Bank of Canada hike in response to tariff/energy inflation (raises WACC, ambiguous net effect)</li>
                <li>Execution risk or delay in the remaining European asset disposals</li>
                <li>Any revision to the FY2023 figures still flagged for verification in Methodology</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
