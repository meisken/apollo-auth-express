"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchConfig = void 0;
var fetchConfig = function (refreshToken) {
    var config = {
        headers: {
            'content-type': 'multipart/form-data',
            "authorization": refreshToken,
            "accept": "accept-request",
        },
        onUploadProgress: function (event) {
            console.log("Current progress:", Math.round((event.loaded * 100) / event.total));
        },
    };
    return config;
};
exports.fetchConfig = fetchConfig;
