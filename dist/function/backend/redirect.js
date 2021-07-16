"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("next/router"));
exports.default = (function (context, target) {
    if (context.res) {
        // server
        // 303: "See other"
        context.res.writeHead(303, { Location: target });
        context.res.end();
    }
    else {
        // In the browser, we just pretend like this never even happened ;)
        router_1.default.replace(target);
    }
});
