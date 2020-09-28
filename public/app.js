const axios = require('axios');

const URL = 'https://raw.githubusercontent.com/Sanj-sanj/Naruto_API/master/passages/naruto_passages2.json';

let quote;

const fetchAllQuotes = async () => {
    try {
        const res = await axios.get(URL);
        const statusCode = res.status
        return res;
    }
    catch(err) {
        console.log(err)
    }
}

async function fetchByID(id) {
    let res = await fetchAllQuotes();
    let statusCode = res.status;
    let passages = res.data.map(passage => passage)
    let found = passages.find(character => {
        return character.find( search => {
            if(search._id == id) {
                quote = search
                return search
            }
        })
    })
    if(found) {
        return checkForJPN(statusCode)
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
        const randomCharacter = res.data[Math.floor(Math.random() * res.data.length)];
        quote = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
        return checkForJPN(res.status);
    }
    catch (err){
        console.log(`There was an issue. ${err}`)
        const errStatus = err.response.status
        const errText = err.response.statusText
        return { errText, errStatus }
    }
}

function checkForJPN(statusCode) {
    const regexp = /[(「].+/g
    if(regexp.test(quote.quoteText)) {
        console.log('includes jpn to be cut')
        quote.quoteText = quote.quoteText.replace(regexp, '')
        quote.quoteText = quote.quoteText.slice(0, quote.quoteText.length - 2) //removes trailing white space and ". 
    }
    console.log('Working app.js')
    return { statusCode, quote }
}

module.exports = {fetchRandomQuote, fetchAllQuotes, fetchByID};
