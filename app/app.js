"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stations_1 = require("./modules/stations");
// let modules: Module[] = [
//     bot
// ]
let inputs = [
    "united nations",
    "un"
];
for (let i of inputs) {
    console.log(i);
    console.log(stations_1.FindStation(i));
    // let out = stations
    //     .map(s => s.shortName)
    //     .map(s => {
    //         return {
    //             name: s,
    //             score: getLevenshteinDistance(i, s)
    //         }
    //     })
    //     .sort((a, b) => a.score - b.score)
    //     .map(s => s.name)
    // console.log(out)
}
// let server = restify.createServer()
// server.use(restify.plugins.queryParser())
// server.listen(process.env.port || process.env.PORT || 3978, function () {
//     console.log('%s listening to %s', server.name, server.url)
// })
// server.post("/api/messages", CONNECTOR.listen())
// for (let module of modules) {
//     console.log("METHOD: " + module.method + " PATH: " + module.path)
//     server[module.method](module.path, module.handler)
// }
