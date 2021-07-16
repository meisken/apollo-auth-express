"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var productionLogger_1 = require("./logger/productionLogger");
var devLogger_1 = require("./logger/devLogger");
var logger = (process.env.NODE_ENV === "development") ? devLogger_1.devLogger : productionLogger_1.productionLogger;
exports.logger = logger;
