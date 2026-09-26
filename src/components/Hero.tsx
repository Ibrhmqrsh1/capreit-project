import { calculateDCF, baseAssumptions, fmtPercent } from "../utils/dcf";
import { companySnapshot } from "../data/capreit";

export default function Hero() {
  const result = calculateDCF(baseAssumptions);
  const upside = result.upsideDownside;

  return (
    <header id="top" className="border-b border-line bg-paper px-6 pb-16 pt-14 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-sm text-navy2">A financial &amp; housing-policy investigation</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.1] text-ink md:text-6xl">
          CAPREIT — housing, policy &amp; valuation
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic leading-snug text-ink/80 md:text-2xl">
          What is Canada's largest publicly traded apartment landlord actually worth?
        </p>
        <p className="mt-6 max-w-prose font-sans text-base leading-relaxed text-ink/70">
          A discounted cash flow and data-driven investigation into how housing shortages, immigration
          policy, and interest rates shape the value of Canada's largest apartment REIT — and an honest
          look at how sensitive that answer is to the assumptions behind it.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          <div className="bg-paper px-6 py-6">
            <p className="font-sans text-xs uppercase tracking-wide text-ink/50">Market price</p>
            <p className="mt-2 font-serif text-4xl text-ink font-tabular">${companySnapshot.marketPrice.toFixed(2)}</p>
            <p className="mt-1 font-sans text-xs text-ink/50">TSX: CAR.UN, {companySnapshot.valuationDate}</p>
          </div>
          <div className="bg-navy px-6 py-6 text-paper">
            <p className="font-sans text-xs uppercase tracking-wide text-sand/70">Base-case DCF value</p>
            <p className="mt-2 font-serif text-4xl font-tabular">${result.intrinsicValuePerUnit.toFixed(2)}</p>
            <p className="mt-1 font-sans text-xs text-sand/60">WACC {fmtPercent(result.wacc)}, terminal growth 2.0%</p>
          </div>
          <div className="bg-paper px-6 py-6">
            <p className="font-sans text-xs uppercase tracking-wide text-ink/50">Implied upside / downside</p>
            <p className={`mt-2 font-serif text-4xl font-tabular ${upside >= 0 ? "text-teal" : "text-rust"}`}>
              {upside >= 0 ? "+" : ""}
              {fmtPercent(upside)}
            </p>
            <p className="mt-1 font-sans text-xs text-ink/50">Base case — see Scenarios for the full range</p>
          </div>
        </div>

        <p className="mt-4 font-sans text-xs text-ink/40">
          Data updated: {companySnapshot.valuationDate}. This is a course project, not investment advice — see
          Methodology for the full assumption set and its limits.
        </p>

        <a
          href="#dcf"
          className="mt-10 inline-block border-b border-navy pb-0.5 font-sans text-sm text-navy hover:border-rust hover:text-rust"
        >
          Explore the valuation ↓
        </a>
      </div>
    </header>
  );
}
