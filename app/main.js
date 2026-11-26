// StatNusa router — hash routes, one page each. The app element is re-rendered
// on every hash change; window.__shotReady tells a screenshot script when the
// page (including its canvas charts) is on screen.
//
//   #/                overview
//   #/population      population
//   #/economy         economy
//   #/employment      employment
//   #/prices          prices
//   #/regions         regions

import {
  viewOverview, viewPopulation, viewEconomy, viewEmployment, viewPrices,
  viewRegions, viewNotFound,
} from './views.js';

const app = document.getElementById('app');

const routes = {
  '': viewOverview,
  population: viewPopulation,
  economy: viewEconomy,
  employment: viewEmployment,
  prices: viewPrices,
  regions: viewRegions,
};

const titles = {
  '': 'StatNusa — Indonesia in Numbers',
  population: 'Population | StatNusa',
  economy: 'Economy | StatNusa',
  employment: 'Employment | StatNusa',
  prices: 'Prices | StatNusa',
  regions: 'Regions | StatNusa',
};

function render() {
  window.__shotReady = false;
  const page = (location.hash.match(/^#\/([^/?#]*)/) || [])[1] || '';
  const view = routes[page] || viewNotFound;
  view(app);
  document.title = titles[page] || 'Page not found | StatNusa';
  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === (page || 'overview'));
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
window.addEventListener('resize', () => {
  // Redraw the current page so canvas charts fit the new width.
  render();
});
render();
