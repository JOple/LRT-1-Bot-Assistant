"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_module_1 = require("./bot_module");
class CustomerServiceModule extends bot_module_1.BotModule {
    constructor() {
        super("customer_service", "Customer Service", "customer service", "customer");
    }
    generateDialog(context) {
        return session => {
            session.send("Just leave us your message and we will get back to you once a customer service representative is available.");
            session.replaceDialog("none");
        };
    }
}
exports.CustomerServiceModule = CustomerServiceModule;
exports.INSTANCE = new CustomerServiceModule();
