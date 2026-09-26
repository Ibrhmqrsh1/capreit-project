# CAPREIT — Housing, Policy & Valuation

A second-year corporate finance / housing-economics capstone project: a discounted cash flow
valuation of Canadian Apartment Properties REIT (TSX: CAR.UN) connected end-to-end to Ontario
housing conditions, immigration policy, and interest rates.

**Research question:** How do housing-market conditions, immigration, and government policy affect
the intrinsic value of Canadian residential real estate companies? A DCF and housing-market
analysis of CAPREIT.

## Live result (base case, as of Sept 24, 2026)

| | |
|---|---|
| Market price | $31.49 |
| Base-case DCF value | ~$27.8-28.0/unit |
| Implied downside | ~-11% (base case, WACC 5.6%) |
| Alternative (CAPM-only WACC 4.8%) | ~+47% upside |

Both are correct under their own assumptions — the site's Sensitivity Table and Methodology
section explain why the discount-rate choice, not the operating assumptions, drives the sign of
the conclusion.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts (all charts)

## Project structure

```
src/
  data/
    capreit.ts        - CAPREIT financials, KPIs, all with cited sources
    housing.ts         - Ontario/Canada housing market data (CREA, CMHC, BoC)
    immigration.ts      - Statistics Canada population data, IRCC levels plan
    policy.ts           - policy impact matrix and transmission-chain diagrams
  utils/
    dcf.ts              - calculateForecast(), calculateWACC(), calculateTerminalValue(),
                            calculateDCF(), calculateSensitivity(), calculateScenario()
  components/
    Nav.tsx, Hero.tsx, Overview.tsx, DCFSection.tsx, WACCAndSensitivity.tsx,
    HousingSection.tsx, ImmigrationSection.tsx, PolicySection.tsx, ScenarioSection.tsx,
    ConclusionSection.tsx, MethodologySection.tsx, Shared.tsx (KPI cards, source notes, etc.)
```

All financial and economic assumptions live in `src/data/` and `src/utils/dcf.ts` - nothing is
hard-coded inside a component, so the entire model can be re-run with updated figures by editing
those two locations.

## How to run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173).

To produce a production build:

```bash
npm run build
npm run preview
```

The project has been built and type-checked successfully in the development environment
(`npx tsc --noEmit` and `npm run build` both pass with zero errors as of the last edit).
`node_modules` is not included in this delivery to keep the download small - run `npm install`
first.

## DCF methodology (summary - full detail in the site's Methodology section)

- **FCFF** = EBIT x (1 - cash tax rate) + D&A - CapEx - deltaNWC, built from CAPREIT's
  Canadian-only portfolio (the Netherlands/ERES segment is excluded because CAPREIT is actively
  divesting it).
- **Base year**: FY2025 audited financials (CAPREIT's FY2025 Annual Report).
- **WACC**: CAPM cost of equity (Rf 3.95%, beta 0.91, ERP 4.2%) blended with after-tax cost of
  debt (3.3% pre-tax, 26.5% statutory tax shield), weighted by market cap/total debt, **plus a
  discretionary 75bp size/liquidity premium** - clearly labelled in the UI as a judgment call, not
  a CAPM output, because the pure-CAPM WACC (4.8%) is unusually low for a mid-cap REIT.
- **Terminal value**: Gordon Growth, g = 2.0% base case.
- **Sensitivity**: full WACC x terminal-growth grid provided; the conclusion's sign flips within
  the range of defensible discount-rate assumptions - this is reported honestly rather than
  papered over.

## Known limitations (see Methodology section in the app for the full list)

1. FY2023 CAPREIT figures (total NOI $, total-debt/GBV, distributions/unit) were not directly
   confirmed from a single summary table during research and are flagged in `data/capreit.ts` as
   derived/estimated rather than presented as directly sourced.
2. Ontario-specific (vs. national) annual housing starts/completions were not isolated to a single
   verified provincial figure; national CMHC totals are shown with this limitation stated.
3. The immigration -> vacancy -> rent relationship is presented as a well-evidenced contributing
   factor (per CMHC's own published attribution), not as a formally tested regression - the
   post-policy-shift sample is currently too short (roughly 4-6 quarters) for a credible
   regression, and the site says so explicitly rather than running a spurious one.
4. Net debt, share count, and market cap are point-in-time snapshots (Sept 2026); CAPREIT's
   ongoing NCIB buybacks continue to change the unit count after this analysis's valuation date.

## Data sources

Every chart and figure cites its source inline in the site (the "Source:" line under each
chart/table, with live links). Primary sources used: CAPREIT Annual Reports and quarterly press
releases (SEDAR+/globenewswire), Statistics Canada (The Daily, population estimates), CMHC (Rental
Market Report, Housing Starts data), Bank of Canada (policy rate, bond yields), CREA/OREA (resale
housing statistics), IRCC (2026-2028 Immigration Levels Plan), and Damodaran's country
equity-risk-premium dataset (NYU Stern, July 2026 update).
