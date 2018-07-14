import { BotModule, IBotModuleContext, DialogTypes } from "./bot_module";
import { sendCards } from "../utils/send_cards";

export const CONFIG = {
    rejectThreshold: 0.5,
    noneIntent: "none"
}
export class DefaultDialogModule extends BotModule {

    constructor() {
        super(CONFIG.noneIntent, "none")
    }

    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return session => {
            let actions = context.recognizer.modules
                .filter(m => m != this)
                .map(m => m.fullName)

            session.send("These are the things that I can do: " + actions.join(", "))
            sendCards(session, "Choose Action", actions)
            session.endDialog()
        }
    }
}
export const INSTANCE = new DefaultDialogModule();