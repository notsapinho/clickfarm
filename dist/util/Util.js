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
exports.randomUsername = exports.randomAvatar = exports.randomUserAgent = exports.makeid = exports.tempDir = exports.sleepRandom = exports.sleep = exports.objectAsBase64 = exports.init = void 0;
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
const useragents = fs_1.default.readFileSync(__dirname + "/../../assets/Lists/user_agents.txt", { encoding: "utf8" }).split("\n");
function randomUserAgent() {
    return useragents.random();
}
exports.randomUserAgent = randomUserAgent;
const avatars = fs_1.default.readFileSync(__dirname + "/../../assets/Lists/avatars.txt", { encoding: "utf8" }).split("\n");
function randomAvatar() {
    return avatars.random();
}
exports.randomAvatar = randomAvatar;
const usernames = fs_1.default.readFileSync(__dirname + "/../../assets/Lists/usernames.txt", { encoding: "utf8" }).split("\n");
function randomUsername() {
    return usernames.random();
}
exports.randomUsername = randomUsername;
//# sourceMappingURL=Util.js.map