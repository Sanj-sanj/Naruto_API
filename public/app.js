const axios = require('axios');

const URL = 'https://raw.githubusercontent.com/Sanj-sanj/Naruto_API/master/passages/naruto_passages2.json';

let quote;

//just fetches a random quote 
//Function expression works, decleration does not resolve promise
const fetchData = async () => {
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

module.exports = fetchData;
