"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require('dotenv').config();
var app = express_1.default();
var port = 3005;
var cors_1 = __importDefault(require("cors"));
var winston_1 = require("./lib/winston");
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
mongoose_1.default.connection.once('open', function () {
    winston_1.logger.info('connected to database');
});
var rateLimiter_1 = require("./lib/rateLimit/rateLimiter");
app.use(rateLimiter_1.limiter);
app.use(cors_1.default({
    methods: ["GET", "POST"],
    origin: "*"
}));
app.use(express_1.default.static("public"));
var ApolloServer_1 = require("./lib/apollo/backend/ApolloServer");
ApolloServer_1.apolloServer.applyMiddleware({ app: app });
app.listen({ port: port }, function () {
    console.log("server running on port:" + port);
});
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })
