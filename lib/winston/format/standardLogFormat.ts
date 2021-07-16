import { format } from "winston"

const { combine,timestamp,printf,colorize,errors,json } = format;

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Hongkong'
    });
}



// const logFormat = printf(({ level, message, timestamp,stack }) => {
//     return `${timestamp} ${level}: ${stack || message}`;
// });

const standardLogFormat = combine(
    timestamp({format: timezoned}),
    errors({stack: true}),
    json()
);


export { standardLogFormat }