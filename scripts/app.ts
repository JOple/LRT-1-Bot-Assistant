import restify from "restify"

import { CONNECTOR } from "./modules/bot"

let server = restify.createServer()
server.use(restify.plugins.queryParser())

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url)
})

server.post("/api/messages", CONNECTOR.listen())
