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
const bot_module_1 = require("./bot_module");
const defaultDialog = require("./default_dialog");
/*----------------------------------------------------------------------------------------
* Connector Initialization
* ---------------------------------------------------------------------------------------- */
exports.CONNECTOR = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});
let modules = [
    require("./latest_lrt_update").INSTANCE,
    require("./find_nearest_station").INSTANCE,
    require("./approx_train_arrival").INSTANCE,
    require("./basic_queries").FARECOST,
    require("./basic_queries").POIS,
    require("./basic_queries").OPEN_HOURS,
    require("./basic_queries").STATION_LIST,
    require("./customer_serive").INSTANCE,
    defaultDialog.INSTANCE
];
exports.BOT = new builder.UniversalBot(exports.CONNECTOR);
exports.RECOGNIZER = new bot_module_1.BotModuleRecognizer(defaultDialog.CONFIG);
exports.BOT.recognizer(exports.RECOGNIZER);
for (let module of modules) {
    console.log(JSON.stringify(module, null, 4));
    module.init({
        bot: exports.BOT,
        recognizer: exports.RECOGNIZER
    });
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
