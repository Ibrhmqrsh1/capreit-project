import { useMemo, useState } from "react";
import { Section, KPICard, SourceNote, Callout } from "./Shared";
import { baseAssumptions, calculateDCF, fmtPercent, type Assumptions } from "../utils/dcf";
import { sources } from "../data/capreit";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-sans text-sm">
        <label className="text-ink/70">{label}</label>
        <span className="font-tabular text-navy">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full"
      />
    </div>
  );
}

export default function DCFSection() {
  const [a, setA] = useState<Assumptions>(baseAssumptions);
  const [includePremium, setIncludePremium] = useState(true);

  const effectiveAssumptions = useMemo(
    () => ({ ...a, sizeLiquidityPremium: includePremium ? baseAssumptions.sizeLiquidityPremium : 0 }),
    [a, includePremium]
  );

  const result = useMemo(() => calculateDCF(effectiveAssumptions), [effectiveAssumptions]);

  const bridgeData = [
    { name: "PV of\nforecast FCFF", value: result.pvForecastFCFF / 1e6 },
    { name: "PV of\nterminal value", value: result.pvTerminalValue / 1e6 },
    { name: "Enterprise\nValue", value: result.enterpriseValue / 1e6, total: true },
    { name: "Less:\nnet debt", value: -result.netDebt / 1e6 },
    { name: "Equity\nValue", value: result.equityValue / 1e6, total: true },
  ];

  return (
    <Section id="dcf" eyebrow="Valuation" title="The discounted cash flow model">
      <p className="max-w-prose font-sans text-base leading-relaxed text-ink/80">
        A traditional enterprise-value DCF: FCFF = EBIT × (1 − tax) + D&amp;A − CapEx − ΔNWC, forecast
        explicitly for five years on CAPREIT's Canadian residential portfolio (the European segment is being
        wound down — see Overview), discounted at CAPREIT's WACC, plus a Gordon Growth terminal value.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6 border border-line bg-white/50 p-6">
          <p className="font-sans text-xs uppercase tracking-wide text-navy2">Adjust the assumptions</p>
          <Slider
            label="Revenue growth (p.a.)"
            value={a.revenueGrowth}
            min={0}
            max={0.08}
            step={0.0025}
            onChange={(v) => setA({ ...a, revenueGrowth: v })}
            format={(v) => fmtPercent(v, 2)}
          />
          <Slider
            label="NOI margin by 2030"
            value={a.noiMarginEnd}
            min={0.55}
            max={0.72}
            step={0.001}
            onChange={(v) => setA({ ...a, noiMarginEnd: v })}
            format={(v) => fmtPercent(v, 1)}
          />
          <Slider
            label="CapEx (% of NOI)"
            value={a.capExPctNOI}
            min={0.2}
            max={0.5}
            step={0.005}
            onChange={(v) => setA({ ...a, capExPctNOI: v })}
            format={(v) => fmtPercent(v, 1)}
          />
          <Slider
            label="Terminal growth rate"
            value={a.terminalGrowth}
            min={0.005}
            max={0.035}
            step={0.001}
            onChange={(v) => setA({ ...a, terminalGrowth: v })}
            format={(v) => fmtPercent(v, 1)}
          />
          <Slider
            label="Cash tax rate"
            value={a.cashTaxRate}
            min={0}
            max={0.15}
            step={0.005}
            onChange={(v) => setA({ ...a, cashTaxRate: v })}
            format={(v) => fmtPercent(v, 1)}
          />
          <label className="flex items-center gap-2 pt-2 font-sans text-sm text-ink/70">
            <input type="checkbox" checked={includePremium} onChange={(e) => setIncludePremium(e.target.checked)} />
            Include 75bp size/liquidity premium on WACC (judgment call)
          </label>
          <button
            onClick={() => setA(baseAssumptions)}
            className="mt-2 border border-navy px-3 py-1.5 font-sans text-xs text-navy hover:bg-navy hover:text-paper"
          >
            Reset to base case
          </button>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KPICard label="WACC" value={fmtPercent(result.wacc)} />
            <KPICard label="Enterprise value" value={`$${(result.enterpriseValue / 1e9).toFixed(2)}B`} />
            <KPICard label="Intrinsic value / unit" value={`$${result.intrinsicValuePerUnit.toFixed(2)}`} />
            <KPICard
              label="Upside / downside"
              value={`${result.upsideDownside >= 0 ? "+" : ""}${fmtPercent(result.upsideDownside)}`}
            />
          </div>

          <div className="mt-8 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bridgeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#D8D2C2" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#1B1E23" }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 11, fill: "#1B1E23" }} axisLine={false} tickLine={false} width={45} />
                <Tooltip
                  formatter={(v: unknown) => `$${Number(v).toFixed(0)}M`}
                  contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2" }}
                />
                <Bar dataKey="value">
                  {bridgeData.map((d, i) => (
                    <Cell key={i} fill={d.total ? "#16233E" : d.value < 0 ? "#A24936" : "#2F6F62"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="font-sans text-xs text-ink/50">DCF bridge from present value of cash flows to equity value ($M).</p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse font-sans text-sm">
              <thead>
                <tr className="border-b border-ink/20 text-left text-ink/60">
                  <th className="py-2 pr-4 font-normal">($M)</th>
                  {result.forecast.map((f) => (
                    <th key={f.year} className="py-2 pr-4 text-right font-normal">
                      {f.year}E
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-tabular">
                {[
                  { label: "Revenue", key: "revenue" as const },
                  { label: "NOI", key: "noi" as const },
                  { label: "EBIT", key: "ebit" as const },
                  { label: "NOPAT", key: "nopat" as const },
                  { label: "CapEx", key: "capex" as const },
                  { label: "FCFF", key: "fcff" as const },
                ].map((row) => (
                  <tr key={row.key} className="border-b border-line">
                    <td className="py-2 pr-4 text-ink/70">{row.label}</td>
                    {result.forecast.map((f) => (
                      <td key={f.year} className="py-2 pr-4 text-right text-ink">
                        {(f[row.key] / 1e6).toFixed(1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Callout tone="warn">
          At the current WACC-minus-terminal-growth spread, the terminal value dominates the valuation (it's
          typically 85–90% of enterprise value here). That means small changes to WACC or g move the answer a
          lot — see the Sensitivity Table below before treating any single number as "the" intrinsic value.
        </Callout>
      </div>

      <SourceNote
        sources={[
          "CAPREIT FY2025 Annual Report (base-year NOI, revenue, capex, D&A)",
          sources.tmx,
          sources.boc10y,
          sources.damodaranERP,
        ]}
      />
    </Section>
  );
}
