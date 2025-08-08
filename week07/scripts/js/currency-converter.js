// Replace 'YOUR_API_KEY_HERE' with your actual key from exchangerate-api.com
const API_URL = `https://v6.exchangerate-api.com/v6/bd3e5d4584db5b6fdbda34cd/latest/USD`;

// Function to fetch and convert currency
async function convertCurrency() {
    const amount = document.getElementById('amount-to-convert').value;
    const fromCurrency = document.getElementById('from-currency').value.toUpperCase();
    const toCurrency = document.getElementById('to-currency').value.toUpperCase();
    const resultContainer = document.getElementById('conversion-result');

    resultContainer.innerHTML = '<p>Converting...</p>';

    if (!amount || !fromCurrency || !toCurrency) {
        resultContainer.innerHTML = '<p>Please fill in all fields.</p>';
        return;
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Check if the API request was successful
        if (data.result === 'success') {
            const rates = data.conversion_rates;

            // The free plan of this API uses USD as the base currency.
            // To convert from currency X to currency Y, we use the formula:
            // Value in Y = (Value in X / Rate of X to USD) * Rate of Y to USD
            
            const fromRate = rates[fromCurrency];
            const toRate = rates[toCurrency];

            if (fromRate && toRate) {
                const convertedValue = (amount / fromRate) * toRate;
                resultContainer.innerHTML = `
                    <p class="h4">
                        ${parseFloat(amount).toFixed(2)} ${fromCurrency} = 
                        ${convertedValue.toFixed(2)} ${toCurrency}
                    </p>
                `;
            } else {
                resultContainer.innerHTML = '<p>One or both of the currencies entered are invalid.</p>';
            }

        } else {
            // Handle specific API errors
            resultContainer.innerHTML = `<p>API Error: ${data['error-type'] || 'An unknown error occurred.'}</p>`;
        }

    } catch (error) {
        // Handle connection errors
        resultContainer.innerHTML = `<p>Connection error: Could not fetch exchange rates. Please check your internet connection.</p>`;
        console.error('Error in API request:', error);
    }
}

// Add the event listener to the convert button
document.getElementById('convert-button').addEventListener('click', convertCurrency);

// Add event listeners for the 'Enter' key in the input fields
document.getElementById('amount-to-convert').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        convertCurrency();
    }
});
document.getElementById('from-currency').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        convertCurrency();
    }
});
document.getElementById('to-currency').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        convertCurrency();
    }
});