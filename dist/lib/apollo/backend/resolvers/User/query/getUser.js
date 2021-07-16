"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
var User_1 = require("../../../../../mongodb/schema/User");
var getUser = function (_, args, _a) {
    var user = _a.user;
    if (user === null || user === void 0 ? void 0 : user.admin) {
        var id = args.id;
        return User_1.User.findById(id);
    }
    return null;
};
exports.getUser = getUser;
