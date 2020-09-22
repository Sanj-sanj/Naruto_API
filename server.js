const express = require('express');
const app = express();
const cors = require('cors')

const URL = 'https://raw.githubusercontent.com/Sanj-sanj/DoYouEvenType/master/scripts/naruto_passages2.json';

const port = process.env.PORT || 3200;
const passage = require('./public/app')

app.use(cors())

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    passage().then(resp => {res.json(resp)})
    
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:` + port)
})