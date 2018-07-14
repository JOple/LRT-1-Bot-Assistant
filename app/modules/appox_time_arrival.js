"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    pathVariable: "station"
};
let handler = (req, res) => {
    let station = req.query[exports.config.pathVariable];
};
let module = {
    method: "get",
    path: "approx_time_arrival",
    handler: handler
};
exports.default = module;
