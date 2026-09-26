import { Section, SourceNote, Callout } from "./Shared";
import { baseAssumptions, calculateDCF, calculateSensitivity, fmtPercent } from "../utils/dcf";
import { companySnapshot, sources } from "../data/capreit";

const waccRows = [
  { label: "Risk-free rate (10Y GoC yield)", value: "3.95%" },
  { label: "Beta (vs. TSX)", value: "0.91" },
  { label: "Equity risk premium (Canada)", value: "4.2%" },
  { label: "Cost of equity (CAPM)", value: "7.8%", bold: true },
  { label: "", value: "" },
  { label: "Pre-tax cost of debt", value: "3.3%" },
  { label: "Statutory tax rate (debt shield)", value: "26.5%" },
  { label: "After-tax cost of debt", value: "2.4%", bold: true },
  { label: "", value: "" },
  { label: "Equity weight (E/V)", value: "44.9%" },
  { label: "Debt weight (D/V)", value: "55.1%" },
  { label: "WACC (CAPM only)", value: "4.8%", bold: true },
  { label: "+ size/liquidity premium (judgment call)", value: "0.75%" },
  { label: "WACC (used in base case)", value: "5.6%", bold: true, highlight: true },
];

export default function WACCAndSensitivity() {
  const waccRange = [0.045, 0.05, 0.055, 0.06, 0.065, 0.07];
  const gRange = [0.01, 0.015, 0.02, 0.025, 0.03];
  const sensitivity = calculateSensitivity(baseAssumptions, waccRange, gRange);
  const base = calculateDCF(baseAssumptions);

  const grid: Record<string, Record<string, number>> = {};
  sensitivity.forEach((s) => {
    const wKey = fmtPercent(s.wacc, 1);
    if (!grid[wKey]) grid[wKey] = {};
    grid[wKey][fmtPercent(s.g, 1)] = s.value;
  });

  return (
    <>
      <Section id="wacc" eyebrow="Discount rate" title="WACC — built from the ground up">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <table className="w-full font-sans text-sm">
              <tbody>
                {waccRows.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-b border-line ${r.highlight ? "bg-navy text-paper" : ""}`}
                  >
                    <td className={`py-2 pr-4 ${r.bold ? "font-medium" : "text-ink/70"} ${r.highlight ? "text-paper" : ""}`}>
                      {r.label}
                    </td>
                    <td className={`py-2 text-right font-tabular ${r.bold ? "font-medium" : ""} ${r.highlight ? "text-paper" : ""}`}>
                      {r.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <SourceNote sources={[sources.boc10y, sources.damodaranERP, sources.ar2025, sources.stockanalysis]} />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <Callout>
              The pure CAPM figure (4.8%) is unusually low, driven by a low current Canadian equity risk
              premium and heavy weighting toward cheap, CMHC-insured mortgage debt. We add a 75bp discretionary
              size/liquidity premium to reflect that CAPREIT is a mid-cap, less-liquid security than the
              mega-caps implicit in a market-wide beta and ERP — this is a judgment call, not a CAPM output,
              and it is toggleable in the DCF section above.
            </Callout>
            <Callout tone="warn">
              Even at 5.6%, this WACC sits below what many practitioners would use for a REIT (commonly
              6–8%). We keep it transparent rather than picking a number to force a particular conclusion —
              use the sensitivity table to see the full range of reasonable outcomes.
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="sensitivity" eyebrow="Mandatory sensitivity check" title="WACC × terminal growth sensitivity">
        <p className="max-w-prose font-sans text-base leading-relaxed text-ink/80">
          Intrinsic value per unit, holding the base-case five-year forecast fixed and varying only the
          discount rate and terminal growth assumption. The market price (${companySnapshot.marketPrice.toFixed(2)})
          and base-case DCF value (${base.intrinsicValuePerUnit.toFixed(2)}) are highlighted.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse font-sans text-sm">
            <thead>
              <tr>
                <th className="border border-line bg-sand/40 p-2 text-left text-xs text-ink/60">
                  WACC ↓ / g →
                </th>
                {gRange.map((g) => (
                  <th key={g} className="border border-line bg-sand/40 p-2 text-right text-xs text-ink/60">
                    {fmtPercent(g, 1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-tabular">
              {waccRange.map((w) => (
                <tr key={w}>
                  <td className="border border-line bg-sand/40 p-2 text-xs text-ink/60">{fmtPercent(w, 1)}</td>
                  {gRange.map((g) => {
                    const v = grid[fmtPercent(w, 1)]?.[fmtPercent(g, 1)];
                    const isBase = Math.abs(w - base.wacc) < 0.003 && Math.abs(g - baseAssumptions.terminalGrowth) < 0.003;
                    const isNearMarket = v && Math.abs(v - companySnapshot.marketPrice) < 2;
                    return (
                      <td
                        key={g}
                        className={`border border-line p-2 text-right ${
                          isBase ? "bg-navy font-medium text-paper" : isNearMarket ? "bg-rust/10" : ""
                        }`}
                      >
                        {v && !isNaN(v) ? `$${v.toFixed(2)}` : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-sans text-xs text-ink/50">
          Dark cell = base case. Shaded cells sit within ~$2 of the current market price — i.e., the
          combinations of WACC and terminal growth under which the market's own pricing would already look
          approximately "efficient."
        </p>
      </Section>
    </>
  );
}
