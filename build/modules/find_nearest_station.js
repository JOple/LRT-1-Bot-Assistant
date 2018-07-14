"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder = __importStar(require("botbuilder"));
const stations_1 = require("./stations");
const bot_module_1 = require("./bot_module");
const ads_1 = require("./ads");
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
    locationConstraint: "Metro Manila, Philippines",
    adChance: 0.9,
    adRadius: 1200
};
exports.GMAPS_CLIENT = require('@google/maps').createClient({
    key: exports.CONFIG.google.maps.apiKey,
    Promise: require("promise")
});
function findNearestStation(place) {
    return exports.GMAPS_CLIENT.distanceMatrix({
        origins: [place + " " + exports.CONFIG.locationConstraint],
        destinations: stations_1.STATIONS.map(station => station.address),
        mode: exports.CONFIG.google.maps.distanceMatrix.mode,
        units: exports.CONFIG.google.maps.distanceMatrix.units
    }).asPromise().then(gres => {
        if (exports.CONFIG.debug) {
            console.log("GMaps Client DistanceMatrix Response:");
            console.log(JSON.stringify(gres, null, 4));
        }
        let json = gres.json;
        let origin = json.origin_addresses[0] + "";
        if (origin == "") {
            throw new Error("Please be specific on the location");
        }
        let elements = json.rows[0].elements;
        if (elements[0].status == "NOT_FOUND") {
            throw new Error("The location cannot be reached from any train stations");
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
        return {
            from: origin,
            distances: distances
        };
    }).catch(err => {
        if (exports.CONFIG.debug) {
            console.error(JSON.stringify(err, null, 4));
        }
        throw new Error("Oops! Something happened on our side\nPlease return later on.");
    });
}
exports.findNearestStation = findNearestStation;
class FindNearestStationModule extends bot_module_1.BotModule {
    constructor() {
        super("find_nearest_station", "Find Nearest Station", "find nearest station", "nearest station", "nearest");
    }
    generateDialog(context) {
        return [
            session => {
                builder.Prompts.text(session, 'This function finds the nearest station to a given place. What place?');
            },
            (session, results) => {
                findNearestStation(results.response)
                    .then(out => {
                    session.send(`The nearest LRT-1 station to the address ${out.from} is the ${out.distances[0].station.longName} \
                        which is ${out.distances[0].distanceText} away`);
                    ads_1.provideAds(session, out.from, exports.CONFIG.adRadius, exports.CONFIG.adChance);
                    session.replaceDialog("none");
                })
                    .catch(err => {
                    session.send(err.message);
                    session.replaceDialog("none");
                });
            }
        ];
    }
}
exports.FindNearestStationModule = FindNearestStationModule;
exports.INSTANCE = new FindNearestStationModule();
