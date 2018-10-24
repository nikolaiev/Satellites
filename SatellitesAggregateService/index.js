const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 8089;
const aggregateObj = {};

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Pass to next layer of middleware
    next();
});

app.get("/satellites/", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(collapseSatellitesData()));
});

app.get("/satellite/:satlName/", (req, res) => {
    const satlName = req.params.satlName;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(findObjectByName(satlName)));
});

app.post("/monitoring/", (req, res) => {
    aggregateObj[req.body.serviceId] = req.body.data;
    res.sendStatus(200);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Aggregate Satellites Server is listening on port ${PORT}`);
    }
});

function findObjectByName(satlName) {
    return collapseSatellitesData().find((val, index) => {
        console.log(val.id)
        return val.id === satlName;
    });
}

function collapseSatellitesData() {
    let result = [];
    for (let serviceId in aggregateObj) {
        let satellitesData = aggregateObj[serviceId]; //array
        result = [...result, ...satellitesData];
    }
    return result;
}
