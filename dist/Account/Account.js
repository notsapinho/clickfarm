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
exports.Account = void 0;
const Util_1 = require("../util/Util");
const YEAR = 1000 * 60 * 60 * 24 * 365;
class Account {
    constructor(props) {
        if (!props.dateofbirth)
            props.dateofbirth = new Date(Date.now() - YEAR * 18 - Math.random() * 40 * YEAR); // random date between 18 and 58
        if (!props.password)
            props.password = Util_1.makeid(10);
        if (!props.username)
            props.username = Util_1.randomUsername();
        if (!props.avatar)
            props.avatar = Util_1.randomAvatar();
        Object.assign(this, props);
    }
    get stringofbirth() {
        if (!this.dateofbirth)
            return;
        return `${this.dateofbirth.getDate()}.${this.dateofbirth.getMonth() + 1}.${this.dateofbirth.getFullYear()}`;
    }
    get objectofbirth() {
        if (!this.dateofbirth)
            return;
        return {
            month: this.dateofbirth.getMonth() + 1,
            day: this.dateofbirth.getDate(),
            year: this.dateofbirth.getFullYear(),
        };
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("not implemented");
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("not implemented");
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("not implemented");
        });
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map