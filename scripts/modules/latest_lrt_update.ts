import { BotModule, DialogTypes, IBotModuleContext } from "./bot_module";

import date from 'date-and-time';
import Twitter = require('twitter')

export const CONFIG = {
    lrt1TweeterId: 3493057514,
    retrievedTweets: 1000,
    presentedTweets: 3
}
export const TWITTER_CLIENT = new Twitter({
    consumer_key: "Pk2POposPiX4YspcVdtrbU2xQ",
    consumer_secret: "hmfJnWiTZwDszY1Qpwc3uC5WxIYDS3puuvMORdRbs02gBRJuZD",
    access_token_key: '629079786-T2ZvY0r64RUJBrASHIzDaX09PqsR7jhVdfumMeKX',
    access_token_secret: 'qP8vvuEqE2TNJ0vl5RVn0k0v4D1GOfBKO8ZrkqIChxyZp'
})
export class LatestLrtUpdateModule extends BotModule {

    constructor() {
        super("latest_lrt_update", "Latest LRT Update",
            "latest lrt update", "latest update", "lrt update", "twitter update", "lrt twitter"
        )
    }
    protected generateDialog(context: IBotModuleContext): DialogTypes {
        return session => {
            let params = {
                user_id: CONFIG.lrt1TweeterId,
                count: CONFIG.retrievedTweets,
                exclude_replies: true,
                trim_user: true
            }
            TWITTER_CLIENT.get("statuses/user_timeline", params, (error, tweets, response) => {
                for (let i = 0; i < CONFIG.presentedTweets; i++) {
                    let tweet = tweets[i]

                    if (!tweet) {
                        break;
                    }

                    let createdAt = new Date(tweet.created_at)
                    let text = tweet.text

                    session.send("At " + date.format(createdAt, 'ddd MMM DD YYYY hh:mm A'))
                    session.send(text)
                }
                session.replaceDialog("none")
            })
        }
    }
}
export const INSTANCE = new LatestLrtUpdateModule();