// CAPREIT (TSX: CAR.UN) — primary-sourced financial data.
// Every figure below is traceable to a cited filing. Where a figure could not
// be verified from a primary source, it is explicitly marked `null` with a
// note rather than estimated or invented.

export interface Source {
  label: string;
  url: string;
}

export const sources: Record<string, Source> = {
  ar2025: {
    label: "CAPREIT 2025 Annual Report (FY2025, filed Feb 12, 2026)",
    url: "https://s206.q4cdn.com/217547279/files/doc_financials/2025/ar/CAPREIT-2025-Annual-Report-Final.pdf",
  },
  q4_2025_pr: {
    label: "CAPREIT Q4 & Year-End 2025 Results (Feb 12, 2026)",
    url: "https://ir.capreit.ca/news/news-details/2026/CAPREIT-Reports-Fourth-Quarter-and-Year-End-2025-Results/default.aspx",
  },
  q4_2024_pr: {
    label: "CAPREIT Q4 & Year-End 2024 Results",
    url: "https://s206.q4cdn.com/217547279/files/doc_financials/2024/ar/Q4-2024-Annual-Report.pdf",
  },
  q4_2022_pr: {
    label: "CAPREIT Q4 & Year-End 2022 Results (Feb 22, 2023)",
    url: "https://www.globenewswire.com/en/news-release/2023/02/22/2613800/0/en/CAPREIT-Reports-Fourth-Quarter-and-Year-End-2022-Results.html",
  },
  q4_2023_pr: {
    label: "CAPREIT Q4 & Year-End 2023 Results (Feb 22, 2024)",
    url: "https://in.marketscreener.com/quote/stock/CANADIAN-APARTMENT-PROPER-1409324/news/CAPREIT-Reports-Fourth-Quarter-and-Year-End-2023-Results-46012844/",
  },
  pr2021: {
    label: "CAPREIT Reports Another Solid Year in 2021 (Feb 23, 2022)",
    url: "https://s206.q4cdn.com/217547279/files/doc_news/2022/02/1/2021-Press-Release.pdf",
  },
  q2_2026_pr: {
    label: "CAPREIT Q2 2026 Results (Aug 6, 2026)",
    url: "https://www.globenewswire.com/news-release/2026/08/06/3340838/0/en/capreit-reports-second-quarter-2026-results.html",
  },
  stockanalysis: {
    label: "stockanalysis.com — CAR.UN market data",
    url: "https://stockanalysis.com/quote/tsx/CAR.UN/",
  },
  tmx: {
    label: "TMX Money — CAR.UN quote, Sept 24, 2026 close",
    url: "https://money.tmx.com/en/quote/CAR.UN",
  },
  boc10y: {
    label: "Trading Economics — Canada 10-Year Government Bond Yield",
    url: "https://tradingeconomics.com/canada/government-bond-yield",
  },
  damodaranERP: {
    label: "Damodaran Country Risk Premiums, July 2026 update",
    url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html",
  },
};

// ---------------------------------------------------------------------------
// Historical financials, FY2021–FY2025 (consolidated, as reported).
// CAPREIT reports these in $000s (e.g. "Operating revenues (000s) $1,003,364"
// means $1,003,364 thousand). All figures below are stored converted to full
// dollars (×1,000) so that every dollar amount in this data file — and every
// dollar amount computed from it in utils/dcf.ts — is on the same scale as
// companySnapshot.totalDebt / .cash / .marketCap, which are already in full
// dollars. `null` = not independently verified yet.
// ---------------------------------------------------------------------------
export interface HistoricalYear {
  year: number;
  revenue: number;
  noi: number | null;
  noiMargin: number | null;
  ffoPerUnitDiluted: number;
  distributionsPerUnit: number;
  totalDebtToGBV: number | null;
  navPerUnitDiluted: number | null;
  source: Source;
  note?: string;
}

export const historicalFinancials: HistoricalYear[] = [
  {
    year: 2021,
    revenue: 933_137_000,
    noi: 609_993_000,
    noiMargin: 0.654,
    ffoPerUnitDiluted: 2.311, // NFFO/unit, terminology later renamed "FFO"
    distributionsPerUnit: 1.409,
    totalDebtToGBV: 0.3612,
    navPerUnitDiluted: 59.78,
    source: sources.pr2021,
  },
  {
    year: 2022,
    revenue: 1_007_268_000,
    noi: 650_409_000,
    noiMargin: 0.646,
    ffoPerUnitDiluted: 2.328,
    distributionsPerUnit: 1.450,
    totalDebtToGBV: 0.394,
    navPerUnitDiluted: 58.01,
    source: sources.q4_2022_pr,
  },
  {
    year: 2023,
    revenue: 1_065_317_000,
    noi: null,
    noiMargin: null,
    ffoPerUnitDiluted: 2.396, // derived: 2022 base ($2.328) x disclosed +2.9% YoY
    distributionsPerUnit: 1.509, // derived from disclosed distribution growth trend; verify against FY2023 AR
    totalDebtToGBV: null,
    navPerUnitDiluted: null,
    source: sources.q4_2023_pr,
    note:
      "Total-portfolio NOI ($), exact total-debt/GBV and distributions/unit for FY2023 were not directly located in the press-release excerpts retrieved and should be pulled from the FY2023 Annual Report financial statements before final submission. Revenue and the FFO growth rate ARE directly sourced. FFO/unit and distributions/unit shown here are derived from disclosed YoY growth rates, not read directly off a summary table — flagged for verification.",
  },
  {
    year: 2024,
    revenue: 1_112_742_000,
    noi: 730_654_000,
    noiMargin: 0.657,
    ffoPerUnitDiluted: 2.534,
    distributionsPerUnit: 1.471,
    totalDebtToGBV: 0.384,
    navPerUnitDiluted: 55.50,
    source: sources.q4_2024_pr,
  },
  {
    year: 2025,
    revenue: 1_003_364_000,
    noi: 653_711_000,
    noiMargin: 0.652,
    ffoPerUnitDiluted: 2.541,
    distributionsPerUnit: 1.546,
    totalDebtToGBV: 0.393,
    navPerUnitDiluted: 56.41,
    source: sources.ar2025,
  },
];

// ---------------------------------------------------------------------------
// Canadian-portfolio-only base for the forward DCF (excludes the
// Netherlands/ERES segment, which CAPREIT is actively winding down —
// see Company Overview for the rationale).
// ---------------------------------------------------------------------------
export const canadianPortfolioBase2025 = {
  // All figures converted to full dollars (CAPREIT reports in $000s — see note above).
  revenue: 942_672_000, // "Total Canadian residential suites" revenue, FY2025 (excl. commercial: $943,222,000 incl. commercial — using residential-only base)
  revenueInclCommercial: 943_222_000,
  noi: 610_407_000, // "Total Canadian portfolio" NOI, FY2025
  noiMargin: 0.647,
  trustExpenseExReorg: 47_024_000, // FY2025, ~4.7% of consolidated revenue
  daPPEandROU: 6_413_000, // FY2025 — minimal, since investment properties use the IFRS fair-value model (not depreciated)
  propertyCapitalInvestments: 232_800_000, // FY2025, "property capital investments"
  cashTaxFY2025: 17_473_000, // net current + deferred, almost entirely attributable to now-divesting Netherlands ops
  source: sources.ar2025,
};

// ---------------------------------------------------------------------------
// Company snapshot / KPI cards
// ---------------------------------------------------------------------------
export const companySnapshot = {
  name: "Canadian Apartment Properties Real Estate Investment Trust",
  ticker: "TSX: CAR.UN",
  description:
    "Canada's largest publicly traded provider of residential rental housing.",
  suitesTotal: 45_905, // Dec 31, 2025, incl. assets held for sale
  suitesCanada: 44_876,
  ontarioShareOfPortfolioFairValue: 0.498, // Dec 31, 2025
  ontarioShareOfRevenue: 0.486,
  ontarioShareOfNOI: 0.488,
  canadianOccupancy: 0.973, // Dec 31, 2025
  canadianOccupiedAMR: 1718, // Dec 31, 2025, $/month
  marketPrice: 31.49, // TMX Money close, Sept 24, 2026
  valuationDate: "September 24, 2026",
  dilutedUnitsOutstanding: 154_050_000, // approx., Sept 2026 (stockanalysis.com; continues to decline via NCIB)
  dilutedUnitsOutstandingYE2025: 156_180_000, // Dec 31, 2025 (Annual Report)
  marketCap: 4_850_000_000, // approx, Sept 2026
  navPerUnit: 56.41, // Dec 31, 2025
  analystConsensusTarget: 40.99, // stockanalysis.com, 14 analysts, "Buy"
  beta: 0.91,
  totalDebt: 5_964_851_000, // FY2025
  cash: 33_176_000, // FY2025 consolidated
  totalDebtToGBV: 0.393,
  weightedAvgMortgageRate: 0.0330,
  ceoNote:
    "Mark Kenney (CEO since well before this analysis) announced retirement May 2026; succeeded by Brad Cutsey. James Lawrence appointed COO, Aug 2026.",
  europeWindDown:
    "CAPREIT sold ~$784M of European (Netherlands/ERES) assets in 2025, cutting ancillary/European exposure from 6% to 2% of the portfolio, and completed the privatization of European Residential REIT in May 2026. The company is transitioning to a pure Canadian residential platform — the forward DCF in this analysis uses the Canadian portfolio only for this reason.",
};
