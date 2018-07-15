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
const send_cards_1 = require("../utils/send_cards");
const ads_1 = require("./ads");
exports.CONFIG = {
    stationThreshold: 0.4,
    adChance: 0.7,
    adRadius: 1200
};
function computeTicketCost(from, to) {
    return {
        from: from,
        to: to,
        costBeep: stations_1.fairCost(from, to, true),
        costReg: stations_1.fairCost(from, to, false)
    };
}
exports.computeTicketCost = computeTicketCost;
function findLandmarks(station) {
    return stations_1.LANDMARKS.get(station) || [];
}
exports.findLandmarks = findLandmarks;
function operatingHours() {
    return {
        from: "4:30 am",
        to: "10:15 pm"
    };
}
exports.operatingHours = operatingHours;
class FareCostModule extends bot_module_1.BotModule {
    constructor() {
        super("fare_cost", "Fare Cost", "ticket cost", "fair cost", "fare cost", "fare");
    }
    generateDialog(context) {
        let output = {
            from: stations_1.StationName.baclaran,
            to: stations_1.StationName.roosevelt
        };
        return [
            session => {
                builder.Prompts.text(session, 'This function computes the fare cost for an LRT-1 travel. From what station will you originate from?');
                send_cards_1.sendCards(session, "Origin Station", stations_1.STATION_ORDER_LONG);
            },
            (session, results) => {
                output.from = stations_1.findStation(results.response, exports.CONFIG.stationThreshold)[0];
                if (!output.from) {
                    session.send("I cannot deduce the station where you came from. Please try again!");
                    session.replaceDialog("none");
                    return;
                }
                builder.Prompts.text(session, 'To what station will you disembark?');
                send_cards_1.sendCards(session, "Destination Station", stations_1.STATION_ORDER_LONG);
            },
            (session, results) => {
                output.to = stations_1.findStation(results.response, exports.CONFIG.stationThreshold)[0];
                if (!output.to) {
                    session.send("I cannot deduce the station where you will disembark. Please try again!");
                    session.replaceDialog("none");
                    return;
                }
                ads_1.provideAds(session, stations_1.lookStation(output.from).address, exports.CONFIG.adRadius, exports.CONFIG.adChance);
                ads_1.provideAds(session, stations_1.lookStation(output.to).address, exports.CONFIG.adRadius, exports.CONFIG.adChance);
                let fair = computeTicketCost(output.from, output.to);
                session.send(`The fair from ${stations_1.lookStation(fair.from).longName} to ${stations_1.lookStation(fair.to).longName} is ${fair.costBeep} for Beep Card\
                    and ${fair.costReg} for Single-Journey Card`);
                session.replaceDialog("none");
            }
        ];
    }
}
exports.FareCostModule = FareCostModule;
exports.FARECOST = new FareCostModule();
class LandmarksModule extends bot_module_1.BotModule {
    constructor() {
        super("landmarks", "Famous Destinations", "landmarks", "famout destinations", "places of interest");
    }
    generateDialog(context) {
        return [
            session => {
                builder.Prompts.text(session, 'This functions tells the different landmarks and famous places near a specific station. What station?');
                send_cards_1.sendCards(session, "Station", stations_1.STATION_ORDER_LONG);
            },
            (session, results) => {
                let station = stations_1.findStation(results.response, exports.CONFIG.stationThreshold)[0];
                if (!station) {
                    session.send("I cannot deduce the station where you want to know more about famous places. Please try again!");
                    session.replaceDialog("none");
                    return;
                }
                let pois = stations_1.landmarks(station);
                session.send(`From ${stations_1.lookStation(station).longName} you could visit the places: ${pois.join(", ")}`);
                ads_1.provideAds(session, stations_1.lookStation(station).address, exports.CONFIG.adRadius, exports.CONFIG.adChance);
                session.replaceDialog("none");
            }
        ];
    }
}
exports.LandmarksModule = LandmarksModule;
exports.POIS = new LandmarksModule();
class OperatingHoursModule extends bot_module_1.BotModule {
    constructor() {
        super("operating_hours", "Operating Hours", "operating hours", "operation time");
    }
    generateDialog(context) {
        return session => {
            let oh = operatingHours();
            session.send(`LRT-1 is open from ${oh.from} to ${oh.to}`);
            session.replaceDialog("none");
        };
    }
}
exports.OperatingHoursModule = OperatingHoursModule;
exports.OPEN_HOURS = new OperatingHoursModule();
class StationListModule extends bot_module_1.BotModule {
    constructor() {
        super("list_of_station", "Station List", "list of stations");
    }
    generateDialog(context) {
        return session => {
            session.send(`LRT-1 stations (South to North):<br/> ${stations_1.STATIONS.map(s => s.longName).join(", <br/>")}`);
            session.replaceDialog("none");
        };
    }
}
exports.StationListModule = StationListModule;
exports.STATION_LIST = new StationListModule();
