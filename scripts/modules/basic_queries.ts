import * as builder from "botbuilder"

import { StationName, lookStation, fairCost, landmarks, LANDMARKS, findStation, STATIONS, STATION_ORDER_SHORT, STATION_ORDER_LONG } from "./stations";
import { BotModule, DialogTypes, IBotModuleContext } from "./bot_module";
import { sendCards } from "../utils/send_cards";
import { provideAds } from "./ads";

export const CONFIG = {
    stationThreshold: 0.4,
    adChance: 0.7,
    adRadius: 1200
}

export type TicketCost = {
    from: StationName,
    to: StationName,
    costBeep: number,
    costReg: number
}
export function computeTicketCost(from: StationName, to: StationName): TicketCost {
    return {
        from: from,
        to: to,
        costBeep: fairCost(from, to, true),
        costReg: fairCost(from, to, false)
    }
}

export function findLandmarks(station: StationName): string[] {
    return LANDMARKS.get(station) || []
}

export type OperatingHours = {
    from: string,
    to: string
}
export function operatingHours(): OperatingHours {
    return {
        from: "4:30 am",
        to: "10:15 pm"
    }
}

export class FareCostModule extends BotModule {

    constructor() {
        super("fare_cost", "Fare Cost",
            "ticket cost", "fair cost", "fare cost", "fare")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        let output = {
            from: StationName.baclaran,
            to: StationName.roosevelt
        }
        return [
            session => {
                builder.Prompts.text(session, 'This function computes the fare cost for an LRT-1 travel. From what station will you originate from?')
                sendCards(session, "Origin Station", STATION_ORDER_LONG)
            },
            (session, results) => {
                output.from = findStation(results.response, CONFIG.stationThreshold)[0]
                if (!output.from) {
                    session.send("I cannot deduce the station where you came from. Please try again!")
                    session.replaceDialog("none")
                    return;
                }

                builder.Prompts.text(session, 'To what station will you disembark?')
                sendCards(session, "Destination Station", STATION_ORDER_LONG)
            },
            (session, results) => {
                output.to = findStation(results.response, CONFIG.stationThreshold)[0]
                if (!output.to) {
                    session.send("I cannot deduce the station where you will disembark. Please try again!")
                    session.replaceDialog("none")
                    return;
                }

                provideAds(session, lookStation(output.from).address, CONFIG.adRadius, CONFIG.adChance)
                provideAds(session, lookStation(output.to).address, CONFIG.adRadius, CONFIG.adChance)

                let fair = computeTicketCost(output.from, output.to)

                session.send(`The fair from ${lookStation(fair.from).longName} to ${lookStation(fair.to).longName} is ${fair.costBeep} for Beep Card\
                    and ${fair.costReg} for Single-Journey Card`)
                session.replaceDialog("none")
            }
        ]
    }
}
export const FARECOST = new FareCostModule();

export class LandmarksModule extends BotModule {

    constructor() {
        super("landmarks", "Famous Destinations",
            "landmarks", "famout destinations", "places of interest")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return [
            session => {
                builder.Prompts.text(session, 'This functions tells the different landmarks and famous places near a specific station. What station?')
                sendCards(session, "Station", STATION_ORDER_LONG)
            },
            (session, results) => {
                let station = findStation(results.response, CONFIG.stationThreshold)[0]
                if (!station) {
                    session.send("I cannot deduce the station where you want to know more about famous places. Please try again!")
                    session.replaceDialog("none")
                    return;
                }

                let pois = landmarks(station)
                session.send(`From ${lookStation(station).longName} you could visit the places: ${pois.join(", ")}`)

                provideAds(session, lookStation(station).address, CONFIG.adRadius, CONFIG.adChance)

                session.replaceDialog("none")
            }
        ]
    }
}
export const POIS = new LandmarksModule();

export class OperatingHoursModule extends BotModule {

    constructor() {
        super("operating_hours", "Operating Hours",
            "operating hours", "operation time")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return session => {
            let oh = operatingHours();
            session.send(`LRT-1 is open from ${oh.from} to ${oh.to}`)
            session.replaceDialog("none")
        }
    }
}
export const OPEN_HOURS = new OperatingHoursModule();

export class StationListModule extends BotModule {

    constructor() {
        super("list_of_station", "Station List",
            "list of stations")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return session => {
            session.send(`LRT-1 stations (South to North): ${STATIONS.map(s => s.longName).join(", ")}`)
            session.replaceDialog("none")
        }
    }
}
export const STATION_LIST = new StationListModule();
