// Immigration & population data — Statistics Canada + IRCC, primary-sourced.

export const immigrationSources = {
  statcanQ2_2025: {
    label: "StatCan — The Daily, Canada's population estimates, Q2 2025",
    url: "https://www150.statcan.gc.ca/n1/daily-quotidien/250924/dq250924a-eng.htm",
  },
  statcanQ4_2024: {
    label: "StatCan — The Daily, Canada's population estimates, Q4 2024",
    url: "https://www150.statcan.gc.ca/n1/daily-quotidien/250319/dq250319a-eng.htm",
  },
  statcanSubprovincial2025: {
    label: "StatCan — The Daily, population estimates: subprovincial areas, 2025",
    url: "https://www150.statcan.gc.ca/n1/daily-quotidien/260114/dq260114a-eng.htm",
  },
  statcan2026: {
    label: "StatCan — The Daily, population estimates: age and gender, 2026",
    url: "https://www150.statcan.gc.ca/n1/daily-quotidien/260923/dq260923a-eng.htm",
  },
  irccLevels: {
    label: "IRCC — 2026-2028 Immigration Levels Plan / Supplementary Information",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/corporate-initiatives/levels/supplementary-immigration-levels-2026-2028.html",
  },
};

// National + Ontario population growth, annual (July-to-July growth rate)
export const populationGrowthRate = [
  { period: "2020/2021", canadaGrowth: 0.006 },
  { period: "2021/2022", canadaGrowth: 0.018 },
  { period: "2022/2023", canadaGrowth: 0.027 },
  { period: "2023/2024", canadaGrowth: 0.028 },
  { period: "2024/2025", canadaGrowth: 0.011 },
  { period: "2025/2026", canadaGrowth: 0.005, ontarioGrowth: 0.003, note: "Ontario, Quebec and BC — the three largest provinces and biggest recipients of international migrants — all grew SLOWER than the national rate for the first time in this cycle" },
];

// Toronto CMA — the single most CAPREIT-relevant data point available:
// population growth went from a record to essentially flat in one year.
export const torontoCMA = {
  jul2024to2025Growth: -992, // people
  jul2024to2025GrowthPct: -0.0002,
  jul2023to2024Growth: 269_143,
  jul2023to2024GrowthPct: 0.039,
  components2025: {
    births: 63_778,
    deaths: -40_675,
    immigrants: 115_348,
    nonPermanentResidentChange: -44_792,
    netEmigration: -17_159,
    netInterprovincialMigration: -12_698,
    netIntraprovincialMigration: -64_794,
  },
  source: immigrationSources.statcanSubprovincial2025,
};

export const nonPermanentResidents = [
  { date: "2024-01-01", count: 2_729_771 },
  { date: "2025-01-01", count: 3_020_936, change: 291_165, note: "~3x smaller increase than 2023's +820,766" },
];

export const canadaPopulation = [
  { date: "2025-01-01", value: 41_528_680 },
  { date: "2025-04-01", value: 41_548_787 },
  { date: "2025-07-01", value: 41_651_653 },
];

export const ontarioPopulation = {
  jan2025: 16_182_641,
  source: immigrationSources.statcanQ4_2024,
};

// IRCC 2026-2028 Immigration Levels Plan
export const immigrationLevelsPlan = [
  { year: 2025, permanentResidentTarget: null, temporaryResidentTarget: 673_650, note: "prior plan's 2025 temporary-resident target, shown for scale of the cut" },
  { year: 2026, permanentResidentTarget: 380_000, temporaryResidentTarget: 385_000 },
  { year: 2027, permanentResidentTarget: 380_000, temporaryResidentTarget: 370_000 },
  { year: 2028, permanentResidentTarget: 380_000, temporaryResidentTarget: 370_000 },
];

export const immigrationPolicyGoals = {
  nprShareTarget: "Reduce non-permanent residents to below 5% of Canada's population by end of 2027 (from a peak above 7.5% in 2024)",
  prShareTarget: "Hold permanent-resident admissions at less than 1% of Canada's population annually",
  economicShareTarget: "Raise economic-class share of PR admissions to 64% by 2027-2028",
  studentPermitCut: "New international student arrivals target cut from 305,900 (2025) to 155,000 (2026), roughly a 49% reduction",
  workerPermitCut: "New work-permit target cut from 367,750 (2025) to 230,000 (2026), roughly a 37% reduction",
  source: immigrationSources.irccLevels,
};
