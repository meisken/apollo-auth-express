import { File, Upload } from "../../types/file/uploadType"
import { logger } from "../winston";
import { SaveFileConfig } from "../../types/file/saveFileConfig";
import { saveSingleFile } from "./saveSingleFile";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { filesCheck } from "./fileCheck/filesCheck";

type UploadFile = (files: File | File[], config?: SaveFileConfig ) => Promise<string[]>
const uploadFile: UploadFile = (files,config) => {
    
    const promise = new Promise<string[]>(async (resolve,reject) => {

        if(!files){  
            reject("not file uploaded");
        }else{
            if(!Array.isArray(files)){
                files = [files];
            }

            let syncFiles: (Upload | undefined)[] | undefined;
            try{
                if(config){
                    syncFiles = await filesCheck(files,config);
                }
           
            }catch(err){
                reject(err);
                return
            }
            const folderPath = `${__dirname}/../../../${config?.destinationFolder ??  "public/uploads/"}`;
            if(!(fs.existsSync(folderPath))){
                logger.debug(new Error("destination folder does not exist"));
                reject(new Error("destination folder does not exist"));
            }else{
                syncFiles = syncFiles ?? await Promise.all(files);
                const saveFilePromises: Promise<string>[] = [];

                if(syncFiles){
                    syncFiles.forEach((syncFile) => {
                        if(syncFile){
                            saveFilePromises.push(
                                new Promise<string>(async (_resolve,_reject) => {
                                    let { createReadStream,filename} = syncFile;
                                    filename = uuidv4() + filename;
                                    const path = folderPath + filename;
                                    try{
                                        await saveSingleFile({createReadStream,path});
                                        logger.info(`${filename} has been saved`);
                                        _resolve(filename);
                                    }catch(err){
                                        _reject(err);
                                    }
                                })
                            );
                        }

                    });
                }
                

                try{
                    const filenames = await Promise.all(saveFilePromises);
                    resolve(filenames);
                }catch(err){
                    reject(err);
                }
            }
             
        }
    });
    return promise
}


export { uploadFile }