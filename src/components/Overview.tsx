import { Section, KPICard, SourceNote, Callout } from "./Shared";
import { companySnapshot, historicalFinancials, sources } from "../data/capreit";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Overview() {
  const chartData = historicalFinancials.map((h) => ({
    year: h.year,
    "Revenue ($M)": Math.round(h.revenue / 1_000_000 * 10) / 10,
    "NOI ($M)": h.noi ? Math.round(h.noi / 1_000_000 * 10) / 10 : null,
  }));

  return (
    <Section id="overview" eyebrow="Company overview" title="Canada's largest apartment landlord">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="max-w-prose font-sans text-base leading-relaxed text-ink/80">
            CAPREIT (TSX: CAR.UN) is a real estate investment trust that owns and operates roughly{" "}
            {companySnapshot.suitesTotal.toLocaleString()} residential apartment suites and townhomes across
            Canada, with a smaller and shrinking position in the Netherlands. It generates revenue almost
            entirely from residential rent: occupancy sits at {(companySnapshot.canadianOccupancy * 100).toFixed(1)}%
            and the average Canadian resident pays ${companySnapshot.canadianOccupiedAMR.toLocaleString()} per
            month. Ontario is CAPREIT's single largest market by a wide margin, accounting for{" "}
            {(companySnapshot.ontarioShareOfPortfolioFairValue * 100).toFixed(0)}% of portfolio fair value and{" "}
            {(companySnapshot.ontarioShareOfRevenue * 100).toFixed(0)}% of revenue — which is why Ontario's
            housing market, rather than Canada's in the abstract, is the right lens for this analysis.
          </p>
          <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-ink/80">
            {companySnapshot.europeWindDown}
          </p>
          <div className="mt-10 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="#D8D2C2" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#1B1E23" }} axisLine={{ stroke: "#D8D2C2" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#1B1E23" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #D8D2C2" }} />
                <Line type="monotone" dataKey="Revenue ($M)" stroke="#16233E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="NOI ($M)" stroke="#A24936" strokeWidth={2} dot={{ r: 3 }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 font-sans text-xs text-ink/50">
            Consolidated revenue and NOI, FY2021–FY2025 (includes the now-divesting European segment; the
            forward DCF below excludes it — see Methodology).
          </p>
          <SourceNote sources={[sources.pr2021, sources.q4_2022_pr, sources.q4_2023_pr, sources.q4_2024_pr, sources.ar2025]} />

          <div className="mt-8">
            <Callout>
              CAPREIT reports Funds From Operations (FFO), not GAAP "free cash flow." Under IFRS's fair-value
              model for investment properties, there is no straight-line depreciation of buildings — property
              value changes flow through as non-cash fair-value adjustments instead. This analysis reconstructs
              a conventional FCFF (EBIT × (1−tax) + D&amp;A − CapEx − ΔNWC) from CAPREIT's reported NOI and
              Adjusted EBITDAFV rather than treating FFO itself as "free cash flow." See Methodology for the
              full reconciliation.
            </Callout>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 self-start lg:grid-cols-1">
          <KPICard label="Unit price" value={`$${companySnapshot.marketPrice.toFixed(2)}`} sublabel={companySnapshot.valuationDate} />
          <KPICard label="Market capitalization" value={`$${(companySnapshot.marketCap / 1e9).toFixed(2)}B`} />
          <KPICard label="FY2025 revenue" value={`$${(historicalFinancials[4].revenue / 1e6).toFixed(0)}M`} />
          <KPICard label="FY2025 NOI" value={`$${(historicalFinancials[4].noi! / 1e6).toFixed(0)}M`} sublabel={`${(historicalFinancials[4].noiMargin! * 100).toFixed(1)}% margin`} />
          <KPICard label="FFO / unit (diluted)" value={`$${historicalFinancials[4].ffoPerUnitDiluted.toFixed(2)}`} sublabel="FY2025" />
          <KPICard label="Occupancy" value={`${(companySnapshot.canadianOccupancy * 100).toFixed(1)}%`} sublabel="Canadian residential, Dec 2025" />
          <KPICard label="Average monthly rent" value={`$${companySnapshot.canadianOccupiedAMR.toLocaleString()}`} sublabel="Occupied AMR, Dec 2025" />
          <KPICard label="Ontario revenue share" value={`${(companySnapshot.ontarioShareOfRevenue * 100).toFixed(0)}%`} />
        </div>
      </div>
    </Section>
  );
}
