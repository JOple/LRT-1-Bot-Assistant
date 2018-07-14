import * as builder from "botbuilder"

import { StationTrainState, StationName, findNorth, findSouth, findStation, lookStation, STATION_ORDER_LONG } from "./stations";
import { BotModule, IBotModuleContext, DialogTypes } from "./bot_module";
import { sendCards } from "../utils/send_cards";
import { provideAds } from "./ads";

export const CONFIG = {
    minEta: 2,
    maxEta: 4,
    trainIsInBias: 0.5,
    stationThreshold: 0.4,
    adChance: 0.9,
    adRadius: 1200
}
export type TrainArrivalOutput = {
    stationNorth: StationName,
    stationSouth: StationName,
    trainNorth: StationTrainState,
    trainSouth: StationTrainState,
    etaNorth: number,
    etaSouth: number,
    etaNorthText: string,
    etaSouthText: string
}

export function approxTrainArrival(station: StationName): Promise<TrainArrivalOutput> {
    return new Promise((resolve, reject) => {
        let multiplier = CONFIG.maxEta - CONFIG.minEta
        let etaNorth = Math.random() * multiplier + CONFIG.minEta, etaSouth = Math.random() * multiplier + CONFIG.minEta
        resolve({
            stationNorth: findNorth(station) || null,
            stationSouth: findSouth(station) || null,
            trainNorth: Math.random() > CONFIG.trainIsInBias ? StationTrainState.IsIn : StationTrainState.JustLeft,
            trainSouth: Math.random() > CONFIG.trainIsInBias ? StationTrainState.IsIn : StationTrainState.JustLeft,
            etaNorth: etaNorth,
            etaSouth: etaSouth,
            etaNorthText: Math.floor(etaNorth) + " min. and " + Math.round((etaNorth - Math.floor(etaNorth)) * 60) + " seconds",
            etaSouthText: Math.floor(etaSouth) + " min. and " + Math.round((etaSouth - Math.floor(etaSouth)) * 60) + " seconds"
        })
    })
}

export class ApproxTrainArrivalModule extends BotModule {

    constructor() {
        super("approx_train_arrival", "Approx. Train Arrival",
            "approximate train arrival time", "approximate train arrival", "approximate arrival time", "approx train arrival time", "approx train arrival", "approx arrival time", "arrival time", "arrival")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return [
            session => {
                builder.Prompts.text(session, 'This function estimates the arrival of the next train to a station. What station?')
                sendCards(session, "Station", STATION_ORDER_LONG)
            },
            (session, results) => {
                let station = findStation(results.response, CONFIG.stationThreshold)[0]
                if (!station) {
                    session.send("The station is not clear.")
                    return;
                }

                approxTrainArrival(station)
                    .then(out => {
                        session.send(`The train will arrive on ${lookStation(station).longName}, ${out.etaNorthText} on Northbound,\
                            and ${out.etaSouthText} on Southbound`)
                        provideAds(session, lookStation(station).address, CONFIG.adRadius, CONFIG.adChance)
                        // session.endDialog()
                        session.replaceDialog("none")
                    })
                    .catch(err => {
                        session.send(err.message)
                        // session.endDialog()
                        session.replaceDialog("none")
                    })
            }
        ]
    }
}
export const INSTANCE = new ApproxTrainArrivalModule()