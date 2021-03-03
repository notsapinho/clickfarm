"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ac = require("@antiadmin/anticaptchaofficial");
const config_json_1 = require("./config.json");
ac.shutUp();
ac.setAPIKey(config_json_1.anticaptchakey);
__exportStar(require("./Account/"), exports);
__exportStar(require("./Email/"), exports);
__exportStar(require("./Proxy/"), exports);
//# sourceMappingURL=index.js.map