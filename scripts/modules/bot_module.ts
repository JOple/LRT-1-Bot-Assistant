import * as builder from "botbuilder"
import stringSimilarity = require('string-similarity')
import { callbackify } from "util";
// import { getLevenshteinDistanceRanking } from "../utils/levenshtein_distance";

export interface IModule<T> {

    name: string

    init(context: T): void;
    module(name: string): IModule<T>;
    on(eventName: string, callback: (args?: any) => void): void;
    trigger(eventName: string, args?: any): void;
}
export abstract class Module<T> implements IModule<T> {

    public readonly name: string;
    public readonly handlerMap: HandlerMap = {}

    constructor(name: string) {
        this.name = name;
    }

    public abstract init(context: T): void;
    public abstract module(name: string): Module<T>;

    public on(eventName: string, callback: (args?: any) => void): void {
        let handlers = this.handlerMap[eventName]
        if (!handlers) {
            handlers = this.handlerMap[eventName] = []
        }
        handlers.push(callback)
    }
    public trigger(eventName: string, args?: any): void {
        let handlers = this.handlerMap[eventName]
        if (handlers) {
            handlers.forEach(handler => handler(args))
        }
    }
}

export function bestMatchingModule(message: string, modules: BotModule[], noneModule: BotModule, rejectThreshold: number): string {
    let intents: builder.IIntent[] = []
    for (let module of modules) {
        let keywords: string[] = module.keywords;
        let scores: number[] = keywords.map(key => stringSimilarity.compareTwoStrings(message, key))

        let maxScore = scores.reduce((prev, curr) => prev > curr ? prev : curr, -1)

        intents.push({
            intent: module.name,
            score: maxScore
        })
    }

    console.log(JSON.stringify(intents, null, 4))

    intents = intents
        .filter(i => i.score > rejectThreshold)
        .sort((a, b) => b.score - a.score)

    if (intents.length == 0) {
        return noneModule.name
    }

    console.log("******************************")
    console.log("Sorted and Normalized Intent")
    console.log(JSON.stringify(intents, null, 4))
    console.log("******************************")
    console.log("******************************")
    console.log("******************************")

    return intents[0].intent
}

export type BotModuleArgs = {
    rejectThreshold: number,
    noneIntent: string
}
export class BotModuleRecognizer extends builder.IntentRecognizer {

    public readonly modules: BotModule[] = [];

    public readonly args: BotModuleArgs

    constructor(args?: BotModuleArgs) {
        super()
        this.args = args || {
            rejectThreshold: -1,
            noneIntent: ""
        }
    }

    onRecognize(context: builder.IRecognizeContext, done: (err: Error, result: builder.IIntentRecognizerResult) => void): void {
        let message = context.message.text

        let intents: builder.IIntent[] = []
        for (let module of this.modules) {
            let keywords: string[] = module.keywords;
            let scores: number[] = keywords.map(key => stringSimilarity.compareTwoStrings(message, key))

            let maxScore = scores.reduce((prev, curr) => prev > curr ? prev : curr, -1)

            intents.push({
                intent: module.name,
                score: maxScore
            })
        }

        console.log("Message: " + message)
        console.log("******************************")
        console.log("******************************")
        console.log("All Intents")
        console.log(JSON.stringify(intents, null, 4))

        intents = intents
            .filter(i => i.score > this.args.rejectThreshold)
            .sort((a, b) => b.score - a.score)

        if (intents.length == 0) {
            intents = [{
                intent: this.args.noneIntent,
                score: 1
            }]
        }


        console.log("******************************")
        console.log("Sorted and Normalized Intent")
        console.log(JSON.stringify(intents, null, 4))
        console.log("******************************")
        console.log("Dialog Stack")
        console.log(JSON.stringify(context.dialogStack(), null, 4))
        console.log("******************************")
        console.log("Top Intent")
        console.log(JSON.stringify(context.intent, null, 4))
        console.log("******************************")
        let stack = context.dialogStack()
        if (stack.length > 0) {
            let top = stack[stack.length - 1]
            if (top.id == "BotBuilder:prompt-text") {
                let intent = {
                    intent: "BotBuilder:prompt-text",
                    score: 1
                }
                done(null, {
                    intent: intent.intent,
                    score: intent.score,
                    intents: [intent]
                })
                return
            }
        }

        done(null, {
            intent: intents[0].intent,
            score: intents[0].score,
            intents: intents
        })
    }
}

export type SuggestedActions = { [actionName: string]: string }
export type DialogTypes = builder.Dialog | builder.IDialogWaterfallStep[] | builder.IDialogWaterfallStep
export type Handler = (args?: any) => void
export type HandlerMap = { [eventName: string]: Handler[] }

export interface IBotModuleContext {
    bot: builder.UniversalBot;
    // server: restify.Server;
    recognizer: BotModuleRecognizer;
    // suggestedActions: SuggestedActions;
}
export abstract class BotModule extends Module<IBotModuleContext> {

    public readonly fullName: string;
    public readonly keywords: string[];

    constructor(moduleName: string, fullName: string, ...keywords: string[]) {
        super(moduleName);
        this.fullName = fullName;
        this.keywords = keywords;
    }

    protected abstract generateDialog(context: IBotModuleContext): DialogTypes;

    public static lastAction: string;

    public init(context: IBotModuleContext): void {
        context.bot.dialog(this.name, this.generateDialog(context))
            .triggerAction({
                matches: this.name
                // ,
                // onSelectAction: (session, action, next) => {
                //     let isEmpty = session.dialogStack().length == 0 || !BotModule.lastAction
                //     console.log("-------------------------------------------")
                //     console.log(this.name + " module is selected to attemps override lastAction " + BotModule.lastAction)
                //     console.log(JSON.stringify(session.dialogStack(), null, 4))
                //     if (isEmpty || BotModule.lastAction == this.name) {
                //         if (isEmpty)
                //             console.log(this.name + " continues becasue stack is empty ")
                //         else
                //             console.log(this.name + " and " + BotModule.lastAction + " are the same")
                //         BotModule.lastAction = this.name
                //         next()
                //         return;
                //     }

                //     console.log(this.name + " module could not override lastAction " + BotModule.lastAction)
                //     session.
                //     BotModule.lastAction = this.name
                // }
            });
        context.recognizer.modules.push(this)
    }

    public module(name: string): BotModule {
        throw new Error("Method not implemented.");
    }
}