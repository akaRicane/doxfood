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
    const spot = JSON.parse(req.query["spot"]);
    console.log(spot);
    const timestamp = Date.now();
    restaurantsdb.insert({ "timestamp": timestamp, "restaurant": spot });
    res.json("Success");
});

APP.get("/list", (req, res) => {
    console.log("\nNew request to load restaurantsdb");
    restaurantsdb.find({}, (err, docs) => {
        if (docs.length !== 0) {
            const restaurantsList = docs;
            console.log("Restaurantsdb loading is done ! (found: " + restaurantsList.length + ")\n");
            res.json({ "list": restaurantsList });
        }
    })
});

APP.get("/edit", (req, res) => {
    console.log("\nNew request to edit a restaurant");
    const spotId = req.query["id"];
    const spot = JSON.parse(req.query["spot"]);
    console.log(spot)
    const timestamp = Date.now();
    restaurantsdb.update({ "_id": spotId}, {"timestamp": timestamp, "restaurant": spot }, {}, function (err, numReplaced) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(numReplaced)
            res.json("Success");
        }
    });
});

APP.get("/fetch", (req, res) => {
    console.log("\nNew request to fetch infos of a restaurant");
    console.log('Fetching: ' + req.query["id"]);
    restaurantsdb.find({ _id: req.query["id"]}, (err, docs) => {
        if (docs.length !== 0) {
            const infos = docs.at(-1);
            console.log("Restaurant infos fetch is done ! (found: " + infos.restaurant.name + ")\n");
            res.json(infos);
        }
    })
});

const server = https.createServer({
    key: fs.readFileSync(`${__dirname}/localhost-key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/localhost.pem`, 'utf8')
}, APP);

server.listen(PORT, () => { console.log("Express.js server listening on PORT: " + PORT) });
