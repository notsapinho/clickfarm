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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUserAgent = exports.makeid = exports.tempDir = exports.sleepRandom = exports.sleep = exports.objectAsBase64 = exports.init = void 0;
const fs_1 = __importDefault(require("fs"));
const exitHook = require("async-exit-hook");
Array.prototype.remove = function (elem) {
    // do not use filter to modify current array
    const index = this.indexOf(elem);
    if (index === -1)
        return this;
    this.splice(index, 1);
    return this; //.filter((e) => e !== elem);
};
Array.prototype.insert = function (i, elem) {
    return this.splice(i, 0, elem);
};
Array.prototype.flat = function () {
    return this.reduce((acc, val) => (Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val)), []);
};
Array.prototype.last = function () {
    return this[this.length - 1];
};
Array.prototype.first = function () {
    return this[0];
};
Array.prototype.unique = function () {
    return [...new Set(this)];
};
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};
const oldCatch = Promise.prototype.catch;
// @ts-ignore
Promise.prototype.catch = function (func) {
    if (!func)
        func = console.error;
    // @ts-ignore
    return oldCatch.call(this, func);
};
function init() { } // needed to actually import the file to circumenvent typescript optimizations
exports.init = init;
function objectAsBase64(e) {
    return Buffer.from(JSON.stringify(e)).toString("base64");
}
exports.objectAsBase64 = objectAsBase64;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res) => setTimeout(res, ms));
    });
}
exports.sleep = sleep;
function sleepRandom(min, max) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res) => setTimeout(res, Math.random() * (max - min) + min));
    });
}
exports.sleepRandom = sleepRandom;
const tempdirs = [];
exitHook((callback) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = tempdirs.map((path) => __awaiter(void 0, void 0, void 0, function* () { return yield fs_1.default.promises.rmdir(path, { recursive: true }); }));
    yield Promise.all(promises);
    console.log("cleaned up");
    callback();
}));
function tempDir() {
    return __awaiter(this, void 0, void 0, function* () {
        let tempPath;
        switch (process.platform) {
            case "darwin":
                tempPath = process.env["TMPDIR"] || "/tmp/nodetemp";
                break;
            case "linux":
                tempPath = "/tmp/nodetemp";
                break;
            case "win32":
                tempPath = "%Temp%\\nodetemp";
                break;
            default:
                tempPath = __dirname;
        }
        let result = yield fs_1.default.promises.mkdtemp(tempPath);
        tempdirs.push(result);
        return result;
    });
}
exports.tempDir = tempDir;
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.makeid = makeid;
const useragents = fs_1.default.readFileSync(__dirname + "/Lists/user_agents.txt", { encoding: "utf8" }).split("\n");
function randomUserAgent() {
    return useragents.random();
}
exports.randomUserAgent = randomUserAgent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFvQjtBQUNwQixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUU1QyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUF3QixJQUFPO0lBQ3ZELDRDQUE0QztJQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLE9BQU8sSUFBSSxDQUFDLENBQUMsNkJBQTZCO0FBQzNDLENBQUMsQ0FBQztBQUVGLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFVBQWEsQ0FBUyxFQUFFLElBQU87SUFDdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUc7SUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdkcsQ0FBQyxDQUFDO0FBRUYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUc7SUFDdEIs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