// Chess Dashboard JavaScript

// Data from the provided JSON
const chessData = {
  "countries": [
    {"Country": "United States", "Average_Rating": 2729, "Top10_Players": 12, "Total_GMs": 101, "Population_Millions": 323.1},
    {"Country": "India", "Average_Rating": 2725, "Top10_Players": 10, "Total_GMs": 82, "Population_Millions": 1380.0},
    {"Country": "China", "Average_Rating": 2673, "Top10_Players": 6, "Total_GMs": 53, "Population_Millions": 1439.3},
    {"Country": "Russia", "Average_Rating": 2653, "Top10_Players": 6, "Total_GMs": 256, "Population_Millions": 145.9},
    {"Country": "Germany", "Average_Rating": 2631, "Top10_Players": 4, "Total_GMs": 118, "Population_Millions": 83.8},
    {"Country": "Ukraine", "Average_Rating": 2631, "Top10_Players": 3, "Total_GMs": 108, "Population_Millions": 44.0},
    {"Country": "France", "Average_Rating": 2629, "Top10_Players": 4, "Total_GMs": 49, "Population_Millions": 65.3},
    {"Country": "Azerbaijan", "Average_Rating": 2626, "Top10_Players": 3, "Total_GMs": 26, "Population_Millions": 10.1},
    {"Country": "Hungary", "Average_Rating": 2622, "Top10_Players": 4, "Total_GMs": 48, "Population_Millions": 9.7},
    {"Country": "Netherlands", "Average_Rating": 2619, "Top10_Players": 4, "Total_GMs": 34, "Population_Millions": 17.4},
    {"Country": "Spain", "Average_Rating": 2614, "Top10_Players": 4, "Total_GMs": 52, "Population_Millions": 46.8},
    {"Country": "Armenia", "Average_Rating": 2612, "Top10_Players": 4, "Total_GMs": 40, "Population_Millions": 3.0},
    {"Country": "Uzbekistan", "Average_Rating": 2599, "Top10_Players": 5, "Total_GMs": 11, "Population_Millions": 33.9},
    {"Country": "Poland", "Average_Rating": 2593, "Top10_Players": 0, "Total_GMs": 40, "Population_Millions": 37.8},
    {"Country": "Norway", "Average_Rating": 2593, "Top10_Players": 3, "Total_GMs": 11, "Population_Millions": 5.4},
    {"Country": "England", "Average_Rating": 2590, "Top10_Players": 4, "Total_GMs": 35, "Population_Millions": 56.3},
    {"Country": "Israel", "Average_Rating": 2586, "Top10_Players": 0, "Total_GMs": 41, "Population_Millions": 9.4},
    {"Country": "Serbia", "Average_Rating": 2570, "Top10_Players": 3, "Total_GMs": 49, "Population_Millions": 8.9},
    {"Country": "Turkey", "Average_Rating": 2566, "Top10_Players": 0, "Total_GMs": 8, "Population_Millions": 84.3},
    {"Country": "Romania", "Average_Rating": 2565, "Top10_Players": 0, "Total_GMs": 19, "Population_Millions": 19.3}
  ],
  "top_players": [
    {"Rank": 1, "Name": "Magnus Carlsen", "Country": "Norway", "Rating": 2839},
    {"Rank": 2, "Name": "Hikaru Nakamura", "Country": "United States", "Rating": 2807},
    {"Rank": 3, "Name": "Fabiano Caruana", "Country": "United States", "Rating": 2784},
    {"Rank": 4, "Name": "R Praggnanandhaa", "Country": "India", "Rating": 2779},
    {"Rank": 5, "Name": "Arjun Erigaisi", "Country": "India", "Rating": 2776},
    {"Rank": 6, "Name": "Gukesh Dommaraju", "Country": "India", "Rating": 2776},
    {"Rank": 7, "Name": "Nodirbek Abdusattorov", "Country": "Uzbekistan", "Rating": 2771},
    {"Rank": 8, "Name": "Alireza Firouzja", "Country": "France", "Rating": 2766},
    {"Rank": 9, "Name": "Wei Yi", "Country": "China", "Rating": 2748},
    {"Rank": 10, "Name": "Anish Giri", "Country": "Netherlands", "Rating": 2748},
    {"Rank": 11, "Name": "Shakhriyar Mamedyarov", "Country": "Azerbaijan", "Rating": 2746},
    {"Rank": 12, "Name": "Wesley So", "Country": "United States", "Rating": 2745},
    {"Rank": 13, "Name": "Viswanathan Anand", "Country": "India", "Rating": 2743},
    {"Rank": 14, "Name": "Ian Nepomniachtchi", "Country": "Russia", "Rating": 2742},
    {"Rank": 15, "Name": "Levon Aronian", "Country": "United States", "Rating": 2742},
    {"Rank": 16, "Name": "Vladimir Fedoseev", "Country": "Russia", "Rating": 2739},
    {"Rank": 17, "Name": "Leinier Domínguez Pérez", "Country": "Cuba", "Rating": 2738},
    {"Rank": 18, "Name": "Maxime Vachier-Lagrave", "Country": "France", "Rating": 2736},
    {"Rank": 19, "Name": "Hans Niemann", "Country": "United States", "Rating": 2736},
    {"Rank": 20, "Name": "Ding Liren", "Country": "China", "Rating": 2734}
  ]
};

// Country flag emojis
const countryFlags = {
  "United States": "🇺🇸",
  "India": "🇮🇳",
  "China": "🇨🇳",
  "Russia": "🇷🇺",
  "Germany": "🇩🇪",
  "Ukraine": "🇺🇦",
  "France": "🇫🇷",
  "Azerbaijan": "🇦🇿",
  "Hungary": "🇭🇺",
  "Netherlands": "🇳🇱",
  "Spain": "🇪🇸",
  "Armenia": "🇦🇲",
  "Uzbekistan": "🇺🇿",
  "Poland": "🇵🇱",
  "Norway": "🇳🇴",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Israel": "🇮🇱",
  "Serbia": "🇷🇸",
  "Turkey": "🇹🇷",
  "Romania": "🇷🇴",
  "Cuba": "🇨🇺"
};

// Global state
let currentSort = { column: null, direction: 'asc' };
let filteredCountries = [...chessData.countries];
let currentActiveTab = 'countries';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing chess dashboard...');
  
  try {
    initializeTabs();
    calculateStatistics();
    populateCountriesTable();
    setupSorting();
    setupSearch();
    populatePlayersGrid();
    populateCountryFilter();
    setupExportButton();
    console.log('Dashboard initialization complete');
  } catch (error) {
    console.error('Error initializing dashboard:', error);
  }
});

// Tab Management
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.nav__tab');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length === 0) {
    console.error('No tab buttons found');
    return;
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetTab = this.getAttribute('data-tab');
      console.log('Switching to tab:', targetTab);
      
      if (targetTab === currentActiveTab) {
        return; // Already active
      }
      
      // Remove active class from all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('nav__tab--active'));
      tabContents.forEach(content => content.classList.remove('tab-content--active'));
      
      // Add active class to clicked tab
      this.classList.add('nav__tab--active');
      
      // Show corresponding content
      const targetContent = document.getElementById(`${targetTab}-tab`);
      if (targetContent) {
        targetContent.classList.add('tab-content--active');
        currentActiveTab = targetTab;
        console.log('Tab switched successfully to:', targetTab);
      } else {
        console.error('Target tab content not found:', `${targetTab}-tab`);
      }
    });
  });
}

// Countries Table
function populateCountriesTable() {
  const tbody = document.getElementById('countries-tbody');
  if (!tbody) {
    console.error('Countries table body not found');
    return;
  }

  tbody.innerHTML = '';

  filteredCountries.forEach((country, index) => {
    const gmsPerMillion = (country.Total_GMs / country.Population_Millions).toFixed(2);
    const ratingClass = getRatingClass(country.Average_Rating);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="rank-cell">${index + 1}</td>
      <td class="country-cell">${countryFlags[country.Country] || '🏳️'} ${country.Country}</td>
      <td class="rating-cell ${ratingClass}">${country.Average_Rating}</td>
      <td>${country.Top10_Players}</td>
      <td>${country.Total_GMs.toLocaleString()}</td>
      <td>${gmsPerMillion}</td>
    `;
    
    // Add tooltip event listeners
    row.addEventListener('mouseenter', function(e) {
      showTooltip(e, country);
    });
    
    row.addEventListener('mouseleave', function() {
      hideTooltip();
    });
    
    tbody.appendChild(row);
  });
}

function getRatingClass(rating) {
  if (rating >= 2650) return 'rating-high';
  if (rating >= 2600) return 'rating-medium';
  return 'rating-low';
}

// Sorting functionality
function setupSorting() {
  const sortableHeaders = document.querySelectorAll('[data-sort]');
  
  sortableHeaders.forEach(header => {
    header.addEventListener('click', function(e) {
      e.preventDefault();
      const column = this.getAttribute('data-sort');
      console.log('Sorting by column:', column);
      sortTable(column);
    });
  });
}

function sortTable(column) {
  if (!column) return;
  
  const direction = currentSort.column === column && currentSort.direction === 'asc' ? 'desc' : 'asc';
  currentSort = { column, direction };
  
  // Update visual indicators
  document.querySelectorAll('[data-sort]').forEach(header => {
    header.classList.remove('sort-asc', 'sort-desc');
    if (header.getAttribute('data-sort') === column) {
      header.classList.add(`sort-${direction}`);
    }
  });
  
  // Sort the filtered countries array
  filteredCountries.sort((a, b) => {
    let aValue, bValue;
    
    switch (column) {
      case 'rank':
        aValue = chessData.countries.findIndex(c => c.Country === a.Country) + 1;
        bValue = chessData.countries.findIndex(c => c.Country === b.Country) + 1;
        break;
      case 'country':
        aValue = a.Country.toLowerCase();
        bValue = b.Country.toLowerCase();
        break;
      case 'rating':
        aValue = a.Average_Rating;
        bValue = b.Average_Rating;
        break;
      case 'top10':
        aValue = a.Top10_Players;
        bValue = b.Top10_Players;
        break;
      case 'gms':
        aValue = a.Total_GMs;
        bValue = b.Total_GMs;
        break;
      case 'efficiency':
        aValue = a.Total_GMs / a.Population_Millions;
        bValue = b.Total_GMs / b.Population_Millions;
        break;
      default:
        return 0;
    }
    
    if (typeof aValue === 'string') {
      return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return direction === 'asc' ? aValue - bValue : bValue - aValue;
  });
  
  // Repopulate table with sorted data
  populateCountriesTable();
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('country-search');
  if (!searchInput) {
    console.error('Search input not found');
    return;
  }

  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    console.log('Searching for:', searchTerm);
    
    if (searchTerm === '') {
      filteredCountries = [...chessData.countries];
    } else {
      filteredCountries = chessData.countries.filter(country =>
        country.Country.toLowerCase().includes(searchTerm)
      );
    }
    
    console.log('Filtered countries:', filteredCountries.length);
    populateCountriesTable();
  });
}

// Players functionality
function populatePlayersGrid() {
  const grid = document.getElementById('players-grid');
  if (!grid) {
    console.error('Players grid not found');
    return;
  }

  grid.innerHTML = '';

  chessData.top_players.forEach(player => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <div class="player-card__header">
        <div class="player-rank">#${player.Rank}</div>
      </div>
      <div class="player-name">${player.Name}</div>
      <div class="player-country">
        <span class="player-flag">${countryFlags[player.Country] || '🏳️'}</span>
        <span>${player.Country}</span>
      </div>
      <div class="player-rating">${player.Rating}</div>
    `;
    
    // Add tooltip event listeners
    card.addEventListener('mouseenter', function(e) {
      showPlayerTooltip(e, player);
    });
    
    card.addEventListener('mouseleave', function() {
      hideTooltip();
    });
    
    grid.appendChild(card);
  });
}

function populateCountryFilter() {
  const filter = document.getElementById('country-filter');
  if (!filter) {
    console.error('Country filter not found');
    return;
  }

  const countries = [...new Set(chessData.top_players.map(p => p.Country))].sort();
  
  filter.innerHTML = '<option value="">All Countries</option>';
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = `${countryFlags[country] || '🏳️'} ${country}`;
    filter.appendChild(option);
  });
  
  filter.addEventListener('change', function() {
    const selectedCountry = this.value;
    filterPlayersByCountry(selectedCountry);
  });
}

function filterPlayersByCountry(selectedCountry) {
  const grid = document.getElementById('players-grid');
  if (!grid) return;
  
  const cards = grid.querySelectorAll('.player-card');
  
  cards.forEach((card, index) => {
    const player = chessData.top_players[index];
    if (!selectedCountry || player.Country === selectedCountry) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Tooltip functionality
function showTooltip(event, country) {
  const tooltip = document.getElementById('tooltip');
  if (!tooltip) return;

  const gmsPerMillion = (country.Total_GMs / country.Population_Millions).toFixed(2);
  
  tooltip.querySelector('.tooltip__content').innerHTML = `
    <strong>${country.Country}</strong><br>
    Population: ${country.Population_Millions.toFixed(1)}M<br>
    GM Density: ${gmsPerMillion} per million<br>
    Top 10 Players: ${country.Top10_Players}
  `;
  
  // Position tooltip
  tooltip.style.left = (event.pageX + 10) + 'px';
  tooltip.style.top = (event.pageY - 10) + 'px';
  tooltip.classList.add('show');
}

function showPlayerTooltip(event, player) {
  const tooltip = document.getElementById('tooltip');
  if (!tooltip) return;

  const countryData = chessData.countries.find(c => c.Country === player.Country);
  
  tooltip.querySelector('.tooltip__content').innerHTML = `
    <strong>${player.Name}</strong><br>
    World Rank: #${player.Rank}<br>
    Country: ${player.Country}<br>
    ${countryData ? `Country Avg: ${countryData.Average_Rating}` : ''}
  `;
  
  // Position tooltip
  tooltip.style.left = (event.pageX + 10) + 'px';
  tooltip.style.top = (event.pageY - 10) + 'px';
  tooltip.classList.add('show');
}

function hideTooltip() {
  const tooltip = document.getElementById('tooltip');
  if (tooltip) {
    tooltip.classList.remove('show');
  }
}

// Statistics
function calculateStatistics() {
  const totalGMs = chessData.countries.reduce((sum, country) => sum + country.Total_GMs, 0);
  const top10Countries = chessData.countries.slice(0, 10);
  const avgRatingTop10 = Math.round(top10Countries.reduce((sum, country) => sum + country.Average_Rating, 0) / 10);
  
  const elements = {
    totalCountries: document.getElementById('total-countries'),
    totalGms: document.getElementById('total-gms'),
    avgTop10: document.getElementById('avg-top10')
  };
  
  if (elements.totalCountries) elements.totalCountries.textContent = chessData.countries.length;
  if (elements.totalGms) elements.totalGms.textContent = totalGMs.toLocaleString();
  if (elements.avgTop10) elements.avgTop10.textContent = avgRatingTop10.toLocaleString();
}

// Export functionality
function setupExportButton() {
  const exportBtn = document.querySelector('.export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      alert('Export functionality would download the current data as CSV/Excel file.');
    });
  }
}