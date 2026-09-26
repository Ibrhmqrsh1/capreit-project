import { policyMatrix, transmissionChains, type Effect } from "../data/policy";
import { Section, Callout } from "./Shared";

function effectColor(e: Effect) {
  if (e === "Positive for CAPREIT") return "text-teal";
  if (e === "Negative for CAPREIT") return "text-rust";
  return "text-navy2";
}

export default function PolicySection() {
  return (
    <Section id="policy" eyebrow="Policy & the housing market" title="How government policy reaches CAPREIT's cash flow">
      <p className="max-w-prose font-sans text-base leading-relaxed text-ink/80">
        Each policy below is analyzed as a documented mechanism, not a partisan claim: who has the power,
        what they intended, what the evidence shows, and — the step most housing commentary skips — exactly
        which line of CAPREIT's cash flow it touches.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b border-ink/20 text-left text-ink/60">
              <th className="py-2 pr-4 font-normal">Policy</th>
              <th className="py-2 pr-4 font-normal">Level</th>
              <th className="py-2 pr-4 font-normal">Housing effect</th>
              <th className="py-2 pr-4 font-normal">CAPREIT effect</th>
              <th className="py-2 pr-4 font-normal">DCF variable</th>
              <th className="py-2 pr-4 font-normal">Direction</th>
            </tr>
          </thead>
          <tbody>
            {policyMatrix.map((p, i) => (
              <tr key={i} className="border-b border-line align-top">
                <td className="max-w-[16rem] py-3 pr-4 text-ink/80">
                  <p className="font-medium text-ink">{p.policy}</p>
                  <p className="mt-1 text-xs text-ink/50">{p.mechanism}</p>
                </td>
                <td className="py-3 pr-4 text-ink/70">{p.level}</td>
                <td className="max-w-[12rem] py-3 pr-4 text-ink/70">{p.housingEffect}</td>
                <td className="max-w-[14rem] py-3 pr-4 text-ink/70">{p.capreitEffect}</td>
                <td className="max-w-[10rem] py-3 pr-4 text-ink/70">{p.dcfVariable}</td>
                <td className={`py-3 pr-4 font-medium ${effectColor(p.direction)}`}>{p.direction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-sans text-xs text-ink/50">
        "Evidence" underlying each row is drawn from CAPREIT's own MD&amp;A disclosures, CMHC's 2025 Rental
        Market Report, and Statistics Canada population data cited throughout this site — see Methodology
        for the complete list.
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        <div className="border border-line bg-white/50 p-5">
          <p className="mb-3 font-serif text-base text-navy">Immigration policy → CAPREIT</p>
          <ol className="space-y-2 font-sans text-sm text-ink/80">
            {transmissionChains.immigration.map((step, i) => (
              <li key={i} className="border-l-2 border-navy2/40 pl-3">
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="border border-line bg-white/50 p-5">
          <p className="mb-3 font-serif text-base text-navy">Housing supply policy → CAPREIT</p>
          <ol className="space-y-2 font-sans text-sm text-ink/80">
            {transmissionChains.supply.map((step, i) => (
              <li key={i} className="border-l-2 border-navy2/40 pl-3">
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="border border-line bg-white/50 p-5">
          <p className="mb-3 font-serif text-base text-navy">Monetary policy → CAPREIT (two opposing paths)</p>
          <p className="border-l-2 border-navy2/40 pl-3 font-sans text-sm text-ink/80">{transmissionChains.monetary.root}</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <ol className="space-y-2 font-sans text-xs text-ink/70">
              {transmissionChains.monetary.branchA.map((s, i) => (
                <li key={i} className="border-l-2 border-teal/50 pl-2">
                  {s}
                </li>
              ))}
            </ol>
            <ol className="space-y-2 font-sans text-xs text-ink/70">
              {transmissionChains.monetary.branchB.map((s, i) => (
                <li key={i} className="border-l-2 border-rust/50 pl-2">
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <h3 className="font-serif text-2xl text-ink">Is a worsening housing-affordability crisis actually bad for CAPREIT?</h3>
        <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-ink/80">
          For society, higher rents and housing shortages are undesirable outcomes. For an apartment
          landlord, low vacancy and rent growth are the drivers of higher revenue and asset values. These two
          facts sit uncomfortably next to each other, and this analysis does not resolve the tension —
          it names it directly, because the DCF above is mechanically a bet on strong pricing power in a
          market that is, by most social measures, failing to build enough housing.
        </p>
        <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-ink/80">
          The limits on this dynamic are real and already visible in the data on this page: Ontario's rent
          control guideline caps how much of that pricing power CAPREIT can actually realize on existing
          tenants; political backlash has driven the very immigration cuts that are now softening CAPREIT's
          near-term rent growth; and elevated arrears/expected credit losses (which CAPREIT's own FY2025
          MD&amp;A attributes partly to "the rising cost of living") show the affordability crisis creating
          collection risk, not just pricing power, for the landlord.
        </p>
        <Callout>
          The honest reading: CAPREIT benefits from tight housing markets at the margin, but 2025–2026 shows
          that the relationship is not one-directional — political response to an affordability crisis
          (immigration cuts, rent caps) can and did reduce CAPREIT's own near-term revenue growth. Incumbent
          landlords are exposed to the politics of the crisis they partly benefit from.
        </Callout>
      </div>
    </Section>
  );
}
