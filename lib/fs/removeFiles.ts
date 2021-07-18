import fs from "fs"
import { logger } from "../winston";
export const removeFiles = ( paths: (string[] | string) ) => {
    if(!(Array.isArray(paths))){
        paths = [paths];
    }
    paths.forEach((path) => {


        if (fs.existsSync(path)){
            fs.unlinkSync(path);
            logger.info(`${path} has been removed`); 
        }else{
            logger.info("file doesn't exist"); 
        }
    });
}