import { Module, ModuleOutput, Status } from "./module";
import { StationTrainState, StationName, findNorth, findSouth } from "./stations";
import { stat } from "fs";

export type Input = {
    station: StationName
}

export type Output = ModuleOutput<{
    stationNorth: StationName,
    stationSouth: StationName,
    trainNorth: StationTrainState,
    trainSouth: StationTrainState,
    etaNorth: number,
    etaSouth: number
}>

export const MODULE: Module<Input, Output> = input => {
    let station = input.station

    return new Promise((resolve, reject) => {
        resolve({
            status: Status.Ok,
            message: "",
            content: {
                stationNorth: findNorth(station) || null,
                stationSouth: findSouth(station) || null,
                trainNorth: Math.random() > .5 ? StationTrainState.IsIn : StationTrainState.JustLeft,
                trainSouth: Math.random() > .5 ? StationTrainState.IsIn : StationTrainState.JustLeft,
                etaNorth: Math.random() * 2,
                etaSouth: Math.random() * 2
            }
        })
    })
}
export default MODULE