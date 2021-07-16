import { createLogger,transports } from "winston"
import { standardLogFormat } from "../format/standardLogFormat";




const productionLogger = createLogger({
    level: 'debug',
    format: standardLogFormat,
    defaultMeta: { service: 'apollo-auth' },
    transports: [
        new transports.File({ filename: './log/error.log', level: 'error' }),
        new transports.File({ filename: './log/combined.log' }),
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
    ],
});
   
export { productionLogger }