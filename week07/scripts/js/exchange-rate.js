// Replace 'YOUR_API_KEY_HERE' with your Open Exchange Rates API key.
const API_KEY = '6077974f7df346119b64b8372ea16b45';
const EXCHANGE_RATE_API_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;

// Function to fetch and display exchange rates
async function fetchExchangeRates() {
    const resultsContainer = document.getElementById('exchange-rate-results');
    resultsContainer.innerHTML = '<p>Fetching exchange rate data...</p>';

    // Check if the API key is set
    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        resultsContainer.innerHTML = '<p>Please set your API key in the `exchange-rate.js` file.</p>';
        return;
    }

    try {
        const response = await fetch(EXCHANGE_RATE_API_URL);
        const data = await response.json();

        // Check if the API response was successful
        if (response.ok) {
            displayExchangeRates(data.rates);
        } else {
            // Handle API errors
            resultsContainer.innerHTML = `<p>Error fetching exchange rates: ${data.description || 'Unknown error'}</p>`;
        }
    } catch (error) {
        // Handle connection errors
        resultsContainer.innerHTML = `<p>Connection error: Unable to fetch exchange rates. Please check your internet connection.</p>`;
        console.error('Error in exchange rate API request:', error);
    }
}

// Function to render exchange rates on the page
function displayExchangeRates(rates) {
    const resultsContainer = document.getElementById('exchange-rate-results');
    resultsContainer.innerHTML = ''; // Clear previous content

    let htmlContent = '<ul class="list-group">';
    
    // List of currencies you want to display. Add or remove as needed.
    const desiredCurrencies = ['USD', 'BRL', 'EUR', 'GBP', 'JPY', 'CAD'];

    desiredCurrencies.forEach(currency => {
        if (rates[currency]) {
            const rate = rates[currency];
            const baseCurrency = rates['USD'] ? 'USD' : 'Unknown Base Currency';

            htmlContent += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    1 ${baseCurrency} = ${rate.toFixed(4)} ${currency}
                </li>
            `;
        }
    });

    htmlContent += '</ul>';

    resultsContainer.innerHTML = htmlContent;
}

// Event listener to call the function when the button is clicked
document.getElementById('exchange-rate-button').addEventListener('click', () => {
    fetchExchangeRates();
});