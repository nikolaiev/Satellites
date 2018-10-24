//DUMMY monitoring service
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser')

const apiPath = "http://localhost:8089/monitoring/";

const initArgs = process.argv.slice(2);
initArgs.push(8080); //set PORT as first param (if no already specified)
const PORT = initArgs[0];

const earthRadius = 6371000; //meters
const g = 9.8; //meters/second^2
let realCoeff = 180 / (Math.PI * earthRadius);

//INITIAL data
const satellitesObj = {
    serviceId: `MonitoringService ${PORT}`,
     data: [
    //     {id: "MySatellite1", lat: 10, lng: 10, height: 300000, cosX: 0.866, cosY: 2},
    //     {id: "MySatellite2", lat: 20, lng: 10, height: 300000, cosX: -0.866, cosY: 0.5},
    //     {id: "MySatellite3", lat: 10, lng: 52, height: 300000, cosX: 0.866, cosY: -0.5},
    //     {id: "MySatellite4", lat: 31, lng: 10, height: 300000, cosX: -0.866, cosY: -0.5},
    ]
};

app.use(bodyParser.json()); // for parsing application/json

sendSatellitesDataToAggregatorService();
calculateSatellitesPosition();

app.post("/create/", (req, res) => {
    satellitesObj.data.push(req.body);
    res.sendStatus(200);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Monitoring replica Satellites Server is listening on port ${PORT}`);
    }
});


//speed of movement
function getSpeed(height) {
    return Math.pow(g * (earthRadius + height), 0.5);
}


//length ot trajectory circle
function getCircleLength(height) {
    return 2 * Math.PI * (earthRadius + height);
}

function getProperLatitude(number) {
    let factor = 90;
    number = number > factor ? -factor +(number % factor) : number;
    number = number < -factor ? factor- (-number-factor): number;
    return number;
}

function getProperLongitude(number) {
    let factor = 180;
    number = number > factor ? -factor +(number % factor) : number;
    number = number < -factor ? factor- (-number-factor): number;
    return number;
}

function calculateSatellitesPosition() {
    //real-time calculation
    if(satellitesObj.data) {
        setInterval(() => {
            satellitesObj.data.forEach((sat, index) => {
                sat.speed = sat.speed ? sat.speed : getSpeed(sat.height);
                sat.circleLength = sat.circleLength ? sat.circleLength : getCircleLength(sat.height);
                sat.lat = getProperLatitude(sat.lat + realCoeff * sat.speed * sat.cosX / 4);
                sat.lng = getProperLongitude(sat.lng + realCoeff * sat.speed * sat.cosY / 4);
            })
        }, 250);
    }
}

function sendSatellitesDataToAggregatorService() {
//Dummy satellite information
    setInterval(() => {
        let options = {
            uri: apiPath,
            method: 'POST',
            json: satellitesObj
        };

        request(options, function (error, response, body) {
            if (error) {
                console.log(error) // Print the shortened url.
            }
        });
    }, 1000);
}
