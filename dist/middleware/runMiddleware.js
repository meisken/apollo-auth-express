"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMiddleware = void 0;
function runMiddleware(req, res, fn) {
    return new Promise(function (resolve, reject) {
        fn(req, res, function (result) {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
exports.runMiddleware = runMiddleware;
