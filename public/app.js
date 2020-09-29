const axios = require('axios');

const URL = 'https://raw.githubusercontent.com/Sanj-sanj/Naruto_API/master/passages/naruto_passages2.json';

// let quote;

const fetchAllQuotes = async () => {
    try {
        const quotes = await axios.get(URL);
        const statusCode = quotes.status
        return quotes;
    }
    catch(err) {
        console.log(err)
    }
}

async function fetchByID(id, all) {
    let quote;
    let res = await fetchAllQuotes();
    let statusCode = res.status;
    let passages = res.data.map(passage => passage)
    let found = passages.find(character => {
        if(all == 'all') {
            return character.find(search => search._id == id)
        }
        return character.find(quoteByID)
    })
    function quoteByID(search) {
        if(search._id == id) {
            quote = search
            return search
        }
    }
    if(found && all != 'all') {
        quote = checkForJPN(quote);
        return { statusCode, quote }
    }
    if(all == 'all') {
        const quotes = found.map(function checkAllQuotes(quote) {
           quote = checkForJPN(quote)
           return quote
        });
        return { statusCode, quotes }
    }
    statusCode = 404
    let error = 'Entry does not exist.'
    return { statusCode, error }
}

//just fetches a random quote 
//Function expression works, decleration does not resolve promise
const fetchRandomQuote = async () => {
    try {
        const res = await axios.get(URL);
        const statusCode = res.status
        const randomCharacter = res.data[Math.floor(Math.random() * res.data.length)];
        quote = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
        quote = checkForJPN(quote);
        return { statusCode, quote }
    }
    catch (err){
        console.log(`There was an issue. ${err}`)
        const errStatus = err.response.status
        const errText = err.response.statusText
        return { errText, errStatus }
    }
}

function checkForJPN(quote) {
    const regexp = /[(「].+/g
    if(regexp.test(quote.quoteText)) {
        console.log('includes jpn to be cut')
        quote.quoteText = quote.quoteText.replace(regexp, '')
        quote.quoteText = quote.quoteText.slice(0, quote.quoteText.length - 2) //removes trailing white space and ". 
    }
    return quote 
}

module.exports = {fetchRandomQuote, fetchAllQuotes, fetchByID};
