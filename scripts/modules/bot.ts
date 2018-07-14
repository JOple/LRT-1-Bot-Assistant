
import * as builder from "botbuilder"
import fns from "./find_nearest_station"

/*----------------------------------------------------------------------------------------
* Connector Initialization
* ---------------------------------------------------------------------------------------- */
export const CONNECTOR = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});

/*----------------------------------------------------------------------------------------
* Bot Initialization
* ---------------------------------------------------------------------------------------- */
// var bot = new builder.UniversalBot(connector);
export const BOT = new builder.UniversalBot(CONNECTOR, function (session) {
    session.send("You said: %s", session.message.text);
    fns({
        place: session.message.text
    }).then(o => {
        session.send(JSON.stringify(o.content, null, 4))
    })
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

