import { canadianPortfolioBase2025, companySnapshot } from "../data/capreit";

// ---------------------------------------------------------------------------
// Assumption set — every number here is either sourced (see data/capreit.ts,
// data/housing.ts) or an explicitly-labelled modelling judgment call.
// ---------------------------------------------------------------------------
export interface Assumptions {
  revenueGrowth: number; // annual, base case driver
  noiMarginStart: number;
  noiMarginEnd: number; // drifts linearly over the 5-yr forecast
  trustExpensePctRevenue: number;
  capExPctNOI: number;
  cashTaxRate: number;
  riskFreeRate: number;
  beta: number;
  equityRiskPremium: number;
  sizeLiquidityPremium: number; // discretionary judgment-call add-on
  preTaxCostOfDebt: number;
  statutoryTaxRateForDebtShield: number;
  terminalGrowth: number;
}

export const baseAssumptions: Assumptions = {
  revenueGrowth: 0.03,
  noiMarginStart: 0.648,
  noiMarginEnd: 0.65,
  trustExpensePctRevenue: 0.045,
  capExPctNOI: 0.35,
  cashTaxRate: 0.03,
  riskFreeRate: 0.0395, // GoC 10Y, Sept 24, 2026
  beta: 0.91,
  equityRiskPremium: 0.042, // Damodaran Canada, July 2026
  sizeLiquidityPremium: 0.0075, // judgment call, applied directly to WACC — see Methodology
  preTaxCostOfDebt: 0.033, // CAPREIT weighted-avg mortgage effective rate, Dec 31 2025
  statutoryTaxRateForDebtShield: 0.265,
  terminalGrowth: 0.02,
};

export const bullAssumptions: Assumptions = { ...baseAssumptions, revenueGrowth: 0.05, noiMarginEnd: 0.665 };
export const bearAssumptions: Assumptions = { ...baseAssumptions, revenueGrowth: 0.01, noiMarginEnd: 0.635 };

export interface ForecastYear {
  year: number;
  revenue: number;
  noi: number;
  ebit: number;
  nopat: number;
  da: number;
  capex: number;
  deltaNWC: number;
  fcff: number;
}

const FORECAST_YEARS = [2026, 2027, 2028, 2029, 2030];

export function calculateForecast(a: Assumptions): ForecastYear[] {
  const base = canadianPortfolioBase2025;
  let prevRevenue = base.revenue;
  const marginStep = (a.noiMarginEnd - a.noiMarginStart) / (FORECAST_YEARS.length - 1);

  return FORECAST_YEARS.map((year, i) => {
    const revenue = prevRevenue * (1 + a.revenueGrowth);
    const noiMargin = a.noiMarginStart + marginStep * i;
    const noi = revenue * noiMargin;
    const trustExpense = revenue * a.trustExpensePctRevenue;
    const ebit = noi - trustExpense;
    const nopat = ebit * (1 - a.cashTaxRate);
    const da = revenue * (base.daPPEandROU / base.revenue); // hold D&A/revenue ratio constant
    const capex = noi * a.capExPctNOI;
    const deltaNWC = (revenue - prevRevenue) * 0.003; // small working-capital drag, standard simplifying assumption
    const fcff = nopat + da - capex - deltaNWC;

    prevRevenue = revenue;
    return { year, revenue, noi, ebit, nopat, da, capex, deltaNWC, fcff };
  });
}

export function calculateCostOfEquity(a: Assumptions): number {
  return a.riskFreeRate + a.beta * a.equityRiskPremium;
}

export function calculateWACC(a: Assumptions, marketCap: number, totalDebt: number): {
  costOfEquity: number;
  afterTaxCostOfDebt: number;
  equityWeight: number;
  debtWeight: number;
  waccCAPMOnly: number;
  wacc: number;
} {
  const costOfEquity = calculateCostOfEquity(a);
  const afterTaxCostOfDebt = a.preTaxCostOfDebt * (1 - a.statutoryTaxRateForDebtShield);
  const totalCapital = marketCap + totalDebt;
  const equityWeight = marketCap / totalCapital;
  const debtWeight = totalDebt / totalCapital;
  const waccCAPMOnly = equityWeight * costOfEquity + debtWeight * afterTaxCostOfDebt;
  const wacc = waccCAPMOnly + a.sizeLiquidityPremium;
  return { costOfEquity, afterTaxCostOfDebt, equityWeight, debtWeight, waccCAPMOnly, wacc };
}

export function calculateTerminalValue(finalYearFCFF: number, wacc: number, g: number): number {
  const fcfNPlus1 = finalYearFCFF * (1 + g);
  return fcfNPlus1 / (wacc - g);
}

export interface DCFResult {
  forecast: ForecastYear[];
  wacc: number;
  waccCAPMOnly: number;
  costOfEquity: number;
  afterTaxCostOfDebt: number;
  equityWeight: number;
  debtWeight: number;
  pvForecastFCFF: number;
  terminalValue: number;
  pvTerminalValue: number;
  enterpriseValue: number;
  netDebt: number;
  equityValue: number;
  intrinsicValuePerUnit: number;
  marketPrice: number;
  upsideDownside: number;
}

export function calculateDCF(
  a: Assumptions,
  marketCap: number = companySnapshot.marketCap,
  totalDebt: number = companySnapshot.totalDebt,
  cash: number = companySnapshot.cash,
  unitsOutstanding: number = companySnapshot.dilutedUnitsOutstanding,
  marketPrice: number = companySnapshot.marketPrice
): DCFResult {
  const forecast = calculateForecast(a);
  const { wacc, waccCAPMOnly, costOfEquity, afterTaxCostOfDebt, equityWeight, debtWeight } = calculateWACC(
    a,
    marketCap,
    totalDebt
  );

  const pvForecastFCFF = forecast.reduce((sum, y, i) => sum + y.fcff / Math.pow(1 + wacc, i + 1), 0);

  const finalFCFF = forecast[forecast.length - 1].fcff;
  const terminalValue = calculateTerminalValue(finalFCFF, wacc, a.terminalGrowth);
  const pvTerminalValue = terminalValue / Math.pow(1 + wacc, forecast.length);

  const enterpriseValue = pvForecastFCFF + pvTerminalValue;
  const netDebt = totalDebt - cash;
  const equityValue = enterpriseValue - netDebt;
  const intrinsicValuePerUnit = equityValue / unitsOutstanding;
  const upsideDownside = (intrinsicValuePerUnit - marketPrice) / marketPrice;

  return {
    forecast,
    wacc,
    waccCAPMOnly,
    costOfEquity,
    afterTaxCostOfDebt,
    equityWeight,
    debtWeight,
    pvForecastFCFF,
    terminalValue,
    pvTerminalValue,
    enterpriseValue,
    netDebt,
    equityValue,
    intrinsicValuePerUnit,
    marketPrice,
    upsideDownside,
  };
}

// ---------------------------------------------------------------------------
// Sensitivity matrix: intrinsic value per unit across a WACC x terminal
// growth grid, holding the explicit 5-year forecast fixed (base case).
// ---------------------------------------------------------------------------
export function calculateSensitivity(
  a: Assumptions,
  waccRange: number[],
  gRange: number[]
): { wacc: number; g: number; value: number }[] {
  const forecast = calculateForecast(a);
  const finalFCFF = forecast[forecast.length - 1].fcff;
  const netDebt = companySnapshot.totalDebt - companySnapshot.cash;

  const results: { wacc: number; g: number; value: number }[] = [];
  for (const wacc of waccRange) {
    for (const g of gRange) {
      if (wacc <= g) {
        results.push({ wacc, g, value: NaN });
        continue;
      }
      const pvForecast = forecast.reduce((sum, y, i) => sum + y.fcff / Math.pow(1 + wacc, i + 1), 0);
      const tv = calculateTerminalValue(finalFCFF, wacc, g);
      const pvTV = tv / Math.pow(1 + wacc, forecast.length);
      const ev = pvForecast + pvTV;
      const equity = ev - netDebt;
      const perUnit = equity / companySnapshot.dilutedUnitsOutstanding;
      results.push({ wacc, g, value: perUnit });
    }
  }
  return results;
}

export function calculateScenario(scenario: "bear" | "base" | "bull"): DCFResult {
  const map = { bear: bearAssumptions, base: baseAssumptions, bull: bullAssumptions };
  return calculateDCF(map[scenario]);
}

export function fmtCurrency(v: number, decimals = 2): string {
  return v.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtMillion(v: number): string {
  return `$${(v / 1_000_000).toFixed(1)}M`;
}

export function fmtPercent(v: number, decimals = 1): string {
  return `${(v * 100).toFixed(decimals)}%`;
}
