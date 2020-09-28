const express = require('express');
const app = express();
const cors = require('cors')

const URL = 'https://raw.githubusercontent.com/Sanj-sanj/Naruto_API/master/passages/naruto_passages2.json';

const port = process.env.PORT || 3200;
const passage = require('./public/app')

app.use(cors())

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //call the imported function to retrieve a quote
    //then get that response 
    try{
        passage()
        .then(quote => {
            res.status(200).json(quote)
        })
    }
    catch(err) {
        console.log(err)
    }    
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:` + port)
})