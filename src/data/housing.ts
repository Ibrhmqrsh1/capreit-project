// Ontario / Canada housing-market data — primary-sourced (CREA, CMHC, Bank of
// Canada). Where a precise multi-year Ontario-specific series was not
// retrievable in this research pass, the most recent verified points are
// used and the gap is documented rather than filled with invented numbers.

export const housingSources = {
  crea: {
    label: "CREA / OREA — Ontario resale housing statistics",
    url: "https://creastats.crea.ca/board/orea/",
  },
  creaNational: {
    label: "CREA — National housing market stats, Sept 15, 2026 release",
    url: "https://stats.crea.ca/en-ca/",
  },
  cmhcRentalReport: {
    label: "CMHC 2025 Rental Market Report (Dec 11, 2025)",
    url: "https://www.cmhc-schl.gc.ca/media-newsroom/news-releases/2025/canadas-vacancy-rate-rises-amid-historically-high-rental-construction",
  },
  cmhcStarts2025: {
    label: "CMHC — Housing starts, December 2025 / full-year 2025",
    url: "https://www.cmhc-schl.gc.ca/media-newsroom/news-releases/2026/housing-starts-december-2025",
  },
  boc: {
    label: "Bank of Canada — policy rate decision, Sept 2, 2026",
    url: "https://www.bankofcanada.ca/2026/09/fad-press-release-2026-09-02/",
  },
  boc10y: {
    label: "Trading Economics — Canada 10Y bond yield",
    url: "https://tradingeconomics.com/canada/government-bond-yield",
  },
};

// Ontario resale housing prices (most recently verified points).
export const ontarioHomePrices = [
  { period: "Aug 2025", avgPrice: 802_500, note: "implied by -1.7% YoY move to Aug 2026 figure" },
  { period: "Aug 2026", avgPrice: 788_835, benchmarkHPI: 745_400 },
];

export const nationalHomePrices2026 = {
  augAvgPrice: 668_219,
  augAvgPriceYoY: 0.006,
  augHPIYoY: -0.03,
  source: housingSources.creaNational,
};

// CMHC purpose-built rental vacancy rate & 2-bed rent, national + GTA
export const rentalMarket = [
  { area: "Canada (national)", vacancy2024: 0.022, vacancy2025: 0.031, twoBedRent2025: null },
  { area: "GTA", vacancy2025: 0.03, twoBedRent2025: 2034, twoBedRentGrowth2025: 0.035 },
  { area: "GTA condo apartment segment", vacancy2025: 0.01, twoBedRent2025: 2904 },
  { area: "Ottawa", vacancy2025: 0.03, note: "new (post-2015) units vacancy 6.7%, more than double the metro average" },
  { area: "Windsor", vacancy2025: 0.037 },
];

export const cmhcKeyFinding = {
  text:
    "CMHC's 2025 Rental Market Report attributes the rise in purpose-built rental vacancy (national: 2.2% in 2024 to 3.1% in 2025, above the 10-year average) to a combination of record rental construction AND weaker demand caused by slower population and economic growth — explicitly linking the 2025-2026 immigration/temporary-resident slowdown to loosening rental markets. GTA vacancy rose to 3.0% while average 2-bed rent still grew 3.5% to $2,034; smaller unit types saw rent growth slow amid competition from rising condo supply.",
  source: housingSources.cmhcRentalReport,
};

// National housing starts, annual (all areas)
export const housingStartsNational = [
  { year: 2023, starts: 240_267, note: "derived: CMHC reported 2024 was +2% over 2023" },
  { year: 2024, starts: 245_367 },
  { year: 2025, starts: 259_028, note: "+5.6% YoY, 5th highest annual total on record; rental starts made up just over half of all urban starts" },
];

export const housingStartsNote =
  "Ontario-specific annual starts were not isolated to a single verified figure in this research pass (CMHC commentary indicates Ontario starts were BELOW 2024 levels through most of 2025 before a record December, while national starts rose — i.e., the national increase was driven more by other provinces). This should be pulled from CMHC's StatCan table (pid 34-10-0135-01) by province before the final published version.";

// Interest rates
export const rates = {
  bocPolicyRate: 0.0225, // held since Oct 29, 2025, reconfirmed Sept 2, 2026
  goc10y: 0.0395, // Sept 24, 2026
  goc5y: 0.0342, // Sept 2, 2026
  source: housingSources.boc,
};

// Ontario rent control guideline history (directly from CAPREIT's own MD&A,
// which discloses it every year because it constrains their revenue)
export const ontarioRentGuideline = [
  { year: 2024, guideline: 0.025, note: "capped below inflation; uncapped calc would have been 5.9%" },
  { year: 2025, guideline: 0.025, note: "capped below inflation; uncapped calc would have been 3.1%" },
  { year: 2026, guideline: 0.021, note: "capped in line with Ontario CPI at announcement" },
];
