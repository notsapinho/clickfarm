"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const solveRCaptcha = require("./Captcha/solveRCaptcha");
const Util = __importStar(require("./Util"));
Util.init();
// @ts-ignore
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const DiscordAccount_1 = require("./DiscordAccount");
const GmailPool_1 = require("./Email/GmailPool");
const ProxyPool_1 = require("./Proxy/ProxyPool");
const Util_1 = require("./Util");
const promises_1 = __importDefault(require("fs/promises"));
const MobileProxy_1 = require("./Proxy/MobileProxy");
function main(threads) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailPool = new GmailPool_1.GmailPool("yunite.music", "awdj()2896HIU");
        console.log("initemail");
        yield emailPool.init();
        const pool = new ProxyPool_1.ProxyPool(MobileProxy_1.MobileProxy, threads);
        console.log("initpool");
        yield pool.init();
        console.log("initedpool");
        for (let i = 0; i < threads; i++) {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                while (true) {
                    let proxy = yield pool.getProxy();
                    try {
                        let account = new DiscordAccount_1.DiscordAccount({
                            proxy,
                            emailProvider: emailPool.getProvider(),
                            username: Util_1.makeid(6),
                            password: Util_1.makeid(10),
                        });
                        yield account.register();
                        yield account.joinServer("https://discord.gg/N8WxRUy");
                        console.log(account.token);
                        yield promises_1.default.appendFile(__dirname + "/../tokens.txt", account.token + "\n", "utf8");
                        yield account.close();
                    }
                    catch (error) {
                        console.error(error);
                    }
                    yield proxy.release();
                }
            }), 0);
        }
        // @ts-ignore
        global.pool = pool;
        // @ts-ignore
        global.emailPool = emailPool;
    });
}
main(1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9IYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3pELDZDQUErQjtBQUMvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWixhQUFhO0FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRCxxREFBa0Q7QUFDbEQsaURBQThDO0FBQzlDLGlEQUE4QztBQUM5QyxpQ0FBZ0M7QUFDaEMsMkRBQTZCO0FBQzdCLHFEQUFrRDtBQUVsRCxTQUFlLElBQUksQ0FBQyxPQUFlOztRQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxxQkFBUyxDQUFDLHlCQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsVUFBVSxDQUFDLEdBQVMsRUFBRTtnQkFDckIsT0FBTyxJQUFJLEVBQUU7b0JBQ1osSUFBSSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2xDLElBQUk7d0JBQ0gsSUFBSSxPQUFPLEdBQUcsSUFBSSwrQkFBYyxDQUFDOzRCQUNoQyxLQUFLOzRCQUNMLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFOzRCQUN0QyxRQUFRLEVBQUUsYUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsUUFBUSxFQUFFLGFBQU0sQ0FBQyxFQUFFLENBQUM7eUJBQ3BCLENBQUMsQ0FBQzt3QkFDSCxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDekIsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7d0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMzQixNQUFNLGtCQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDaEYsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ3RCO29CQUFDLE9BQU8sS0FBSyxFQUFFO3dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3JCO29CQUNELE1BQU0sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUN0QjtZQUNGLENBQUMsQ0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxhQUFhO1FBQ2IsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkIsYUFBYTtRQUNiLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7Q0FBQTtBQUVELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9