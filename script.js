const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function newQuote() {
    showLoadingSpinner()
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author field is blank and replace with unknown
    if(!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    // set quote, hide loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner()
}

// get quotes from API
async function getQuotes(){
    showLoadingSpinner()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        getQuotes();
    }
}

function postQuote() {
    const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl, '_blank');
}

// event listerners
newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', postQuote)

// on load
getQuotes();
// newQuote();
