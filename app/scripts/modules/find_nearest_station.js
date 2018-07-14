"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    pathVariable: "place",
    google: {
        maps: {
            apiKey: "AIzaSyBpERBr8CsN1Cs_atrlpiIUIrC9CV1tnd4"
        }
    },
    response: {
        status: "status",
        message: "message",
        data: "data"
    },
    debug: true,
    locationConstraint: "Metro Manila, Philippines"
};
exports.stations = [
    {
        shortName: "edsa",
        longName: "EDSA Station",
        address: "Taft Ave, Pasay, 1300 Metro Manila"
    },
    {
        shortName: "libertad",
        longName: "Libertad Station",
        address: "Antonio S. Arnaiz Ave, Pasay, Metro Manila"
    },
    {
        shortName: "gil_puyat",
        longName: "Gil Puyat Station",
        address: "2741 Taft Ave Pasay City, Pasay, Metro Manila"
    },
    {
        shortName: "vito_cruz",
        longName: "Vito Cruz Station",
        address: "14.563433, 120.994818"
    }
    // {
    //     shortName: "quirino",
    //     longName: "Quirino Station",
    //     address: ""
    // },
    // {
    //     shortName: "pedro_gil",
    //     longName: "Pedro Gil Station",
    //     address: ""
    // }
];
exports.gmaps = require('@google/maps').createClient({
    key: exports.config.google.maps.apiKey,
    Promise: require("promise")
});
function sendJson(res, code, message, data) {
    let json = {};
    json[exports.config.response.status] = code;
    json[exports.config.response.message] = message;
    json[exports.config.response.data] = data;
    res.status(code);
    res.json(json);
}
let handler = (req, res) => {
    let place = req.query[exports.config.pathVariable];
    console.log(JSON.stringify(req.query, null, 4));
    if (place) {
        exports.gmaps.distanceMatrix({
            origins: [place + " " + exports.config.locationConstraint],
            destinations: exports.stations.map(station => station.address),
            mode: "walking",
            units: "metric"
        })
            .asPromise()
            .then(gres => {
            console.log(JSON.stringify(gres, null, 4));
            let json = gres.json;
            let origin = json.origin_addresses[0];
            if (origin == "") {
                sendJson(res, 409, "Location not specific enough", {
                    from: origin,
                    distances: []
                });
                return;
            }
            let elements = json.rows[0].elements;
            if (elements[0].status == "NOT_FOUND") {
                sendJson(res, 404, "Path not found", {
                    from: origin,
                    distances: []
                });
                return;
            }
            let distances = elements
                .map((elem, index) => {
                return {
                    debug_actualStationAddress: exports.config.debug ? json.destination_addresses[index] : undefined,
                    station: exports.stations[index],
                    distance: elem.distance.value,
                    distanceText: elem.distance.text
                };
            })
                .sort((a, b) => {
                return a.distance - b.distance;
            });
            sendJson(res, 200, "Ok", {
                from: origin,
                distances: distances
            });
        })
            .catch(err => {
            console.log(JSON.stringify(err, null, 4));
            sendJson(res, 500, "Internal Server Error", exports.config.debug ? err : undefined);
        });
    }
    else {
        sendJson(res, 400, "Bad Request, Parameter '" + exports.config.pathVariable + "' not found");
    }
};
const mod = {
    method: "get",
    path: "/nearest_station",
    handler: handler
};
exports.default = mod;
