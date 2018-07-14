"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const find_nearest_station_1 = __importDefault(require("./modules/find_nearest_station"));
const bot_1 = __importDefault(require("./modules/bot"));
let modules = [
    find_nearest_station_1.default,
    bot_1.default
];
let server = restify_1.default.createServer();
server.use(restify_1.default.plugins.queryParser());
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
for (let module of modules) {
    console.log("METHOD: " + module.method + " PATH: " + module.path);
    server[module.method](module.path, module.handler);
}
