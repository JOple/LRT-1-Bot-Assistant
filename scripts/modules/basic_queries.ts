import { StationName, station, fairCost, landmarks } from "./stations";
import { ModuleOutput, Module, Status } from "./module";

// export type FAQOption = "ticket_cost" | "landmarks" | "operating_hours"
export type Input = {
    faq: "ticket_cost",
    from: StationName,
    to: StationName
} | {
    faq: "landmarks",
    from: StationName
} | {
    faq: "operating_hours"
}
export type Output = ModuleOutput<{
    reply: string,
    missing?: string
}>

export const MODULE: Module<Input, Output> = (input) => {
    let from = input["from"], to = input["to"]
    return new Promise((resolve, reject) => {
        switch (input.faq) {
            case "ticket_cost":
                if (!from) {
                    reject({
                        status: Status.BadInput,
                        message: "The origin station is missing",
                        errorContent: {
                            missing: "from"
                        }
                    })
                    return;
                }
                if (!to) {
                    reject({
                        status: Status.BadInput,
                        message: "The destination station is missing",
                        errorContent: {
                            missing: "to"
                        }
                    })
                    return;
                }
                resolve({
                    status: Status.Ok,
                    message: "Ok",
                    content: {
                        reply: "The fair from " + station(from).longName + " to " + station(from).longName +
                            " is " + fairCost(from, to, true) + " for Beep Card and" +
                            " is " + fairCost(from, to, false) + " for Single-journey Card"
                    }
                })
                break
            case "landmarks":
                if (!from) {
                    reject({
                        status: Status.BadInput,
                        message: "The origin station is missing",
                        errorContent: {
                            missing: "from"
                        }
                    })
                    return;
                }

                let poi = landmarks(from)
                let reply = poi.length
                    ? "In the " + station(from).longName + " you could find" + poi.join()
                    : "There are no places of interests in the " + station(from).longName
                resolve({
                    status: Status.Ok,
                    message: "Ok",
                    content: {
                        reply: reply
                    }
                })
                break
            case "operating_hours":
                resolve({
                    status: Status.Ok,
                    message: "Ok",
                    content: {
                        reply: "LRT-1 will be open from 6:00am to 9:30pm"
                    }
                })
                break
        }
    })
}
export default MODULE