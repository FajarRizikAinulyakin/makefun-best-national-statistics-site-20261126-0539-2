// StatNusa views — one function per page. Each renders its HTML into #app,
// draws its canvas charts, and wires up its own controls. All figures come
// from data.js; nothing here fetches anything.

import {
  META, populationByYear, ageGroups, ageSummary, gdpGrowth, gdpNominal,
  sectorShare, trade, unemployment, employmentBySector, inflationAnnual,
  inflationMonthly2024, foodPrices, provinces, latestReleases,
} from './data.js';
import { lineChart, barChart, hbarChart, groupedBarChart } from './charts.js';

const fmt = (n, d = 1) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n) => n.toLocaleString('en-US');

function kpi(label, value, note) {
  return `<div class="kpi"><div class="label">${label}</div><div class="value">${value}</div><div class="note">${note}</div></div>`;
}

function pageHead(eyebrow, title, intro) {
  return `<div class="page-head"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${intro}</p></div>`;
}

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

// ---------------------------------------------------------------- overview
export function viewOverview(app) {
  app.innerHTML = `
    <section class="hero">
      <h1>Indonesia in numbers</h1>
      <p>Population, economy, jobs, prices and all 38 provinces — the headline
      figures for the world's fourth most populous country, with charts, tables
      and the source of every number.</p>
      <div class="hero-figures">
        <div><strong>${fmt(META.population2024)} million</strong>people (2024)</div>
        <div><strong>Rp ${fmtInt(META.gdp2024Rp)} trillion</strong>GDP (2024)</div>
        <div><strong>${fmt(META.inflation2024, 2)}%</strong>inflation (2024)</div>
        <div><strong>38</strong>provinces</div>
      </div>
    </section>
    <div class="kpis">
      ${kpi('Population', `${fmt(META.population2024)} <small>million</small>`, 'Mid-2024 estimate, BPS')}
      ${kpi('GDP', `Rp ${fmtInt(META.gdp2024Rp)} <small>trillion</small>`, 'Nominal, 2024 — <b class="up">+5.03%</b> real growth')}
      ${kpi('GDP per capita', `US$ ${fmtInt(META.gdpPerCapitaUsd)}`, '2024, World Bank / BPS')}
      ${kpi('Inflation', `${fmt(META.inflation2024, 2)}<small>%</small>`, 'CPI, 2024 average, BPS')}
      ${kpi('Unemployment', `${fmt(META.unemployment2024, 2)}<small>%</small>`, 'Open rate, August 2024, BPS')}
      ${kpi('Poverty rate', `${fmt(META.poverty2024, 2)}<small>%</small>`, 'September 2024, BPS')}
    </div>
    <div class="card">
      <h2>Headline trend</h2>
      <p class="sub">Switch the chart to compare the three headline series, 2019–2024.</p>
      <div class="toggle" role="group" aria-label="Choose series">
        <button data-series="growth" class="on">GDP growth</button>
        <button data-series="inflation">Inflation</button>
        <button data-series="unemployment">Unemployment</button>
      </div>
      <canvas id="overview-chart" class="chart" aria-label="Headline trend chart"></canvas>
      <p class="chart-note" id="overview-note">Real GDP growth, % year on year.</p>
    </div>
    <div class="grid-wrap">
      <section class="card">
        <h2>Latest releases</h2>
        <p class="sub">What Statistics Indonesia published most recently.</p>
        <ol class="releases">
          ${latestReleases.map((r) => `<li>${r.text}<br><span class="rel-date">${r.date}</span></li>`).join('')}
        </ol>
      </section>
      <section class="card">
        <h2>Explore the data</h2>
        <p class="sub">Every section is a full page of charts and tables.</p>
        <ul class="tight">
          <li><a href="#/population">Population</a> — 281.6 million people, age structure and growth since 2015.</li>
          <li><a href="#/economy">Economy</a> — GDP, growth, industries and trade with the world.</li>
          <li><a href="#/employment">Employment</a> — who works, where, and the unemployment rate.</li>
          <li><a href="#/prices">Prices</a> — inflation by year and month, plus everyday food prices.</li>
          <li><a href="#/regions">Regions</a> — all 38 provinces compared, searchable and sortable.</li>
        </ul>
      </section>
    </div>
    <section class="card method">
      <h2>How to read StatNusa</h2>
      <p>Figures are rounded for display and labelled with their source and reference year on every
      page. Population figures are mid-year estimates; the 2020 figure is the census count. GDP is
      nominal unless marked "real growth". Unemployment is the open unemployment rate (TPT) for
      August of each year. Provincial figures are 2024 estimates and may not sum exactly to the
      national total because of rounding.</p>
    </section>`;

  const series = {
    growth: { labels: gdpGrowth.map((d) => String(d.year)), values: gdpGrowth.map((d) => d.growth), unit: '%', note: 'Real GDP growth, % year on year. The 2020 dip is the pandemic recession; growth has held above 5% since 2022.' },
    inflation: { labels: inflationAnnual.map((d) => String(d.year)), values: inflationAnnual.map((d) => d.rate), unit: '%', note: 'Consumer price inflation, % year on year. The 2022 spike followed the fuel-price adjustment; 2024 came in at 1.57%.' },
    unemployment: { labels: unemployment.map((d) => String(d.year)), values: unemployment.map((d) => d.rate), unit: '%', note: 'Open unemployment rate, % of the labour force, August each year. The pandemic peak was 7.07% in 2020.' },
  };
  const canvas = app.querySelector('#overview-chart');
  const note = app.querySelector('#overview-note');
  function draw(which) {
    const s = series[which];
    lineChart(canvas, s.labels, s.values, { unit: s.unit, decimals: 2 });
    note.textContent = s.note;
  }
  draw('growth');
  app.querySelectorAll('.toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('.toggle button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      draw(btn.dataset.series);
    });
  });
}

// -------------------------------------------------------------- population
export function viewPopulation(app) {
  const total = META.population2024;
  app.innerHTML = `
    ${pageHead('Population', '281.6 million people', 'Indonesia is the world’s fourth most populous country. The population grows by about 3 million people a year, and nearly seven in ten Indonesians are of working age.')}
    <div class="kpis">
      ${kpi('Population 2024', `${fmt(total)} <small>million</small>`, 'Mid-year estimate, BPS')}
      ${kpi('Annual growth', `+1.1<small>%</small>`, 'Average 2020–2024')}
      ${kpi('Median age', `30.7 <small>years</small>`, '2024 estimate')}
      ${kpi('Working age (15–64)', `69.0<small>%</small>`, '194.3 million people')}
      ${kpi('Children (0–14)', `24.5<small>%</small>`, '69.0 million children')}
      ${kpi('Older people (65+)', `6.5<small>%</small>`, '18.3 million people')}
    </div>
    <div class="card">
      <h2>Population over time</h2>
      <p class="sub">Switch between total population by year and the age structure in 2024.</p>
      <div class="toggle" role="group" aria-label="Choose chart">
        <button data-chart="byyear" class="on">By year</button>
        <button data-chart="byage">By age group</button>
      </div>
      <canvas id="pop-chart" class="chart tall" aria-label="Population chart"></canvas>
      <p class="chart-note" id="pop-note">Total population, millions, 2015–2024.</p>
    </div>
    <div class="grid-wrap">
      <section class="card">
        <h2>Age structure, 2024</h2>
        <p class="sub">Share of the population in each broad age band.</p>
        <table class="data">
          <thead><tr><th>Age band</th><th class="num">Share</th><th>People</th></tr></thead>
          <tbody>
            ${ageSummary.map((a) => `<tr><td>${a.group}</td><td class="num">${fmt(a.share)}%</td><td>${a.note}</td></tr>`).join('')}
          </tbody>
        </table>
        ${sourceLine('BPS, population estimates 2024.')}
      </section>
      <section class="card">
        <h2>What the age structure means</h2>
        <p class="sub">A young, working-age population.</p>
        <ul class="tight">
          <li><strong>Demographic dividend:</strong> with 69% of people aged 15–64, every 100 workers support about 45 dependants — the lowest dependency ratio in the country's history.</li>
          <li><strong>Still growing:</strong> the 0–14 group alone is 69 million children, so the population keeps rising even as fertility falls.</li>
          <li><strong>Ageing slowly:</strong> only 6.5% are 65 or older today, but that share roughly doubles by 2045.</li>
          <li><strong>Where people live:</strong> 56% of Indonesians live on Java — see the <a href="#/regions">Regions</a> page for every province.</li>
        </ul>
      </section>
    </div>`;

  const canvas = app.querySelector('#pop-chart');
  const note = app.querySelector('#pop-note');
  function draw(which) {
    if (which === 'byyear') {
      lineChart(canvas, populationByYear.map((d) => String(d.year)), populationByYear.map((d) => d.pop), { unit: 'm', decimals: 1, color: '#0f2a43' });
      note.textContent = 'Total population, millions, 2015–2024. The 2020 point is the census count of 270.2 million.';
    } else {
      hbarChart(canvas, ageGroups.map((d) => d.group), ageGroups.map((d) => d.pop), { unit: 'm', decimals: 1, labelWidth: 56 });
      note.textContent = 'Population by five-year age group, millions, 2024. The wide base is the young population; the bars narrow steadily with age.';
    }
  }
  draw('byyear');
  app.querySelectorAll('.toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('.toggle button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      draw(btn.dataset.chart);
    });
  });
}

// ---------------------------------------------------------------- economy
export function viewEconomy(app) {
  const surplus = trade[trade.length - 1].exports - trade[trade.length - 1].imports;
  app.innerHTML = `
    ${pageHead('Economy', 'A US$1.4 trillion economy', 'Indonesia is Southeast Asia’s largest economy. Growth has held above 5% since 2022, manufacturing is the biggest industry, and the country has run a goods trade surplus every year since 2020.')}
    <div class="kpis">
      ${kpi('GDP 2024', `Rp ${fmtInt(META.gdp2024Rp)} <small>trillion</small>`, 'Nominal, BPS')}
      ${kpi('Real growth', `+5.03<small>%</small>`, '2024, year on year')}
      ${kpi('GDP per capita', `US$ ${fmtInt(META.gdpPerCapitaUsd)}`, '2024, World Bank / BPS')}
      ${kpi('Exports 2024', `US$ ${fmt(trade[5].exports, 1)} <small>billion</small>`, 'Goods, BPS')}
      ${kpi('Trade balance', `+US$ ${fmt(surplus, 1)} <small>billion</small>`, 'Goods surplus, 2024')}
      ${kpi('Biggest industry', `Manufacturing`, '18.7% of GDP, 2024')}
    </div>
    <div class="card">
      <h2>Growth, industries and trade</h2>
      <p class="sub">Switch the chart to see the economy from three angles.</p>
      <div class="toggle" role="group" aria-label="Choose chart">
        <button data-chart="growth" class="on">GDP growth</button>
        <button data-chart="sectors">Industries</button>
        <button data-chart="trade">Trade</button>
      </div>
      <canvas id="econ-chart" class="chart tall" aria-label="Economy chart"></canvas>
      <p class="chart-note" id="econ-note">Real GDP growth, % year on year.</p>
    </div>
    <div class="grid-wrap">
      <section class="card">
        <h2>GDP by year</h2>
        <p class="sub">Nominal GDP in rupiah, and real growth.</p>
        <table class="data">
          <thead><tr><th>Year</th><th class="num">GDP (Rp trillion)</th><th class="num">Real growth</th></tr></thead>
          <tbody>
            ${gdpNominal.map((d, i) => `<tr><td>${d.year}</td><td class="num">${fmtInt(d.gdp)}</td><td class="num">${gdpGrowth[i].growth > 0 ? '+' : ''}${fmt(gdpGrowth[i].growth, 2)}%</td></tr>`).join('')}
          </tbody>
        </table>
        ${sourceLine('BPS, national accounts.')}
      </section>
      <section class="card">
        <h2>Trade with the world</h2>
        <p class="sub">Goods exports and imports, US$ billion.</p>
        <table class="data">
          <thead><tr><th>Year</th><th class="num">Exports</th><th class="num">Imports</th><th class="num">Balance</th></tr></thead>
          <tbody>
            ${trade.map((t) => `<tr><td>${t.year}</td><td class="num">${fmt(t.exports, 1)}</td><td class="num">${fmt(t.imports, 1)}</td><td class="num">${t.exports - t.imports > 0 ? '+' : ''}${fmt(t.exports - t.imports, 1)}</td></tr>`).join('')}
          </tbody>
        </table>
        ${sourceLine('BPS, foreign trade statistics.')}
      </section>
    </div>`;

  const canvas = app.querySelector('#econ-chart');
  const note = app.querySelector('#econ-note');
  function draw(which) {
    if (which === 'growth') {
      lineChart(canvas, gdpGrowth.map((d) => String(d.year)), gdpGrowth.map((d) => d.growth), { unit: '%', decimals: 2 });
      note.textContent = 'Real GDP growth, % year on year. The 2020 contraction was the pandemic; growth returned above 5% in 2022 and stayed there.';
    } else if (which === 'sectors') {
      hbarChart(canvas, sectorShare.map((d) => d.sector), sectorShare.map((d) => d.share), { unit: '%', decimals: 1, labelWidth: 210, color: '#0f2a43' });
      note.textContent = 'Share of GDP by industry, 2024. Manufacturing leads at 18.7%, followed by trade and agriculture.';
    } else {
      groupedBarChart(canvas, trade.map((d) => String(d.year)), trade.map((d) => d.exports), trade.map((d) => d.imports), { unit: '', labelA: 'Exports', labelB: 'Imports' });
      note.textContent = 'Goods exports (teal) and imports (amber), US$ billion. Indonesia has run a surplus every year since 2020.';
    }
  }
  draw('growth');
  app.querySelectorAll('.toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('.toggle button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      draw(btn.dataset.chart);
    });
  });
}

// -------------------------------------------------------------- employment
export function viewEmployment(app) {
  app.innerHTML = `
    ${pageHead('Employment', '144.6 million people at work', 'The labour force is 152.1 million people and unemployment is at its lowest in years. Agriculture still employs the most people, but services and manufacturing keep growing.')}
    <div class="kpis">
      ${kpi('Labour force', `152.1 <small>million</small>`, 'August 2024, BPS')}
      ${kpi('Employed', `144.6 <small>million</small>`, 'August 2024, BPS')}
      ${kpi('Unemployed', `7.47 <small>million</small>`, 'August 2024, BPS')}
      ${kpi('Unemployment rate', `${fmt(META.unemployment2024, 2)}<small>%</small>`, 'Open rate, August 2024')}
      ${kpi('Participation rate', `70.6<small>%</small>`, 'Of people aged 15+, August 2024')}
      ${kpi('Informal work', `59.2<small>%</small>`, 'Share of the employed, August 2024')}
    </div>
    <div class="card">
      <h2>Unemployment and where people work</h2>
      <p class="sub">Switch between the unemployment trend and the mix of jobs.</p>
      <div class="toggle" role="group" aria-label="Choose chart">
        <button data-chart="unemp" class="on">Unemployment rate</button>
        <button data-chart="sectors">Jobs by sector</button>
      </div>
      <canvas id="emp-chart" class="chart tall" aria-label="Employment chart"></canvas>
      <p class="chart-note" id="emp-note">Open unemployment rate, % of the labour force, August each year.</p>
    </div>
    <div class="grid-wrap">
      <section class="card">
        <h2>Unemployment by year</h2>
        <p class="sub">Open unemployment rate, August each year.</p>
        <table class="data">
          <thead><tr><th>Year</th><th class="num">Rate</th><th>Change</th></tr></thead>
          <tbody>
            ${unemployment.map((d, i) => `<tr><td>${d.year}</td><td class="num">${fmt(d.rate, 2)}%</td><td>${i === 0 ? '—' : (d.rate - unemployment[i - 1].rate > 0 ? '+' : '') + fmt(d.rate - unemployment[i - 1].rate, 2) + ' pts'}</td></tr>`).join('')}
          </tbody>
        </table>
        ${sourceLine('BPS, National Labour Force Survey (Sakernas).')}
      </section>
      <section class="card">
        <h2>Reading the labour market</h2>
        <p class="sub">What the numbers say about work in Indonesia.</p>
        <ul class="tight">
          <li><strong>Recovery complete:</strong> unemployment (4.91%) is below its pre-pandemic level of 5.23% in 2019.</li>
          <li><strong>Agriculture still leads:</strong> 28.5% of workers are in farming, forestry and fishing — the largest single sector.</li>
          <li><strong>Informal majority:</strong> 59.2% of workers are in informal work, without a formal contract or social protection.</li>
          <li><strong>Youth unemployment is higher:</strong> about 16% of people aged 15–24 who look for work cannot find it — roughly three times the national rate.</li>
          <li><strong>Provincial gaps are wide:</strong> Banten's unemployment (7.0%) is triple Bali's (2.2%) — compare all provinces on the <a href="#/regions">Regions</a> page.</li>
        </ul>
      </section>
    </div>`;

  const canvas = app.querySelector('#emp-chart');
  const note = app.querySelector('#emp-note');
  function draw(which) {
    if (which === 'unemp') {
      lineChart(canvas, unemployment.map((d) => String(d.year)), unemployment.map((d) => d.rate), { unit: '%', decimals: 2, color: '#b3402a' });
      note.textContent = 'Open unemployment rate, % of the labour force, August each year. The 2020 spike to 7.07% was the pandemic; the rate has fallen every year since.';
    } else {
      hbarChart(canvas, employmentBySector.map((d) => d.sector), employmentBySector.map((d) => d.share), { unit: '%', decimals: 1, labelWidth: 210 });
      note.textContent = 'Share of employment by sector, August 2024. Agriculture employs 28.5% of workers; trade and manufacturing follow.';
    }
  }
  draw('unemp');
  app.querySelectorAll('.toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('.toggle button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      draw(btn.dataset.chart);
    });
  });
}

// ------------------------------------------------------------------ prices
export function viewPrices(app) {
  app.innerHTML = `
    ${pageHead('Prices', 'Inflation at 1.57% in 2024', 'Prices rose just 1.57% over 2024 — the slowest in years. Food prices, the part of inflation households feel most, are tracked every month in markets across the country.')}
    <div class="kpis">
      ${kpi('Inflation 2024', `${fmt(META.inflation2024, 2)}<small>%</small>`, 'CPI, year on year')}
      ${kpi('Inflation target', `2.5<small>%</small> ± 1 pt`, 'Bank Indonesia target band')}
      ${kpi('Highest month 2024', `3.05<small>%</small>`, 'March 2024, year on year')}
      ${kpi('Lowest month 2024', `1.55<small>%</small>`, 'November 2024, year on year')}
      ${kpi('Rice', `Rp ${fmtInt(15400)}<small>/kg</small>`, 'Average retail, November 2024')}
      ${kpi('Cooking oil', `Rp ${fmtInt(18200)}<small>/litre</small>`, 'Average retail, November 2024')}
    </div>
    <div class="card">
      <h2>Inflation over time</h2>
      <p class="sub">Switch between the annual series and the twelve months of 2024.</p>
      <div class="toggle" role="group" aria-label="Choose chart">
        <button data-chart="annual" class="on">By year</button>
        <button data-chart="monthly">Months of 2024</button>
      </div>
      <canvas id="price-chart" class="chart" aria-label="Inflation chart"></canvas>
      <p class="chart-note" id="price-note">Consumer price inflation, % year on year.</p>
    </div>
    <div class="grid-wrap">
      <section class="card">
        <h2>Everyday food prices</h2>
        <p class="sub">Average retail prices, November 2024.</p>
        <table class="data">
          <thead><tr><th>Item</th><th class="num">Price (Rp)</th><th>Per</th></tr></thead>
          <tbody>
            ${foodPrices.map((f) => `<tr><td>${f.item}</td><td class="num">${fmtInt(f.price)}</td><td>${f.unit}</td></tr>`).join('')}
          </tbody>
        </table>
        ${sourceLine('BPS, consumer price survey.')}
      </section>
      <section class="card">
        <h2>What was Rp 100,000 worth?</h2>
        <p class="sub">Use annual inflation to see what money from an earlier year buys in 2024.</p>
        <div class="calc">
          <label>Amount (Rp)
            <input type="number" id="calc-amount" value="100000" min="1000" step="1000">
          </label>
          <label>From year
            <select id="calc-year">
              ${inflationAnnual.slice(0, -1).map((d) => `<option value="${d.year}">${d.year}</option>`).join('')}
            </select>
          </label>
          <button id="calc-go" type="button">Calculate</button>
        </div>
        <p class="calc-result" id="calc-result">Rp 100,000 in 2023 buys what Rp 101,570 buys in 2024.</p>
        <p class="source">Calculated by compounding the annual CPI inflation rates in the chart above. Rounded to the nearest Rp 10.</p>
      </section>
    </div>`;

  const canvas = app.querySelector('#price-chart');
  const note = app.querySelector('#price-note');
  function draw(which) {
    if (which === 'annual') {
      barChart(canvas, inflationAnnual.map((d) => String(d.year)), inflationAnnual.map((d) => d.rate), { unit: '%', decimals: 2, color: '#0e7c6b' });
      note.textContent = 'Consumer price inflation, % year on year. The 2022 spike followed the fuel-price adjustment; by 2024 inflation was back to 1.57%.';
    } else {
      lineChart(canvas, inflationMonthly2024.map((d) => d.month), inflationMonthly2024.map((d) => d.rate), { unit: '%', decimals: 2, color: '#e8a33d' });
      note.textContent = 'CPI inflation by month, 2024, % year on year. Inflation eased through the year, from 3.05% in March to 1.57% in December.';
    }
  }
  draw('annual');
  app.querySelectorAll('.toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('.toggle button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      draw(btn.dataset.chart);
    });
  });

  // Inflation calculator: compound the annual rates from the chosen year to 2024.
  const amountInput = app.querySelector('#calc-amount');
  const yearSelect = app.querySelector('#calc-year');
  const result = app.querySelector('#calc-result');
  function calculate() {
    const amount = Number(amountInput.value);
    const fromYear = Number(yearSelect.value);
    if (!Number.isFinite(amount) || amount <= 0) {
      result.textContent = 'Enter an amount above Rp 0 to calculate.';
      return;
    }
    let factor = 1;
    for (const d of inflationAnnual) {
      if (d.year > fromYear) factor *= 1 + d.rate / 100;
    }
    const adjusted = Math.round((amount * factor) / 10) * 10;
    result.innerHTML = `Rp ${fmtInt(amount)} in ${fromYear} buys what <strong>Rp ${fmtInt(adjusted)}</strong> buys in 2024.`;
  }
  app.querySelector('#calc-go').addEventListener('click', calculate);
}

// ----------------------------------------------------------------- regions
export function viewRegions(app) {
  const totalPop = provinces.reduce((s, p) => s + p.pop, 0);
  app.innerHTML = `
    ${pageHead('Regions', 'All 38 provinces', 'West Java has 49.9 million people; South Papua has 0.54 million — search the table, or click a column heading to sort it.')}
    <div class="kpis">
      ${kpi('Provinces', `38`, 'Since the 2022 expansion in Papua')}
      ${kpi('Largest province', `West Java`, '49.94 million people')}
      ${kpi('Smallest province', `South Papua`, '0.54 million people')}
      ${kpi('Richest per person', `Jakarta`, 'GRDP Rp 322.5 million per person')}
      ${kpi('Highest unemployment', `Banten`, '7.0% of the labour force')}
      ${kpi('Lowest unemployment', `Bali`, '2.2% of the labour force')}
    </div>
    <div class="card">
      <h2>Provinces compared</h2>
      <p class="sub">Population is the mid-2024 estimate; GRDP per capita and unemployment are 2024 figures. Click a heading to sort.</p>
      <div class="search-row">
        <label for="region-search">Search provinces</label>
        <input type="search" id="region-search" placeholder="e.g. Java, Papua, Kalimantan…" autocomplete="off">
        <span class="result-count" id="region-count">${provinces.length} of ${provinces.length} provinces</span>
      </div>
      <div class="table-scroll">
        <table class="data" id="region-table">
          <thead><tr>
            <th class="sortable" data-key="name">Province ↕</th>
            <th class="sortable num" data-key="pop">Population (millions) ↕</th>
            <th class="sortable num" data-key="grdpPc">GRDP per capita (Rp million) ↕</th>
            <th class="sortable num" data-key="unemp">Unemployment ↕</th>
          </tr></thead>
          <tbody id="region-body"></tbody>
          <tfoot><tr>
            <td><strong>Indonesia</strong></td>
            <td class="num"><strong>${fmt(totalPop, 2)}</strong></td>
            <td class="num"><strong>78.6</strong></td>
            <td class="num"><strong>4.91%</strong></td>
          </tr></tfoot>
        </table>
      </div>
      ${sourceLine('BPS, provincial estimates 2024. Populations are rounded; the total may differ slightly from the national figure. GRDP per capita is nominal.')}
    </div>
    <div class="callout"><strong>Java holds 56% of the country.</strong> Six provinces on one island —
    West, Central and East Java, Jakarta, Banten and Yogyakarta — are home to about 157 million people,
    while the six Papuan provinces together hold about 6.3 million.</div>
    <div class="card">
      <h2>Five regions, five stories</h2>
      <p class="sub">The big picture behind the table.</p>
      <ul class="tight">
        <li><strong>Java:</strong> the centre of people and industry — 56% of the population, the three largest cities, and the lowest GRDP per capita gap is in Yogyakarta, not Jakarta.</li>
        <li><strong>Sumatra:</strong> 61.9 million people; Riau and the Riau Islands are rich in oil, gas and manufacturing, with GRDP per capita more than double the national average.</li>
        <li><strong>Kalimantan:</strong> 17.6 million people; East Kalimantan's GRDP per capita (Rp 271 million) is the second highest in the country, driven by coal and the new capital, Nusantara.</li>
        <li><strong>Sulawesi:</strong> 20.9 million people; Central Sulawesi's nickel boom has pushed its GRDP per capita to Rp 98.4 million.</li>
        <li><strong>Papua:</strong> six provinces, 6.3 million people, and the widest gaps — Highland Papua's GRDP per capita (Rp 22.4 million) is one-fourteenth of Jakarta's.</li>
      </ul>
    </div>`;

  const body = app.querySelector('#region-body');
  const count = app.querySelector('#region-count');
  const search = app.querySelector('#region-search');
  let sortKey = 'pop';
  let sortDir = -1;
  let query = '';

  function rows() {
    const q = query.trim().toLowerCase();
    const filtered = provinces.filter((p) => !q || p.name.toLowerCase().includes(q));
    const sorted = [...filtered].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'string') return sortDir * va.localeCompare(vb);
      return sortDir * (va - vb);
    });
    body.innerHTML = sorted.map((p) => `<tr><td>${p.name}</td><td class="num">${fmt(p.pop, 2)}</td><td class="num">${fmt(p.grdpPc, 1)}</td><td class="num">${fmt(p.unemp, 1)}%</td></tr>`).join('') ||
      `<tr><td colspan="4">No province matches your search. Try another search.</td></tr>`;
    count.textContent = `${sorted.length} of ${provinces.length} provinces`;
  }
  rows();
  search.addEventListener('input', () => { query = search.value; rows(); });
  app.querySelectorAll('#region-table th.sortable').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (sortKey === key) sortDir = -sortDir;
      else { sortKey = key; sortDir = key === 'name' ? 1 : -1; }
      rows();
    });
  });
}

export function viewNotFound(app) {
  app.innerHTML = `
    <div class="notfound">
      <h1>Page not found</h1>
      <p>That section of StatNusa does not exist. Try one of the sections below.</p>
      <p><a href="#/">Overview</a> · <a href="#/population">Population</a> · <a href="#/economy">Economy</a> ·
      <a href="#/employment">Employment</a> · <a href="#/prices">Prices</a> · <a href="#/regions">Regions</a></p>
    </div>`;
}
