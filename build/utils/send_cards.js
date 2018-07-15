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
function sendCards(session, title, cards, delay) {
    delay = delay || 1500;
    let msg = new builder.Message(session);
    let card = new builder.HeroCard()
        .title(title)
        .buttons(cards.map(kv => {
        let key = kv + "", value = kv + "";
        if (kv instanceof Array) {
            key = kv[0];
            value = kv[1];
        }
        return builder.CardAction.imBack(session, value, key);
    }));
    msg.addAttachment(card);
    // if (text) {
    //     msg = msg.text(text)
    // }
    // if (cards) {
    //     msg = msg.suggestedActions(
    //         builder.SuggestedActions.create(
    //             session, [
    //                 ...cards.map(kv => {
    //                     let key = kv + "", value = kv + ""
    //                     if (kv instanceof Array) {
    //                         key = kv[0]
    //                         value = kv[1]
    //                     }
    //                     return builder.CardAction.imBack(session, value, key)
    //                 })
    //             ]
    //         ))
    // }
    setTimeout(() => session.send(msg), delay);
}
exports.sendCards = sendCards;
