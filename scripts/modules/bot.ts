import * as builder from "botbuilder"
import * as builder_azure from "botbuilder-azure"
import { BotModule, BotModuleRecognizer, bestMatchingModule } from "./bot_module";
import defaultDialog = require("./default_dialog")

/*----------------------------------------------------------------------------------------
* Connector Initialization
* ---------------------------------------------------------------------------------------- */
export const CONNECTOR = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});

let modules: BotModule[] = [
    require("./latest_lrt_update").INSTANCE,
    require("./find_nearest_station").INSTANCE,
    require("./approx_train_arrival").INSTANCE,
    require("./basic_queries").FARECOST,
    require("./basic_queries").POIS,
    require("./basic_queries").OPEN_HOURS,
    require("./basic_queries").STATION_LIST,
    require("./customer_serive").INSTANCE,
    defaultDialog.INSTANCE

]
export const BOT = new builder.UniversalBot(CONNECTOR)
export const RECOGNIZER = new BotModuleRecognizer(defaultDialog.CONFIG)

BOT.recognizer(RECOGNIZER)

for (let module of modules) {
    console.log(JSON.stringify(module, null, 4))
    module.init({
        bot: BOT,
        recognizer: RECOGNIZER
    })
}

/*----------------------------------------------------------------------------------------
* Database Initialization
* ---------------------------------------------------------------------------------------- */
// TODO: Enable this part when in the environment

// var tableName = 'botdata';
// var azureTableClient = new builder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
// var tableStorage = new builder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// BOT.set('storage', tableStorage);

/*----------------------------------------------------------------------------------------
* Bot Methods
* ---------------------------------------------------------------------------------------- */

