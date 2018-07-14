"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function messageModule(path, data) {
    return new Promise((resolve, reject) => {
    });
}
exports.messageModule = messageModule;
function sendJson(res, status, message, content) {
    let json = {
        status: status,
        message: message,
        content: content
    };
    res.status(status);
    res.json(json);
}
exports.sendJson = sendJson;
