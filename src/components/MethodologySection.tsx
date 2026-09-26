import { Section } from "./Shared";
import { sources } from "../data/capreit";
import { housingSources } from "../data/housing";
import { immigrationSources } from "../data/immigration";

const formulas = [
  { name: "FCFF", formula: "FCFF = EBIT × (1 − tax rate) + D&A − CapEx − ΔNWC" },
  { name: "Cost of equity (CAPM)", formula: "Re = Rf + β × ERP" },
  { name: "WACC", formula: "WACC = (E/V × Re) + (D/V × Rd × (1 − T)) [+ discretionary premium]" },
  { name: "Terminal value (Gordon Growth)", formula: "TV = FCF(n+1) / (WACC − g)" },
  { name: "Enterprise → equity value", formula: "Equity Value = PV(FCFF) + PV(TV) − Net Debt" },
  { name: "Intrinsic value per unit", formula: "Equity Value ÷ diluted units outstanding" },
];

const limitations = [
  "REIT accounting under IFRS's fair-value model means there is no conventional depreciation of investment properties; this analysis substitutes CapEx as the proxy for capital consumption, following standard REIT-analyst practice, but this is a judgment call, not a GAAP-mandated treatment.",
  "The WACC-minus-terminal-growth spread is narrow in the base case, making the terminal value (and therefore the whole valuation) highly sensitive to small input changes — see the Sensitivity Table.",
  "FY2023 total-portfolio NOI ($), total-debt-to-GBV, and distributions/unit were not directly confirmed from a summary table in this research pass; the historical table flags derived/estimated figures for that year explicitly rather than presenting them as directly sourced.",
  "Ontario-specific (as opposed to national) housing-starts and completions time series were not isolated to a verified provincial annual figure; national totals are shown with the limitation stated.",
  "The immigration-vacancy-rent link is treated as a well-evidenced contributing factor (per CMHC's own attribution), not a formally tested causal regression — the post-policy sample (roughly 4-6 quarters as of this analysis) is too short for a defensible regression.",
  "The cash tax rate (3%) applied to the forward FCFF forecast is a modelling assumption reflecting CAPREIT's REIT flow-through status and shrinking European tax exposure, not a disclosed guidance figure.",
  "Net debt and units outstanding are held at their most recent reported/estimated levels for simplicity; CAPREIT's ongoing NCIB unit buybacks and acquisition activity will continue to change both figures after this analysis's valuation date.",
  "Geographic mismatch: national StatCan/CMHC series are combined with Ontario- and CAPREIT-specific data; where a truly Ontario-only series was unavailable, this is stated rather than approximated silently.",
];

export default function MethodologySection() {
  return (
    <Section id="methodology" eyebrow="Methodology" title="Methodology, limitations &amp; sources">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="font-serif text-xl text-navy">Formulas used</h3>
          <div className="mt-4 space-y-3">
            {formulas.map((f) => (
              <div key={f.name} className="border-l-2 border-navy2/40 pl-4">
                <p className="font-sans text-xs uppercase tracking-wide text-ink/50">{f.name}</p>
                <p className="font-mono text-sm text-ink">{f.formula}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 font-serif text-xl text-navy">Limitations</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-ink/80">
            {limitations.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl text-navy">Primary sources</h3>
          <div className="mt-4 space-y-4 font-sans text-sm">
            <div>
              <p className="mb-1 font-medium text-ink">CAPREIT company disclosures</p>
              <ul className="space-y-1 text-ink/70">
                {Object.values(sources).map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-line hover:text-rust">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">Housing market data</p>
              <ul className="space-y-1 text-ink/70">
                {Object.values(housingSources).map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-line hover:text-rust">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">Immigration &amp; population data</p>
              <ul className="space-y-1 text-ink/70">
                {Object.values(immigrationSources).map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-line hover:text-rust">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-line pt-6 font-sans text-xs text-ink/40">
        Built as a university corporate-finance / housing-economics capstone project. Not investment advice.
        All figures traceable to the sources above as of the stated valuation date.
      </footer>
    </Section>
  );
}
