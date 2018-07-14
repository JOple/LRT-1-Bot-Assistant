import * as builder from "botbuilder"

export type KeyValue = [string, string]
export function sendCards(session: builder.Session, text: string, cards: (KeyValue | string)[]) {
    let msg = new builder.Message(session);

    if (text) {
        msg = msg.text(text)
    }
    if (cards) {
        msg = msg.suggestedActions(
            builder.SuggestedActions.create(
                session, [
                    ...cards.map(kv => {
                        let key = kv + "", value = kv + ""
                        if (kv instanceof Array) {
                            key = kv[0]
                            value = kv[1]
                        }
                        return builder.CardAction.imBack(session, value, key)
                    })
                ]
            ))
    }
    session.send(msg)
}