import { Module } from "./module"
import restify from "restify"

export const config = {
    pathVariable: "place",
    google: {
        maps: {
            apiKey: "AIzaSyBpERBr8CsN1Cs_atrlpiIUIrC9CV1tnd4"
        }
    },
    response: {
        status: "status",
        message: "message",
        data: "data"
    },
    debug: true,
    locationConstraint: "Metro Manila, Philippines"
}

export type Station = {
    shortName: string,
    longName: string,
    address: string
}
export const stations: Station[] = [
    {
        shortName: "edsa",
        longName: "EDSA Station",
        address: "Taft Ave, Pasay, 1300 Metro Manila"
    },
    {
        shortName: "libertad",
        longName: "Libertad Station",
        address: "Antonio S. Arnaiz Ave, Pasay, Metro Manila"
    },
    {
        shortName: "gil_puyat",
        longName: "Gil Puyat Station",
        address: "2741 Taft Ave Pasay City, Pasay, Metro Manila"
    },
    {
        shortName: "vito_cruz",
        longName: "Vito Cruz Station",
        address: "Malate, Manila, 1004 Metro Manila"
    }
    // {
    //     shortName: "quirino",
    //     longName: "Quirino Station",
    //     address: ""
    // },
    // {
    //     shortName: "pedro_gil",
    //     longName: "Pedro Gil Station",
    //     address: ""
    // }
]

export const gmaps = require('@google/maps').createClient({
    key: config.google.maps.apiKey,
    Promise: require("promise")
})

function sendJson(res: restify.Response, code: number, message: string, data?: any) {
    let json: any = {}
    json[config.response.status] = code
    json[config.response.message] = message
    json[config.response.data] = data

    res.status(code)
    res.json(json)
}

let handler = (req: restify.Request, res: restify.Response) => {

    let place = req.query[config.pathVariable]
    console.log(JSON.stringify(req.query, null, 4))

    if (place) {

        gmaps.distanceMatrix({
            origins: [place + " " + config.locationConstraint],
            destinations: stations.map(station => station.address),
            mode: "walking",
            units: "metric"
        })
            .asPromise()
            .then(gres => {
                console.log(JSON.stringify(gres, null, 4))
                let json = gres.json

                let origin = json.origin_addresses[0]

                if (origin == "") {
                    sendJson(res, 409, "Location not specific enough", {
                        from: origin,
                        distances: []
                    })
                    return;
                }

                let elements = json.rows[0].elements
                if (elements[0].status == "NOT_FOUND") {
                    sendJson(res, 404, "Path not found", {
                        from: origin,
                        distances: []
                    })
                    return;
                }
                let distances = elements
                    .map((elem, index) => {
                        return {
                            debug_actualStationAddress: config.debug ? json.destination_addresses[index] : undefined,
                            station: stations[index],
                            distance: elem.distance.value,
                            distanceText: elem.distance.text
                        }
                    })
                    .sort((a, b) => {
                        return a.distance - b.distance
                    })
                sendJson(res, 200, "Ok", {
                    from: origin,
                    distances: distances
                })
            })
            .catch(err => {
                console.log(JSON.stringify(err, null, 4))
                sendJson(res, 500, "Internal Server Error", config.debug ? err : undefined)
            })
    } else {
        sendJson(res, 400, "Bad Request, Parameter '" + config.pathVariable + "' not found")
    }
}

const mod: Module = {
    method: "get",
    path: "/nearest_station",
    handler: handler
}
export default mod
