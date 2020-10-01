const axios = require('axios');
const URL = 'https://raw.githubusercontent.com/Sanj-sanj/Naruto_API/master/passages/naruto_passages2.json';

const fetchAllQuotes = async () => {
    try {
        const quotes = await axios.get(URL);
        return quotes;
    }
    catch(err) {
        console.log(err)
    }
}

async function fetchByID(searchID, range, searchParam) {
    let error = 'Invalid search parameters.'
    let quote;    
    const res = await fetchAllQuotes();
    let statusCode = res.status;
    
    const passages = res.data.map(passage => passage)
    const found = passages.find(character => {
        return character.find(quoteByIdentifier)
    })
    
    function quoteByIdentifier(search) {
        if( search._id == searchID || search.quoteAuthor.split(' ')[0] == searchID ) {
            quote = search
            return search
        }
    }

    //user searches for specific quotes either indicating a spevific range EX: 1-4 or single quote EX: 5.
    if(found && searchParam && range){ 
        if(searchParam.length == 2 || range == 'all'){
            //if they search for quotes/3-1 or all/1-3 it will return a 400 error.
            if(  range == 'all' || Number(searchParam[0]) > Number(searchParam[1]) ) {
                statusCode = 400
                return {statusCode, error}
            }
            //this checks based on the function's [i] to the id which is why i+1.
            quote = found.filter(function getbyRange(val, i, arr) {
                if( i + 1 >= Number(searchParam[0]) && i + 1 <= Number(searchParam[1]) ) {
                    return quote = checkForJPN(val)
                }
            })
        }
        //Search for a single quote using id
        if(searchParam.length == 1) {
            quote = found.filter(currQuote => currQuote.id == Number(searchParam[0])).map(function checkForId(quote) {
                return quote = checkForJPN(quote)
            })
            //If no entry was found
            if(quote[0] == null) {
                Number.isInteger(Number(searchParam[0])) ? (statusCode = 404, error = 'Entry not found.') : statusCode = 400;
                return { statusCode, error }
            }
        }
        return { statusCode, quote }
    }

    if(found && range != 'all') {
        //user searches for a single quote by _id or by name 
        quote = checkForJPN(quote);
        return { statusCode, quote }
    }
    if(found && range == 'all' && searchParam == null) {
        //user searches for all quotes by _id or by name
        const quotes = found.map(function checkAllQuotes(quote) {
            return checkForJPN(quote)
        });
        return { statusCode, quotes }
    }

    statusCode = 404
    error = 'Entry not found.'
    return { statusCode, error }
}
//just fetches a random quote 
//Function expression works, decleration does not resolve promise
const fetchRandomQuote = async () => {
    try {
        const res = await fetchAllQuotes();
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

module.exports = { fetchRandomQuote, fetchAllQuotes, fetchByID };