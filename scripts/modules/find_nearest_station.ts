import * as builder from "botbuilder"

import { STATIONS, Station } from "./stations";
import { BotModule, IBotModuleContext, DialogTypes } from "./bot_module";
import { provideAds } from "./ads";

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
    locationConstraint: "Metro Manila, Philippines",
    adChance: 0.9,
    adRadius: 1200
}
export const GMAPS_CLIENT = require('@google/maps').createClient({
    key: CONFIG.google.maps.apiKey,
    Promise: require("promise")
})

export type NearestStationEvaluation = {
    debug_actualStationAddress?: string,
    station: Station
    distance: number,
    distanceText: string
}
export type NearestStationOutput = {
    from: string,
    distances: NearestStationEvaluation[]
}
export function findNearestStation(place: string): Promise<NearestStationOutput> {
    return GMAPS_CLIENT.distanceMatrix({
        origins: [place + " " + CONFIG.locationConstraint],
        destinations: STATIONS.map(station => station.address),
        mode: CONFIG.google.maps.distanceMatrix.mode,
        units: CONFIG.google.maps.distanceMatrix.units
    }).asPromise().then(gres => {
        if (CONFIG.debug) {
            console.log("GMaps Client DistanceMatrix Response:")
            console.log(JSON.stringify(gres, null, 4))
        }

        let json = gres.json

        let origin = json.origin_addresses[0] + ""
        if (origin == "") {
            throw new Error("Please be specific on the location");
        }

        let elements = json.rows[0].elements
        if (elements[0].status == "NOT_FOUND") {
            throw new Error("The location cannot be reached from any train stations")
        }

        let distances: NearestStationEvaluation = elements
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

        return {
            from: origin,
            distances: distances
        }

    }).catch(err => {
        if (CONFIG.debug) {
            console.error(JSON.stringify(err, null, 4))
        }
        throw new Error("Oops! Something happened on our side\nPlease return later on.");
    })
}

export class FindNearestStationModule extends BotModule {

    constructor() {
        super("find_nearest_station", "Find Nearest Station",
            "find nearest station", "nearest station", "nearest")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return [
            session => {
                builder.Prompts.text(session, 'This function finds the nearest station to a given place. What place?')
            },
            (session, results) => {
                findNearestStation(results.response)
                    .then(out => {
                        session.send(`The nearest LRT-1 station to the address ${out.from} is the ${out.distances[0].station.longName} \
                        which is ${out.distances[0].distanceText} away`)

                        provideAds(session, out.from, CONFIG.adRadius, CONFIG.adChance)

                        session.replaceDialog("none")
                    })
                    .catch(err => {
                        session.send(err.message)
                        session.replaceDialog("none")
                    })
            }
        ]
    }
}
export const INSTANCE = new FindNearestStationModule();