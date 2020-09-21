const axios = require('axios');

const URL = 'https://raw.githubusercontent.com/Sanj-sanj/DoYouEvenType/master/scripts/naruto_passages2.json';

let quote;

axios.get(URL)
.then(res => {
    try {
        const randomCharacter = res.data[Math.floor(Math.random() * res.data.length)];
        quote = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
        // const testChar = res.data[11]
        // quote = testChar[0] //testing purposes
        // console.log(quote.quoteText)
        checkForJPN();
    }
    catch (err){
        console.log(err)
    }
    return quote
})


function checkForJPN() {
    const regexp = /[(「].+/g
        if(regexp.test(quote.quoteText)) {
            console.log('includes jpn to be cut')
            quote.quoteText = quote.quoteText.replace(regexp, '')
            quote.quoteText = quote.quoteText.slice(0, quote.quoteText.length - 2) //removes trailing white space and ". 
        }
    console.log({quote})
}