"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
const stations_1 = require("./stations");
exports.MODULE = input => {
    let station = input.station;
    return new Promise((resolve, reject) => {
        resolve({
            status: module_1.Status.Ok,
            message: "",
            content: {
                stationNorth: stations_1.findNorth(station) || null,
                stationSouth: stations_1.findSouth(station) || null,
                trainNorth: Math.random() > .5 ? stations_1.StationTrainState.IsIn : stations_1.StationTrainState.JustLeft,
                trainSouth: Math.random() > .5 ? stations_1.StationTrainState.IsIn : stations_1.StationTrainState.JustLeft,
                etaNorth: Math.random() * 2,
                etaSouth: Math.random() * 2
            }
        });
    });
};
exports.default = exports.MODULE;
