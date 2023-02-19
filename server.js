//npm test to start

const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const routerDatabase = require("./routers/database.js")
//const cors = require('cors')

//app.use(cors())
const cors = require('cors')({origin: true});

app.use(bodyParser.json());
// Express modules / packages

app.use(bodyParser.urlencoded({ extended: true }));
// Express modules / packages

app.use(express.static('public'));
// load the files that are in the public directory

// Routers
app.use(routerDatabase, (req, res) => {
  return res;
})

// Home Page
app.get('/', (req, res) => {
  res.sendFile('./public/index.html')
})

// Start Server
app.listen(port, () => { // Listen on port 3000
  console.log('Listening!') // Log when listen success
})






