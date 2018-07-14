import { Module } from "./module"
import restify from "restify"

let handler: restify.RequestHandler = (req, res) => {

}

let module: Module = {
    method: "get",
    path: "/",
    handler: handler
}
export default module