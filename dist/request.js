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
exports.request = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
// TODO: save cookie (different for each proxy)
function request(url, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!opts)
            opts = {};
        if (!opts.headers)
            opts.headers = {};
        if (opts.body) {
            if (typeof opts.body === "object") {
                opts.headers["content-type"] = "application/json";
                opts.body = JSON.stringify(opts.body);
            }
            if (!opts.method)
                opts.method = "POST";
        }
        const res = yield node_fetch_1.default(url, opts);
        if (res.status === 204)
            return true;
        const text = yield res.text();
        // @ts-ignore
        text._res = res;
        const error = res.status >= 300 || res.status < 200;
        try {
            var json = JSON.parse(text);
            // @ts-ignore
            json._res = res;
        }
        catch (e) {
            if (error) {
                if (text)
                    throw text;
                throw res.statusText;
            }
            return text;
        }
        if (json) {
            if (json.error || (json.code && !json.guild) || json.message)
                throw json;
            if (error)
                throw json;
        }
        if (error)
            throw res.statusText;
        return json;
    });
}
exports.request = request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDREQUFnRDtBQWdCaEQsK0NBQStDO0FBRS9DLFNBQXNCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsSUFBcUI7O1FBQy9ELElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEM7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdkM7UUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFLLENBQUMsR0FBRyxFQUFlLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBRXBELElBQUk7WUFDSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLGFBQWE7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNoQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1gsSUFBSSxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxJQUFJO29CQUFFLE1BQU0sSUFBSSxDQUFDO2dCQUNyQixNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUM7YUFDckI7WUFFRCxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxJQUFJLEVBQUU7WUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPO2dCQUFFLE1BQU0sSUFBSSxDQUFDO1lBQ3pFLElBQUksS0FBSztnQkFBRSxNQUFNLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksS0FBSztZQUFFLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Q0FBQTtBQXBDRCwwQkFvQ0MifQ==