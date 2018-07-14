import { Module, ModuleOutput, Status } from "./module"
import { STATIONS } from "./stations";

export const CONFIG = {
    google: {
        maps: {
            apiKey: "AIzaSyBpERBr8CsN1Cs_atrlpiIUIrC9CV1tnd4",
            distanceMatrix: {
                mode: "walking",
                units: "metric"
            }
        }
    },
    debug: true,
    locationConstraint: "Metro Manila, Philippines"
}
export const GMAPS_CLIENT = require('@google/maps').createClient({
    key: CONFIG.google.maps.apiKey,
    Promise: require("promise")
})

export type Input = {
    place: string
}
export type Output = ModuleOutput<{
    from: string,
    distances: any[]
}>

export const MODULE: Module<Input, Output> = input => {
    return new Promise<Output>((resolve, reject) => {

        let place = input.place

        if (!place) {
            reject({
                status: Status.BadInput,
                message: "Bad Request, Parameter 'place' not found",
                content: {
                    from: "",
                    distances: []
                }
            })
            return;
        }

        GMAPS_CLIENT.distanceMatrix({
            origins: [place + " " + CONFIG.locationConstraint],
            destinations: STATIONS.map(station => station.address),
            mode: CONFIG.google.maps.distanceMatrix.mode,
            units: CONFIG.google.maps.distanceMatrix.units
        }).asPromise()
            .then(gres => {
                if (CONFIG.debug) {
                    console.log("GMaps Client DistanceMatrix Response:")
                    console.log(JSON.stringify(gres, null, 4))
                }

                let json = gres.json
                let origin = json.origin_addresses[0] + ""

                if (origin == "") {
                    reject({
                        status: Status.CannotResolve,
                        message: "Location not specific enough",
                        errorContent: {
                            from: origin,
                            distances: []
                        }
                    })
                    return;
                }

                let elements = json.rows[0].elements
                if (elements[0].status == "NOT_FOUND") {
                    reject({
                        status: Status.NotFound,
                        message: "Path not found",
                        errorContent: {
                            from: origin,
                            distances: []
                        }
                    })
                    return;
                }
                let distances = elements
                    .map((elem, index) => {
                        return {
                            debug_actualStationAddress: CONFIG.debug ? json.destination_addresses[index] : undefined,
                            station: STATIONS[index],
                            distance: elem.distance.value,
                            distanceText: elem.distance.text
                        }
                    })
                    .sort((a, b) => {
                        return a.distance - b.distance
                    })
                resolve({
                    status: Status.Ok,
                    message: "Ok",
                    content: {
                        from: origin,
                        distances: distances
                    }
                })

            })
            .catch(err => {
                if (CONFIG.debug) {
                    console.log(JSON.stringify(err, null, 4))
                }
                reject({
                    status: Status.InternalError,
                    message: "Internal Server Error",
                    errorContent: CONFIG.debug ? err : undefined
                })
            })

    })
}
export default MODULE