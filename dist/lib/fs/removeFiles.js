"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFiles = void 0;
var fs_1 = __importDefault(require("fs"));
var winston_1 = require("../winston");
var removeFiles = function (paths) {
    if (!(Array.isArray(paths))) {
        paths = [paths];
    }
    paths.forEach(function (path) {
        if (fs_1.default.existsSync(path)) {
            fs_1.default.unlinkSync(path);
            winston_1.logger.info(path + " has been removed");
        }
        else {
            winston_1.logger.info("file doesn't exist");
        }
    });
};
exports.removeFiles = removeFiles;
