// StatNusa data — figures compiled from public releases of Statistics Indonesia
// (BPS) and the World Bank, rounded for display. Every figure on the site comes
// from this file; the site makes no network request.

export const META = {
  country: 'Indonesia',
  updated: 'November 2026',
  population2024: 281.6,
  gdp2024Rp: 22139,
  gdpPerCapitaUsd: 4960,
  inflation2024: 1.57,
  unemployment2024: 4.91,
  poverty2024: 8.57,
};

// Population, millions, mid-year estimates (BPS). 2020 is the census count.
export const populationByYear = [
  { year: 2015, pop: 255.6 },
  { year: 2016, pop: 258.7 },
  { year: 2017, pop: 261.9 },
  { year: 2018, pop: 265.0 },
  { year: 2019, pop: 268.1 },
  { year: 2020, pop: 270.2 },
  { year: 2021, pop: 272.7 },
  { year: 2022, pop: 275.8 },
  { year: 2023, pop: 278.7 },
  { year: 2024, pop: 281.6 },
];

// Age structure, 2024, millions. Groups sum to the 2024 total.
export const ageGroups = [
  { group: '0–4', pop: 22.1 },
  { group: '5–9', pop: 23.2 },
  { group: '10–14', pop: 23.7 },
  { group: '15–19', pop: 23.4 },
  { group: '20–24', pop: 22.8 },
  { group: '25–29', pop: 22.4 },
  { group: '30–34', pop: 22.6 },
  { group: '35–39', pop: 22.1 },
  { group: '40–44', pop: 21.0 },
  { group: '45–49', pop: 19.4 },
  { group: '50–54', pop: 16.9 },
  { group: '55–59', pop: 14.0 },
  { group: '60–64', pop: 10.6 },
  { group: '65–69', pop: 7.6 },
  { group: '70–74', pop: 5.0 },
  { group: '75+', pop: 4.8 },
];

export const ageSummary = [
  { group: '0–14 years', share: 24.5, note: '69.0 million children' },
  { group: '15–64 years', share: 69.0, note: '194.3 million working age' },
  { group: '65+ years', share: 6.5, note: '18.3 million older people' },
];

// Real GDP growth, % year on year (BPS).
export const gdpGrowth = [
  { year: 2019, growth: 5.02 },
  { year: 2020, growth: -2.07 },
  { year: 2021, growth: 3.70 },
  { year: 2022, growth: 5.31 },
  { year: 2023, growth: 5.05 },
  { year: 2024, growth: 5.03 },
];

// Nominal GDP, Rp trillion (BPS).
export const gdpNominal = [
  { year: 2019, gdp: 15833 },
  { year: 2020, gdp: 15434 },
  { year: 2021, gdp: 16977 },
  { year: 2022, gdp: 19588 },
  { year: 2023, gdp: 20892 },
  { year: 2024, gdp: 22139 },
];

// Share of GDP by industry, 2024, % (BPS).
export const sectorShare = [
  { sector: 'Manufacturing', share: 18.7 },
  { sector: 'Wholesale & retail trade', share: 13.0 },
  { sector: 'Agriculture, forestry & fishing', share: 12.5 },
  { sector: 'Construction', share: 10.0 },
  { sector: 'Mining & quarrying', share: 9.2 },
  { sector: 'Public administration', share: 4.9 },
  { sector: 'Transportation & storage', share: 4.6 },
  { sector: 'Finance & insurance', share: 4.3 },
  { sector: 'Information & communication', share: 4.2 },
  { sector: 'Real estate', share: 2.6 },
  { sector: 'Accommodation & food services', share: 2.6 },
  { sector: 'Other services', share: 13.4 },
];

// Goods trade, US$ billion (BPS).
export const trade = [
  { year: 2019, exports: 167.7, imports: 171.3 },
  { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.6, imports: 196.2 },
  { year: 2022, exports: 291.9, imports: 237.4 },
  { year: 2023, exports: 258.8, imports: 221.9 },
  { year: 2024, exports: 264.7, imports: 233.7 },
];

// Open unemployment rate, % of labour force, August each year (BPS).
export const unemployment = [
  { year: 2019, rate: 5.23 },
  { year: 2020, rate: 7.07 },
  { year: 2021, rate: 6.49 },
  { year: 2022, rate: 5.86 },
  { year: 2023, rate: 5.32 },
  { year: 2024, rate: 4.91 },
];

// Share of employment by sector, August 2024, % (BPS).
export const employmentBySector = [
  { sector: 'Agriculture, forestry & fishing', share: 28.5 },
  { sector: 'Wholesale & retail trade', share: 19.1 },
  { sector: 'Manufacturing', share: 14.0 },
  { sector: 'Construction', share: 7.4 },
  { sector: 'Transportation & storage', share: 4.6 },
  { sector: 'Accommodation & food services', share: 6.2 },
  { sector: 'Public administration & education', share: 9.1 },
  { sector: 'Other services', share: 11.1 },
];

// Consumer price inflation, % year on year (BPS).
export const inflationAnnual = [
  { year: 2019, rate: 2.72 },
  { year: 2020, rate: 1.68 },
  { year: 2021, rate: 1.87 },
  { year: 2022, rate: 5.51 },
  { year: 2023, rate: 2.61 },
  { year: 2024, rate: 1.57 },
];

// CPI inflation by month, 2024, % year on year (BPS).
export const inflationMonthly2024 = [
  { month: 'Jan', rate: 2.57 },
  { month: 'Feb', rate: 2.75 },
  { month: 'Mar', rate: 3.05 },
  { month: 'Apr', rate: 3.00 },
  { month: 'May', rate: 2.84 },
  { month: 'Jun', rate: 2.51 },
  { month: 'Jul', rate: 2.13 },
  { month: 'Aug', rate: 2.12 },
  { month: 'Sep', rate: 1.84 },
  { month: 'Oct', rate: 1.71 },
  { month: 'Nov', rate: 1.55 },
  { month: 'Dec', rate: 1.57 },
];

// Average retail prices, Rp, November 2024 (BPS price survey).
export const foodPrices = [
  { item: 'Rice', unit: 'kg', price: 15400 },
  { item: 'Chicken meat', unit: 'kg', price: 38500 },
  { item: 'Beef', unit: 'kg', price: 135000 },
  { item: 'Chicken eggs', unit: 'kg', price: 28500 },
  { item: 'Cooking oil', unit: 'litre', price: 18200 },
  { item: 'Sugar', unit: 'kg', price: 18000 },
  { item: 'Red chillies', unit: 'kg', price: 42000 },
  { item: 'Shallots', unit: 'kg', price: 38000 },
  { item: 'Garlic', unit: 'kg', price: 41000 },
  { item: 'Tempeh', unit: 'kg', price: 13500 },
];

// 38 provinces: mid-2024 population (millions, BPS estimates, rounded),
// GRDP per capita (Rp million, 2024) and open unemployment rate (%, Aug 2024).
export const provinces = [
  { name: 'Aceh', pop: 5.55, grdpPc: 45.9, unemp: 5.5 },
  { name: 'North Sumatra', pop: 15.59, grdpPc: 72.4, unemp: 5.3 },
  { name: 'West Sumatra', pop: 6.03, grdpPc: 61.5, unemp: 5.2 },
  { name: 'Riau', pop: 6.96, grdpPc: 165.8, unemp: 4.3 },
  { name: 'Jambi', pop: 3.68, grdpPc: 79.5, unemp: 4.2 },
  { name: 'South Sumatra', pop: 8.84, grdpPc: 86.2, unemp: 4.3 },
  { name: 'Bengkulu', pop: 2.10, grdpPc: 48.6, unemp: 3.5 },
  { name: 'Lampung', pop: 9.30, grdpPc: 52.3, unemp: 4.0 },
  { name: 'Bangka Belitung', pop: 1.52, grdpPc: 91.8, unemp: 3.8 },
  { name: 'Riau Islands', pop: 2.28, grdpPc: 178.2, unemp: 5.5 },
  { name: 'Jakarta', pop: 10.56, grdpPc: 322.5, unemp: 5.8 },
  { name: 'West Java', pop: 49.94, grdpPc: 58.3, unemp: 6.5 },
  { name: 'Central Java', pop: 37.89, grdpPc: 51.2, unemp: 5.3 },
  { name: 'Yogyakarta', pop: 3.76, grdpPc: 44.8, unemp: 3.9 },
  { name: 'East Java', pop: 41.81, grdpPc: 76.9, unemp: 4.2 },
  { name: 'Banten', pop: 12.43, grdpPc: 68.7, unemp: 7.0 },
  { name: 'Bali', pop: 4.41, grdpPc: 72.1, unemp: 2.2 },
  { name: 'West Nusa Tenggara', pop: 5.66, grdpPc: 38.4, unemp: 3.0 },
  { name: 'East Nusa Tenggara', pop: 5.66, grdpPc: 28.9, unemp: 3.2 },
  { name: 'West Kalimantan', pop: 5.82, grdpPc: 52.7, unemp: 4.1 },
  { name: 'Central Kalimantan', pop: 2.80, grdpPc: 84.6, unemp: 3.9 },
  { name: 'South Kalimantan', pop: 4.28, grdpPc: 78.9, unemp: 3.9 },
  { name: 'East Kalimantan', pop: 3.99, grdpPc: 271.4, unemp: 5.4 },
  { name: 'North Kalimantan', pop: 0.73, grdpPc: 158.3, unemp: 4.0 },
  { name: 'North Sulawesi', pop: 2.69, grdpPc: 64.2, unemp: 6.2 },
  { name: 'Central Sulawesi', pop: 3.12, grdpPc: 98.4, unemp: 3.6 },
  { name: 'South Sulawesi', pop: 9.49, grdpPc: 74.3, unemp: 4.4 },
  { name: 'Southeast Sulawesi', pop: 2.80, grdpPc: 71.6, unemp: 3.7 },
  { name: 'Gorontalo', pop: 1.25, grdpPc: 42.1, unemp: 4.2 },
  { name: 'West Sulawesi', pop: 1.54, grdpPc: 48.9, unemp: 3.0 },
  { name: 'Maluku', pop: 1.98, grdpPc: 36.8, unemp: 6.2 },
  { name: 'North Maluku', pop: 1.45, grdpPc: 69.5, unemp: 4.5 },
  { name: 'West Papua', pop: 1.23, grdpPc: 116.4, unemp: 5.1 },
  { name: 'Southwest Papua', pop: 0.63, grdpPc: 82.6, unemp: 5.8 },
  { name: 'South Papua', pop: 0.54, grdpPc: 74.8, unemp: 3.8 },
  { name: 'Central Papua', pop: 1.38, grdpPc: 96.2, unemp: 3.4 },
  { name: 'Highland Papua', pop: 1.47, grdpPc: 22.4, unemp: 2.9 },
  { name: 'Papua', pop: 1.08, grdpPc: 68.3, unemp: 4.6 },
];

export const latestReleases = [
  { date: '5 February 2025', text: 'Economy grew 5.03% in 2024; nominal GDP reached Rp 22,139 trillion.' },
  { date: '2 January 2025', text: 'Consumer inflation for 2024 was 1.57% year on year, the lowest in years.' },
  { date: '5 November 2024', text: 'Open unemployment fell to 4.91% in August 2024, down from 5.32% a year earlier.' },
  { date: '15 October 2024', text: 'Poverty rate fell to 8.57% in September 2024, down from 9.03% in March.' },
  { date: '1 July 2024', text: 'Mid-year population estimate: 281.6 million people across 38 provinces.' },
];
