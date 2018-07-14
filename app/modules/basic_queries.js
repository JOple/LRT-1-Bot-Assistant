"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stations_1 = require("./stations");
const module_1 = require("./module");
exports.MODULE = (input) => {
    let from = input["from"], to = input["to"];
    return new Promise((resolve, reject) => {
        switch (input.faq) {
            case "ticket_cost":
                if (!from) {
                    reject({
                        status: module_1.Status.BadInput,
                        message: "The origin station is missing",
                        errorContent: {
                            missing: "from"
                        }
                    });
                    return;
                }
                if (!to) {
                    reject({
                        status: module_1.Status.BadInput,
                        message: "The destination station is missing",
                        errorContent: {
                            missing: "to"
                        }
                    });
                    return;
                }
                resolve({
                    status: module_1.Status.Ok,
                    message: "Ok",
                    content: {
                        reply: "The fair from " + stations_1.station(from).longName + " to " + stations_1.station(from).longName +
                            " is " + stations_1.fairCost(from, to, true) + " for Beep Card and" +
                            " is " + stations_1.fairCost(from, to, false) + " for Single-journey Card"
                    }
                });
                break;
            case "landmarks":
                if (!from) {
                    reject({
                        status: module_1.Status.BadInput,
                        message: "The origin station is missing",
                        errorContent: {
                            missing: "from"
                        }
                    });
                    return;
                }
                let poi = stations_1.landmarks(from);
                let reply = poi.length
                    ? "In the " + stations_1.station(from).longName + " you could find" + poi.join()
                    : "There are no places of interests in the " + stations_1.station(from).longName;
                resolve({
                    status: module_1.Status.Ok,
                    message: "Ok",
                    content: {
                        reply: reply
                    }
                });
                break;
            case "operating_hours":
                resolve({
                    status: module_1.Status.Ok,
                    message: "Ok",
                    content: {
                        reply: "LRT-1 will be open from 6:00am to 9:30pm"
                    }
                });
                break;
        }
    });
};
exports.default = exports.MODULE;
