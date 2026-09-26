import {
  calculateDCF,
  calculateWACC,
  baseAssumptions,
  bullAssumptions,
  bearAssumptions,
  calculateSensitivity,
  fmtPercent,
} from "./src/utils/dcf";
import { companySnapshot, canadianPortfolioBase2025, historicalFinancials } from "./src/data/capreit";

console.log("=== Raw data sanity ===");
console.log("Canadian portfolio base revenue ($):", canadianPortfolioBase2025.revenue.toLocaleString());
console.log("FY2025 historical revenue ($):", historicalFinancials[4].revenue.toLocaleString());
console.log("FY2025 historical NOI ($):", historicalFinancials[4].noi?.toLocaleString());
console.log("Total debt ($):", companySnapshot.totalDebt.toLocaleString());
console.log("Cash ($):", companySnapshot.cash.toLocaleString());
console.log("Units outstanding:", companySnapshot.dilutedUnitsOutstanding.toLocaleString());

console.log("\n=== WACC ===");
const wacc = calculateWACC(baseAssumptions, companySnapshot.marketCap, companySnapshot.totalDebt);
console.log(wacc);

console.log("\n=== Base case DCF ===");
const base = calculateDCF(baseAssumptions);
console.log("Forecast:", base.forecast.map((f) => ({ year: f.year, revenueM: (f.revenue / 1e6).toFixed(1), noiM: (f.noi / 1e6).toFixed(1), fcffM: (f.fcff / 1e6).toFixed(1) })));
console.log("WACC:", fmtPercent(base.wacc));
console.log("PV forecast FCFF ($M):", (base.pvForecastFCFF / 1e6).toFixed(1));
console.log("PV terminal value ($M):", (base.pvTerminalValue / 1e6).toFixed(1));
console.log("Enterprise value ($M):", (base.enterpriseValue / 1e6).toFixed(1));
console.log("Net debt ($M):", (base.netDebt / 1e6).toFixed(1));
console.log("Equity value ($M):", (base.equityValue / 1e6).toFixed(1));
console.log("Intrinsic value/unit: $" + base.intrinsicValuePerUnit.toFixed(2));
console.log("Upside/downside:", fmtPercent(base.upsideDownside));

console.log("\n=== Bull / Bear ===");
console.log("Bull: $" + calculateDCF(bullAssumptions).intrinsicValuePerUnit.toFixed(2));
console.log("Bear: $" + calculateDCF(bearAssumptions).intrinsicValuePerUnit.toFixed(2));

console.log("\n=== Sensitivity sample ===");
const sens = calculateSensitivity(baseAssumptions, [0.045, 0.055, 0.065], [0.015, 0.02, 0.025]);
sens.forEach((s) => console.log(`WACC ${fmtPercent(s.wacc,1)} / g ${fmtPercent(s.g,1)} -> $${s.value.toFixed(2)}`));

console.log("\n=== CAPM-only WACC comparison ===");
const capmOnly = calculateDCF({ ...baseAssumptions, sizeLiquidityPremium: 0 });
console.log("CAPM-only WACC:", fmtPercent(capmOnly.wacc));
console.log("CAPM-only intrinsic value/unit: $" + capmOnly.intrinsicValuePerUnit.toFixed(2));
console.log("CAPM-only upside:", fmtPercent(capmOnly.upsideDownside));
