import { format } from "winston"

const { combine,timestamp,printf,colorize,errors } = format;


const logFormat = printf(({ level, message ,stack }) => {
    return `${level}: ${stack || message}`;
});

const devLogFormat = combine(
    colorize(),
    errors({stack: true}),
    logFormat,
);


export { devLogFormat }