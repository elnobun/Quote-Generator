// DOM
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

/*Get quote from API*/
const getQuoteFromAPI = async () => {
  showLoadingSpinner();
  // Fix CORS
  //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const quote = data[Math.floor(Math.random() * data.length)];
    // reduce fontsize for long quotes
    if (quote.text.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    // set empty author fields to anonymous
    if (quote.author === "" || quote.author === null) {
      authorText.textContent = "- Anonymous";
    } else {
      authorText.textContent = `- ${quote.author}`;
    }
    quoteText.textContent = quote.text;
    //  stop loader and show quote
    removeLoadingSpinner();
  } catch (e) {
    // get a new quote if you hit an error
    console.log("Sorry, no quote", e);
  }
};

/* Tweet Quote */
const tweetQuote = () => {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", getQuoteFromAPI);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuoteFromAPI();
