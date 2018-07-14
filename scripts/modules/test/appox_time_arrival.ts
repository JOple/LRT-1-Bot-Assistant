import { Module } from "./module"
import restify from "restify"

export const config = {

    pathVariable: "station"
}

let handler: restify.RequestHandler = (req, res) => {
    let station = req.query[config.pathVariable]

    if (!station) {

    }
}

let module: Module = {
    method: "get",
    path: "approx_time_arrival",
    handler: handler
}
export default module