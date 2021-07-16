import { productionLogger } from "./logger/productionLogger"
import { devLogger } from "./logger/devLogger"


const logger = (process.env.NODE_ENV === "development" )? devLogger : productionLogger;


export { logger }