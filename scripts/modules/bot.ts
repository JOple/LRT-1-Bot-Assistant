
import * as builder from "botbuilder"
import * as botbuilder_azure from "botbuilder-azure"

import restify from "restify"
import request from "request"
import query from "querystring"

import { Module } from "./module"
import find_nearest_station from "./find_nearest_station"

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
    console.log("Bot Recieved: " + session.message.text)

    let url = "http://localhost:3978" + find_nearest_station.path + "?place=" + query.escape(session.message.text)
    console.log("Request Module: " + url)
    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        session.send(body)

        var msg = new builder.Message(session)
            .text("Thank you for expressing interest in our premium golf shirt! What color of shirt would you like?")
            .suggestedActions(
                builder.SuggestedActions.create(
                    session, [
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
                    ]
                ));
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


export const module: Module = {
    method: "post",
    path: "/api/messages",
    handler: connector.listen()
}
export default module