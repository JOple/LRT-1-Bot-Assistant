import * as builder from "botbuilder"

export type KeyValue = [string, string]
export function sendCards(session: builder.Session, title: string, cards: (KeyValue | string)[], delay?: number) {
    delay = delay || 1500
    let msg = new builder.Message(session);

    let card = new builder.HeroCard()
        .title(title)
        .buttons(cards.map(kv => {
            let key = kv + "", value = kv + ""
            if (kv instanceof Array) {
                key = kv[0]
                value = kv[1]
            }
            return builder.CardAction.imBack(session, value, key)
        }));
    msg.addAttachment(card)
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
    setTimeout(() => session.send(msg), delay)

}