import { createWriteStream } from "fs";
import { Upload } from "../../types/function/file/uploadType"
import { logger } from "../winston";


type SaveFile = (file: Upload | undefined) => Promise<boolean>
const saveFile: SaveFile = (file) => {

    const promise = new Promise<boolean>(async (resolve,reject) => {

        
        if(!file){  
            reject("file is undefined");
        }else{
     
            const { createReadStream,filename } = await file;
            createReadStream().pipe(createWriteStream(`${__dirname}/../../../public/uploads/${filename}`))
                              .on("finish",() => {
                                logger.info(`${filename} is saved`);
                                resolve(true);
                              })
                              .on("error", () => reject(false));
            
        }
    });
    return promise
}

export { saveFile }