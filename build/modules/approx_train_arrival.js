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
exports.CONFIG = {
    minEta: 2,
    maxEta: 4,
    trainIsInBias: 0.5,
    stationThreshold: 0.4
};
function approxTrainArrival(station) {
    return new Promise((resolve, reject) => {
        let multiplier = exports.CONFIG.maxEta - exports.CONFIG.minEta;
        let etaNorth = Math.random() * multiplier + exports.CONFIG.minEta, etaSouth = Math.random() * multiplier + exports.CONFIG.minEta;
        resolve({
            stationNorth: stations_1.findNorth(station) || null,
            stationSouth: stations_1.findSouth(station) || null,
            trainNorth: Math.random() > exports.CONFIG.trainIsInBias ? stations_1.StationTrainState.IsIn : stations_1.StationTrainState.JustLeft,
            trainSouth: Math.random() > exports.CONFIG.trainIsInBias ? stations_1.StationTrainState.IsIn : stations_1.StationTrainState.JustLeft,
            etaNorth: etaNorth,
            etaSouth: etaSouth,
            etaNorthText: Math.floor(etaNorth) + " min. and " + Math.round((etaNorth - Math.floor(etaNorth)) * 60) + " seconds",
            etaSouthText: Math.floor(etaSouth) + " min. and " + Math.round((etaSouth - Math.floor(etaSouth)) * 60) + " seconds"
        });
    });
}
exports.approxTrainArrival = approxTrainArrival;
class ApproxTrainArrivalModule extends bot_module_1.BotModule {
    constructor() {
        super("approx_train_arrival", "Approx. Train Arrival", "approximate train arrival time", "approximate train arrival", "approximate arrival time", "approx train arrival time", "approx train arrival", "approx arrival time", "arrival time", "arrival");
    }
    generateDialog(context) {
        return [
            session => {
                builder.Prompts.text(session, 'This function estimates the arrival of the next train to a station.\nWhat station?');
                send_cards_1.sendCards(session, undefined, stations_1.STATION_ORDER_LONG);
            },
            (session, results) => {
                let station = stations_1.findStation(results.response, exports.CONFIG.stationThreshold)[0];
                if (!station) {
                    session.send("The station is not clear.");
                    return;
                }
                approxTrainArrival(station)
                    .then(out => {
                    session.send(`The train will arrive on ${stations_1.lookStation(station).longName}, ${out.etaNorthText} on Northbound,\
                            and ${out.etaSouthText} on Southbound`);
                    session.endDialog();
                })
                    .catch(err => {
                    session.send(err.message);
                    session.endDialog();
                });
            }
        ];
    }
}
exports.ApproxTrainArrivalModule = ApproxTrainArrivalModule;
exports.INSTANCE = new ApproxTrainArrivalModule();
