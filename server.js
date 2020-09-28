const express = require('express');
const app = express();
const cors = require('cors')

const port = process.env.PORT || 3200;
const getPassage = require('./public/app')

app.use(cors())

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index.html')
})

app.get('/all', (req, res) => {
    const {id} = req.params
    try {
        getPassage.fetchAllQuotes()
        .then(passages => {
            res.status(200).json(passages.data)
        })
    } 
    catch(err) {
        console.log(err)
    }
})

app.get('/search:id', (req, res) => {
    let {id} = req.params;
    id = id.slice(1)
    try {
        getPassage.fetchByID(id)
            .then(quote => {
                res.status(200).json(quote)
            })
    }
     catch(err) {
         res.status(404).json({message: "That quote you are looking for does not exist."})
         console.log(err)
     }
})

app.get('/random', (req, res) => {
    //call the imported function to retrieve a quote
    //then get that response 
    try{
        getPassage.fetchRandomQuote()
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