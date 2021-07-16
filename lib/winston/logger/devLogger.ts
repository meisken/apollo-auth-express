import { createLogger,transports } from "winston"
import { devLogFormat } from "../format/devLogFormat";





const devLogger = createLogger({
    level: 'debug',
    format: devLogFormat,
    defaultMeta: { service: 'apollo-auth' },
    transports: [
        new transports.Console(),
       
    ],
});
   
export { devLogger }