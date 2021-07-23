"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require('dotenv').config();
var cors_1 = __importDefault(require("cors"));
var winston_1 = require("./lib/winston");
var mongoose_1 = __importDefault(require("mongoose"));
var rateLimiter_1 = require("./lib/rateLimit/rateLimiter");
var corsConfig_1 = require("./lib/cors/corsConfig");
var ApolloServer_1 = require("./lib/apollo/backend/ApolloServer");
var app = express_1.default();
var port = 3005;
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var acceptHeaderProtection_1 = require("./function/backend/acceptHeaderProtection");
app.use(acceptHeaderProtection_1.acceptHeaderProtection);
app.use(cookie_parser_1.default());
// const csrfProtection = csrf({cookie:{
//     maxAge: 60 * 60 * 24,
//     ...cookiesConfig
// }});
// app.use(csrfProtection);
// app.get("/csrf-token",(req, res) => {
//     const csrfToken = req.csrfToken();
//     res.cookie("csrf-token",csrfToken ,{
//         maxAge: 60 * 60 * 24,
//         ...cookiesConfig
//     });
//     res.json({csrfToken});
// });
mongoose_1.default.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
mongoose_1.default.connection.once('open', function () {
    winston_1.logger.info('connected to database');
});
app.use(rateLimiter_1.limiter);
app.use(cors_1.default(corsConfig_1.corsConfig));
app.use(express_1.default.static("public"));
ApolloServer_1.apolloServer.applyMiddleware({ app: app, cors: false });
app.listen({ port: port }, function () {
    console.log("server running on port:" + port);
});
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })
