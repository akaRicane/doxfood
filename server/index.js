const express = require("express");
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const Datastore = require('nedb');
const restaurantsdb = new Datastore('./restaurants.db');
restaurantsdb.loadDatabase();

const APP = express();
APP.use(cors());
const PORT = 3001;

APP.get("/", (req, res) => { console.log(req); res.send("This is from express"); });

APP.get("/create", (req, res) => {
    const spot = req.query["spot"]
    console.log(spot); 
    const timestamp = Date.now();
    restaurantsdb.insert({ timestamp: timestamp, restaurant: spot });
    res.json("Success");
});

const server = https.createServer({
    key: fs.readFileSync(`${__dirname}/localhost-key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/localhost.pem`, 'utf8')
}, APP);

server.listen(PORT, () => { console.log("Express.js server listening on PORT: " + PORT) });
