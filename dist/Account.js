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
const YEAR = 1000 * 60 * 60 * 24 * 365;
class Account {
    constructor(props) {
        if (!props.dateofbirth)
            props.dateofbirth = new Date(Date.now() - YEAR * 18 - Math.random() * 40 * YEAR); // random date between 18 and 58
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFVdkMsTUFBc0IsT0FBTztJQU81QixZQUFZLEtBQXFCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztZQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdDQUFnQztRQUUxSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO0lBQzdHLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM5QixPQUFPO1lBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztZQUN0QyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO1NBQ3BDLENBQUM7SUFDSCxDQUFDO0lBRUssUUFBUTs7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBQ0ssS0FBSzs7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBQ0ssS0FBSzs7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0NBQ0Q7QUFwQ0QsMEJBb0NDIn0=