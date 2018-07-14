"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status[Status["Ok"] = 200] = "Ok";
    Status[Status["BadInput"] = 400] = "BadInput";
    Status[Status["NotFound"] = 404] = "NotFound";
    Status[Status["CannotResolve"] = 409] = "CannotResolve";
    Status[Status["InternalError"] = 500] = "InternalError";
})(Status = exports.Status || (exports.Status = {}));
