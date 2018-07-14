import { Module } from "./module"
import restify from "restify"

export const config = {

}

let handler: restify.RequestHandler = (req, res) => {


}

let module: Module = {
    method: "get",
    path: "approx_time_arrival",
    handler: handler
}
export default module