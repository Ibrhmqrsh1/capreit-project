// Policy inventory: federal / provincial / municipal levers relevant to
// CAPREIT, with documented mechanisms rather than partisan attribution.

export type Level = "Federal" | "Ontario" | "Municipal";
export type Effect = "Positive for CAPREIT" | "Negative for CAPREIT" | "Mixed / uncertain";

export interface PolicyItem {
  policy: string;
  level: Level;
  objective: string;
  mechanism: string;
  evidence: string;
  housingEffect: string;
  capreitEffect: string;
  dcfVariable: string;
  direction: Effect;
}

export const policyMatrix: PolicyItem[] = [
  {
    policy: "2026-2028 Immigration Levels Plan (permanent residents held at 380,000/yr; temporary residents cut ~43% to 385,000 in 2026)",
    level: "Federal",
    objective:
      "Reduce non-permanent-resident share of population below 5% by end-2027; stabilize permanent immigration near 1% of population.",
    mechanism:
      "Fewer new temporary residents (students, workers) and slower net migration directly reduce net new rental-demand formation, especially in large CMAs where CAPREIT concentrates.",
    evidence:
      "StatCan: Toronto CMA population growth fell from +269,143 (2023/24) to -992 (2024/25). CMHC: national purpose-built rental vacancy rose from 2.2% (2024) to 3.1% (2025), explicitly attributed in part to slower population growth.",
    housingEffect: "Slower rental-demand growth; rising vacancy in demand-sensitive segments (newer builds, near post-secondary institutions).",
    capreitEffect: "Softer same-property rent growth and higher leasing incentives — consistent with CAPREIT's own FY2025 commentary (blended Q4 rent change of -2.1%, increased tenant inducements).",
    dcfVariable: "Revenue growth ↓ (same-property rent/occupancy assumption)",
    direction: "Negative for CAPREIT",
  },
  {
    policy: "International student permit cap (new arrivals cut from ~306,000 to 155,000, 2025→2026)",
    level: "Federal",
    objective: "Reduce pressure on housing and services in university/college towns; curb non-genuine study permit use.",
    mechanism: "Students are a significant share of new renters in CMAs with post-secondary institutions.",
    evidence: "CMHC 2025 Rental Market Report: Ottawa units built after 2015 saw vacancy of 6.7%, more than double the metro average, linked to reduced international-student demand.",
    housingEffect: "Disproportionate vacancy increase in newer, amenity-rich purpose-built rental supply.",
    capreitEffect: "Limited direct exposure (CAPREIT's portfolio skews toward established mid-market rather than student-oriented micro-units), but a modest drag on turnover pricing power in university-adjacent submarkets (London/Kitchener-Waterloo, Ottawa).",
    dcfVariable: "Same-property rent growth ↓ (submarket-specific)",
    direction: "Negative for CAPREIT",
  },
  {
    policy: "Ontario residential rent-control guideline (capped at 2.1% for 2026, below the province's own CPI-based calculation)",
    level: "Ontario",
    objective: "Limit annual rent increases on existing tenancies in rent-controlled units to protect affordability.",
    mechanism: "Directly caps the rent growth CAPREIT can charge on lease renewals for units built before Nov 15, 2018 (post-2018 units are exempt).",
    evidence: "CAPREIT's own Annual Report discloses the guideline every year because it is a binding constraint: 2024 guideline 2.5% vs. an uncapped CPI-based calculation of 5.9%; 2025 guideline 2.5% vs. uncapped 3.1%.",
    housingEffect: "Limits in-place rent growth for existing tenants; does not apply to new construction, which increasingly directs investment toward post-2018 stock.",
    capreitEffect: "Directly caps renewal-driven revenue growth on ~most of CAPREIT's legacy (pre-2018) Ontario suites — the single most quantifiable, deterministic policy input in this entire model.",
    dcfVariable: "Ontario same-property rent growth (direct, deterministic cap on the renewal component)",
    direction: "Negative for CAPREIT",
  },
  {
    policy: "GST rebate / removal on new purpose-built rental construction (federal, in effect since late 2023)",
    level: "Federal",
    objective: "Incentivize new purpose-built rental supply by removing the 5% GST on qualifying new rental projects.",
    mechanism: "Lowers the effective cost of new rental construction, intended to increase supply and long-run affordability.",
    evidence: "CMHC 2025 Rental Market Report: 2025 marked a second consecutive year of record rental housing starts (over half of all urban housing starts nationally).",
    housingEffect: "More new rental supply over the medium term, which (all else equal) raises long-run vacancy and competition for tenants.",
    capreitEffect: "Two-sided: CAPREIT can use the incentive on its OWN new-build acquisitions/development (lowering its cost of growth), but industry-wide new supply also increases competition for its existing (largely legacy) suites.",
    dcfVariable: "CapEx / acquisition cost ↓ for CAPREIT directly; rent growth / vacancy ↔ ambiguous industry-wide effect",
    direction: "Mixed / uncertain",
  },
  {
    policy: "Federal carbon tax removal on consumer fuels (effective April 1, 2025)",
    level: "Federal",
    objective: "Reduce household and business energy costs following the repeal of the federal consumer carbon levy.",
    mechanism: "Lowers natural-gas costs directly billed to or borne by landlords.",
    evidence: "CAPREIT FY2025 MD&A explicitly cites the carbon-tax removal as a driver of lower natural-gas costs in both total and same-property utility expense.",
    housingEffect: "Marginal reduction in building operating costs across the rental sector.",
    capreitEffect: "Directly lowers CAPREIT's utility expense line — one of the few clearly quantified, positive, and already-realized policy effects in this model.",
    dcfVariable: "Operating expense / EBIT margin ↑ (modest, already partly realized in FY2025 actuals)",
    direction: "Positive for CAPREIT",
  },
  {
    policy: "Bank of Canada policy rate path (held at 2.25% since Oct 2025; 10Y GoC yield ~3.95% Sept 2026, with the Bank signalling readiness to hike if inflation stays elevated)",
    level: "Federal",
    objective: "Keep CPI inflation near the Bank's 2% target amid tariff-related and energy-driven price pressure.",
    mechanism: "Affects (a) mortgage affordability for prospective homeowners — supporting rental demand when ownership is unaffordable — and (b) CAPREIT's cost of debt and discount rate directly.",
    evidence: "CAPREIT's weighted-average mortgage rate rose from 3.11% (2024) to 3.30% (2025); the Bank held rates through 2026 citing tariff and energy-driven inflation risk.",
    housingEffect: "Higher-for-longer rates keep ownership less affordable relative to renting (rental-demand supportive) while also raising landlords' financing costs.",
    capreitEffect: "Genuinely ambiguous and is highlighted explicitly in Section 22 of this analysis: higher rates can support rental demand while simultaneously raising CAPREIT's WACC and financing costs, working in opposite directions on intrinsic value.",
    dcfVariable: "WACC ↑ (discount-rate effect) vs. Revenue growth ↑ (rental-demand effect) — opposing signs",
    direction: "Mixed / uncertain",
  },
  {
    policy: "Municipal development charges & approvals timelines (GTA municipalities)",
    level: "Municipal",
    objective: "Fund municipal infrastructure (water, roads, transit) via charges levied on new development.",
    mechanism: "Raises the upfront cost of new rental and ownership construction; approval delays add carrying costs.",
    evidence: "Widely documented in CMHC and industry commentary as a structural driver of the gap between housing need and completions in the GTA, though this analysis did not independently verify a specific dollar figure for current GTA development-charge levels.",
    housingEffect: "Higher costs and slower timelines for new supply, tightening the long-run housing/rental balance.",
    capreitEffect: "Raises the cost of CAPREIT's own development/acquisition pipeline, but also acts as a barrier to entry that protects the value of CAPREIT's existing, already-built portfolio.",
    dcfVariable: "CapEx (for CAPREIT's own growth) ↑; long-run competitive supply ↓ (protects existing asset value)",
    direction: "Mixed / uncertain",
  },
];

export const transmissionChains = {
  immigration: [
    "Federal immigration/temporary-resident policy",
    "Population & household formation growth",
    "Rental housing demand",
    "Vacancy rate",
    "Rent growth",
    "CAPREIT same-property revenue",
    "Free cash flow (FCFF)",
    "DCF intrinsic value",
  ],
  supply: [
    "Federal/provincial/municipal housing-supply policy (GST rebate, zoning, development charges)",
    "Rental construction starts & completions",
    "Rental supply growth",
    "Vacancy rate",
    "Rent growth / pricing power",
    "CAPREIT revenue",
  ],
  monetary: {
    root: "Bank of Canada policy rate",
    branchA: ["Mortgage affordability", "Homeownership demand", "Rental demand (inverse)"],
    branchB: ["CAPREIT cost of debt & WACC", "Discount rate applied to future cash flows", "DCF intrinsic value (inverse)"],
  },
};
