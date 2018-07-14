"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder = __importStar(require("botbuilder"));
const request_1 = __importDefault(require("request"));
const querystring_1 = __importDefault(require("querystring"));
const find_nearest_station_1 = __importDefault(require("./find_nearest_station"));
/*----------------------------------------------------------------------------------------
* Connector Initialization
* ---------------------------------------------------------------------------------------- */
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});
/*----------------------------------------------------------------------------------------
* Bot Initialization
* ---------------------------------------------------------------------------------------- */
// var bot = new builder.UniversalBot(connector);
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
    console.log("Bot Recieved: " + session.message.text);
    let url = "http://localhost:3978" + find_nearest_station_1.default.path + "?place=" + querystring_1.default.escape(session.message.text);
    console.log("Request Module: " + url);
    request_1.default(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        session.send(body);
        var msg = new builder.Message(session)
            .text("Thank you for expressing interest in our premium golf shirt! What color of shirt would you like?")
            .suggestedActions(builder.SuggestedActions.create(session, [
            builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
            builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
            builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
            builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
            builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
            builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
            builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
            builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
            builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
            builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
            builder.CardAction.imBack(session, "productId=1&color=red", "Red")
        ]));
        session.send(msg);
    });
});
/*----------------------------------------------------------------------------------------
* Database Initialization
* ---------------------------------------------------------------------------------------- */
// TODO: Enable this part when in the environment
// var tableName = 'botdata';
// var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
// var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);
// bot.set('storage', tableStorage);
/*----------------------------------------------------------------------------------------
* Bot Methods
* ---------------------------------------------------------------------------------------- */
exports.module = {
    method: "post",
    path: "/api/messages",
    handler: connector.listen()
};
exports.default = exports.module;
