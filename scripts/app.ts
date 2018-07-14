import restify from "restify"

import { Module } from "./modules/module"

import find_nearest from "./modules/find_nearest_station"
import bot from "./modules/bot"


let modules: Module[] = [
    find_nearest,
    bot
]

let server = restify.createServer()
server.use(restify.plugins.queryParser())

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url)
})


for (let module of modules) {
    console.log("METHOD: " + module.method + " PATH: " + module.path)
    server[module.method](module.path, module.handler)
}

