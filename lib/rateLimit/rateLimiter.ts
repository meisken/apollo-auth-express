import { getIp } from "../../function/backend/getIp";

const RateLimit = require("express-rate-limit");
const MongoStore = require('rate-limit-mongo');
let limiter = new RateLimit({
    store: new MongoStore({
        uri: process.env.MONGODB_URL!,
        expireTimeMs: 15 * 60 * 1000,
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
        // see Configuration section for more options and details
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    keyGenerator: (req: Request) => {
        const ip = getIp(req as any);
        return ip
    },
    delayMs: 0,
});



export { limiter }