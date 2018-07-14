"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder = __importStar(require("botbuilder"));
const stringSimilarity = require("string-similarity");
class Module {
    constructor(name) {
        this.handlerMap = {};
        this.name = name;
    }
    on(eventName, callback) {
        let handlers = this.handlerMap[eventName];
        if (!handlers) {
            handlers = this.handlerMap[eventName] = [];
        }
        handlers.push(callback);
    }
    trigger(eventName, args) {
        let handlers = this.handlerMap[eventName];
        if (handlers) {
            handlers.forEach(handler => handler(args));
        }
    }
}
exports.Module = Module;
function bestMatchingModule(message, modules, noneModule, rejectThreshold) {
    let intents = [];
    for (let module of modules) {
        let keywords = module.keywords;
        let scores = keywords.map(key => stringSimilarity.compareTwoStrings(message, key));
        let maxScore = scores.reduce((prev, curr) => prev > curr ? prev : curr, -1);
        intents.push({
            intent: module.name,
            score: maxScore
        });
    }
    console.log(JSON.stringify(intents, null, 4));
    intents = intents
        .filter(i => i.score > rejectThreshold)
        .sort((a, b) => b.score - a.score);
    if (intents.length == 0) {
        return noneModule.name;
    }
    console.log("******************************");
    console.log("Sorted and Normalized Intent");
    console.log(JSON.stringify(intents, null, 4));
    console.log("******************************");
    console.log("******************************");
    console.log("******************************");
    return intents[0].intent;
}
exports.bestMatchingModule = bestMatchingModule;
class BotModuleRecognizer extends builder.IntentRecognizer {
    constructor(args) {
        super();
        this.modules = [];
        this.args = args || {
            rejectThreshold: -1,
            noneIntent: ""
        };
    }
    onRecognize(context, done) {
        let message = context.message.text;
        let intents = [];
        for (let module of this.modules) {
            let keywords = module.keywords;
            let scores = keywords.map(key => stringSimilarity.compareTwoStrings(message, key));
            let maxScore = scores.reduce((prev, curr) => prev > curr ? prev : curr, -1);
            intents.push({
                intent: module.name,
                score: maxScore
            });
        }
        console.log("Message: " + message);
        console.log("******************************");
        console.log("******************************");
        console.log("All Intents");
        console.log(JSON.stringify(intents, null, 4));
        intents = intents
            .filter(i => i.score > this.args.rejectThreshold)
            .sort((a, b) => b.score - a.score);
        if (intents.length == 0) {
            intents = [{
                    intent: this.args.noneIntent,
                    score: 1
                }];
        }
        console.log("******************************");
        console.log("Sorted and Normalized Intent");
        console.log(JSON.stringify(intents, null, 4));
        console.log("******************************");
        console.log("Dialog Stack");
        console.log(JSON.stringify(context.dialogStack(), null, 4));
        console.log("******************************");
        console.log("Top Intent");
        console.log(JSON.stringify(context.intent, null, 4));
        console.log("******************************");
        let stack = context.dialogStack();
        if (stack.length > 0) {
            let top = stack[stack.length - 1];
            if (top.id == "BotBuilder:prompt-text") {
                let intent = {
                    intent: "BotBuilder:prompt-text",
                    score: 1
                };
                done(null, {
                    intent: intent.intent,
                    score: intent.score,
                    intents: [intent]
                });
                return;
            }
        }
        done(null, {
            intent: intents[0].intent,
            score: intents[0].score,
            intents: intents
        });
    }
}
exports.BotModuleRecognizer = BotModuleRecognizer;
class BotModule extends Module {
    constructor(moduleName, fullName, ...keywords) {
        super(moduleName);
        this.fullName = fullName;
        this.keywords = keywords;
    }
    init(context) {
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
        context.recognizer.modules.push(this);
    }
    module(name) {
        throw new Error("Method not implemented.");
    }
}
exports.BotModule = BotModule;
