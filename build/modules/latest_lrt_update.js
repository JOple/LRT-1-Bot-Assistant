"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_module_1 = require("./bot_module");
const date_and_time_1 = __importDefault(require("date-and-time"));
const Twitter = require("twitter");
exports.CONFIG = {
    lrt1TweeterId: 3493057514,
    retrievedTweets: 1000,
    presentedTweets: 3
};
exports.TWITTER_CLIENT = new Twitter({
    consumer_key: "Pk2POposPiX4YspcVdtrbU2xQ",
    consumer_secret: "hmfJnWiTZwDszY1Qpwc3uC5WxIYDS3puuvMORdRbs02gBRJuZD",
    access_token_key: '629079786-T2ZvY0r64RUJBrASHIzDaX09PqsR7jhVdfumMeKX',
    access_token_secret: 'qP8vvuEqE2TNJ0vl5RVn0k0v4D1GOfBKO8ZrkqIChxyZp'
});
class LatestLrtUpdateModule extends bot_module_1.BotModule {
    constructor() {
        super("latest_lrt_update", "Latest LRT Update", "latest lrt update", "latest update", "lrt update", "twitter update", "lrt twitter");
    }
    generateDialog(context) {
        return session => {
            let params = {
                user_id: exports.CONFIG.lrt1TweeterId,
                count: exports.CONFIG.retrievedTweets,
                exclude_replies: true,
                trim_user: true
            };
            exports.TWITTER_CLIENT.get("statuses/user_timeline", params, (error, tweets, response) => {
                for (let i = 0; i < exports.CONFIG.presentedTweets; i++) {
                    let tweet = tweets[i];
                    if (!tweet) {
                        break;
                    }
                    let createdAt = new Date(tweet.created_at);
                    let text = tweet.text;
                    session.send("At " + date_and_time_1.default.format(createdAt, 'ddd MMM DD YYYY hh:mm A'));
                    session.send(text);
                }
                session.replaceDialog("none");
            });
        };
    }
}
exports.LatestLrtUpdateModule = LatestLrtUpdateModule;
exports.INSTANCE = new LatestLrtUpdateModule();
