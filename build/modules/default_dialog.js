"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_module_1 = require("./bot_module");
const send_cards_1 = require("../utils/send_cards");
exports.CONFIG = {
    rejectThreshold: 0.5,
    noneIntent: "none"
};
class DefaultDialogModule extends bot_module_1.BotModule {
    constructor() {
        super(exports.CONFIG.noneIntent, "none");
    }
    generateDialog(context) {
        return session => {
            let actions = context.recognizer.modules
                .filter(m => m != this)
                .map(m => m.fullName);
            session.send("These are the things that I can do: " + actions.join());
            send_cards_1.sendCards(session, null, actions);
            session.endDialog();
        };
    }
}
exports.DefaultDialogModule = DefaultDialogModule;
exports.INSTANCE = new DefaultDialogModule();
