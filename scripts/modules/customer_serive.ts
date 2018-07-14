import { BotModule, IBotModuleContext, DialogTypes } from "./bot_module";

export class CustomerServiceModule extends BotModule {

    constructor() {
        super("customer_service", "Customer Service",
            "customer service", "customer")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return session => {
            session.send("Just leave us your message and we will get back to you once a customer service representative is available.")
            session.replaceDialog("none")
        }
    }
}
export const INSTANCE = new CustomerServiceModule();