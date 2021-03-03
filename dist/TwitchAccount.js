"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchAccount = void 0;
const Account_1 = require("./Account");
const request_1 = require("./request");
const Util_1 = require("./Util");
class TwitchAccount extends Account_1.Account {
    constructor(opts) {
        super(opts);
        this.cookies = {};
        this.useragent = Util_1.randomUserAgent();
        this.intialized = this.init();
    }
    getCookies() {
        return Object.entries(this.cookies)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ");
    }
    fetch(url, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!opts)
                opts = {};
            if (!opts.headers)
                opts.headers = {};
            opts.headers = Object.assign(Object.assign({}, opts.headers), { accept: "*/*", referer: "hhttps://www.twitch.tv/", origin: "https://www.twitch.tv", "accept-language": "en", "cache-control": "no-cache", "content-type": "text/plain;charset=UTF-8", pragma: "no-cache", "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', "sec-ch-ua-mobile": "?0", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site", "user-agent": this.useragent, cookie: this.getCookies() });
            const json = yield request_1.request(url, opts);
            const cookies = json._res.headers.raw()["set-cookie"] || [];
            cookies.forEach((cookie) => {
                const c = cookie.split("; ")[0];
                const [key, value] = c.split("=");
                // @ts-ignore
                this.cookies[key] = value;
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // get unique_id user cookie
            yield this.fetch("https://twitch.tv/");
            this.cookies.api_token = `twilight.${TwitchAccount.getRandomId()}`;
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.intialized;
        });
    }
    login() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.intialized;
            try {
                const result = yield this.fetch("https://passport.twitch.tv/login", {
                    body: {
                        username: this.username,
                        password: this.password,
                        client_id: TwitchAccount.client_id,
                        undelete_user: false,
                    },
                });
            }
            catch (error) {
                if (error.code === 3022 && this.emailProvider) {
                    if (!this.emailProvider)
                        throw "Can't verify email: no email provider set";
                    const mail = yield this.emailProvider.waitFor((mail) => { var _a; return mail.recipient === ((_a = this.emailProvider) === null || _a === void 0 ? void 0 : _a.email) && mail.sender === "account@twitch.tv"; });
                    const code = (_a = mail.text.match(/https:.+/g)) === null || _a === void 0 ? void 0 : _a[0];
                }
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static getRandomId() {
        return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" === e ? t : (3 & t) | 8).toString(16);
        });
    }
}
exports.TwitchAccount = TwitchAccount;
TwitchAccount.client_id = "kimne78kx3ncx6brgo4mv6wki5h1ko";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdpdGNoQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Ud2l0Y2hBY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFvRDtBQUNwRCx1Q0FBb0Q7QUFDcEQsaUNBQXlDO0FBSXpDLE1BQWEsYUFBYyxTQUFRLGlCQUFPO0lBTXpDLFlBQVksSUFBMEI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBSE4sWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUt4QixJQUFJLENBQUMsU0FBUyxHQUFHLHNCQUFlLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sVUFBVTtRQUNoQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNqQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7YUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVLLEtBQUssQ0FBQyxHQUFXLEVBQUUsSUFBcUI7O1lBQzdDLElBQUksQ0FBQyxJQUFJO2dCQUFFLElBQUksR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2dCQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRXJDLElBQUksQ0FBQyxPQUFPLG1DQUNSLElBQUksQ0FBQyxPQUFPLEtBQ2YsTUFBTSxFQUFFLEtBQUssRUFDYixPQUFPLEVBQUUseUJBQXlCLEVBQ2xDLE1BQU0sRUFBRSx1QkFBdUIsRUFDL0IsaUJBQWlCLEVBQUUsSUFBSSxFQUN2QixlQUFlLEVBQUUsVUFBVSxFQUMzQixjQUFjLEVBQUUsMEJBQTBCLEVBQzFDLE1BQU0sRUFBRSxVQUFVLEVBQ2xCLFdBQVcsRUFBRSxrRUFBa0UsRUFDL0Usa0JBQWtCLEVBQUUsSUFBSSxFQUN4QixnQkFBZ0IsRUFBRSxPQUFPLEVBQ3pCLGdCQUFnQixFQUFFLE1BQU0sRUFDeEIsZ0JBQWdCLEVBQUUsV0FBVyxFQUM3QixZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDNUIsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FDekIsQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsTUFBTSxPQUFPLEdBQWMsSUFBSSxDQUFDLElBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXhFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxhQUFhO2dCQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztLQUFBO0lBRUssSUFBSTs7WUFDVCw0QkFBNEI7WUFDNUIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsWUFBWSxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztRQUNwRSxDQUFDO0tBQUE7SUFFSyxRQUFROztZQUNiLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN2QixDQUFDO0tBQUE7SUFFSyxLQUFLOzs7WUFDVixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFdEIsSUFBSTtnQkFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUU7b0JBQ25FLElBQUksRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDdkIsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTO3dCQUNsQyxhQUFhLEVBQUUsS0FBSztxQkFDcEI7aUJBQ0QsQ0FBQyxDQUFDO2FBQ0g7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTt3QkFBRSxNQUFNLDJDQUEyQyxDQUFDO29CQUMzRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUM1QyxDQUFDLElBQUksRUFBRSxFQUFFLFdBQUMsT0FBQSxJQUFJLENBQUMsU0FBUyxZQUFLLElBQUksQ0FBQyxhQUFhLDBDQUFFLEtBQUssQ0FBQSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssbUJBQW1CLENBQUEsRUFBQSxDQUM3RixDQUFDO29CQUVGLE1BQU0sSUFBSSxHQUFHLE1BQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLDBDQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN2RDthQUNEOztLQUNEO0lBRUssS0FBSzs4REFBSSxDQUFDO0tBQUE7SUFFaEIsTUFBTSxDQUFDLFdBQVc7UUFDakIsT0FBTyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztZQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7QUE3RkYsc0NBOEZDO0FBN0ZPLHVCQUFTLEdBQUcsZ0NBQWdDLENBQUMifQ==