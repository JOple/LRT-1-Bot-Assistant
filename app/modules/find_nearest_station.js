"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
const stations_1 = require("./stations");
exports.CONFIG = {
    google: {
        maps: {
            apiKey: "AIzaSyBpERBr8CsN1Cs_atrlpiIUIrC9CV1tnd4",
            distanceMatrix: {
                mode: "walking",
                units: "metric"
            }
        }
    },
    debug: true,
    locationConstraint: "Metro Manila, Philippines"
};
exports.GMAPS_CLIENT = require('@google/maps').createClient({
    key: exports.CONFIG.google.maps.apiKey,
    Promise: require("promise")
});
exports.MODULE = input => {
    return new Promise((resolve, reject) => {
        let place = input.place;
        if (!place) {
            reject({
                status: module_1.Status.BadInput,
                message: "Bad Request, Parameter 'place' not found",
                content: {
                    from: "",
                    distances: []
                }
            });
            return;
        }
        exports.GMAPS_CLIENT.distanceMatrix({
            origins: [place + " " + exports.CONFIG.locationConstraint],
            destinations: stations_1.STATIONS.map(station => station.address),
            mode: exports.CONFIG.google.maps.distanceMatrix.mode,
            units: exports.CONFIG.google.maps.distanceMatrix.units
        }).asPromise()
            .then(gres => {
            if (exports.CONFIG.debug) {
                console.log("GMaps Client DistanceMatrix Response:");
                console.log(JSON.stringify(gres, null, 4));
            }
            let json = gres.json;
            let origin = json.origin_addresses[0] + "";
            if (origin == "") {
                reject({
                    status: module_1.Status.CannotResolve,
                    message: "Location not specific enough",
                    errorContent: {
                        from: origin,
                        distances: []
                    }
                });
                return;
            }
            let elements = json.rows[0].elements;
            if (elements[0].status == "NOT_FOUND") {
                reject({
                    status: module_1.Status.NotFound,
                    message: "Path not found",
                    errorContent: {
                        from: origin,
                        distances: []
                    }
                });
                return;
            }
            let distances = elements
                .map((elem, index) => {
                return {
                    debug_actualStationAddress: exports.CONFIG.debug ? json.destination_addresses[index] : undefined,
                    station: stations_1.STATIONS[index],
                    distance: elem.distance.value,
                    distanceText: elem.distance.text
                };
            })
                .sort((a, b) => {
                return a.distance - b.distance;
            });
            resolve({
                status: module_1.Status.Ok,
                message: "Ok",
                content: {
                    from: origin,
                    distances: distances
                }
            });
        })
            .catch(err => {
            if (exports.CONFIG.debug) {
                console.log(JSON.stringify(err, null, 4));
            }
            reject({
                status: module_1.Status.InternalError,
                message: "Internal Server Error",
                errorContent: exports.CONFIG.debug ? err : undefined
            });
        });
    });
};
exports.default = exports.MODULE;
