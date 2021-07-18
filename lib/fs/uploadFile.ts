import { File } from "../../types/file/uploadType"
import { logger } from "../winston";
import { SaveFileConfig } from "../../types/file/saveFileConfig";
import { fileTypeCheck } from "./fileCheck/fileTypeCheck";
import { filesCountCheck } from "./fileCheck/filesCountCheck";
import { saveSingleFile } from "./saveSingleFile";
import { fileNameCheck } from "./fileCheck/fileNameCheck";
import { fileSizeCheck } from "./fileCheck/fileSizeCheck";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

type UploadFile = (files: File | File[], config?: SaveFileConfig ) => Promise<string[]>
const uploadFile: UploadFile = (files,config) => {
    
    const promise = new Promise<string[]>(async (resolve,reject) => {

        if(!files){  
            reject("not file uploaded");
        }else{
            if(!Array.isArray(files)){
                files = [files];
            }
            const filesLength = files.length;
            const filenames: string[] = [];
        
            try{
                if(config?.maxCount){
                    await filesCountCheck({filesLength,maxCount: config.maxCount})
                }
            }catch(err){
                reject(err);
                return
            }
            const folderPath = `${__dirname}/../../../${config?.destinationFolder ??  "public/uploads/"}`;
            if(!(fs.existsSync(folderPath))){
                reject(new Error("destination folder does not exist"));
            }else{

                files.forEach(async (file) => {
          
                    if(file){
                        try{
                            let { createReadStream,filename,mimetype } = await file;
                 
                      
                            try{
                                await fileNameCheck(filename);
                                if(config?.fileType){
                                    await fileTypeCheck({mimetype,fileType: config.fileType});
                                }
                                
                                filename = uuidv4() + filename;
                                const path = folderPath + filename;


                                await saveSingleFile({createReadStream,path});
                                logger.info(`${filename} has been saved`);
                                filenames.push(filename);
    
                                if(config?.maxSize){
                                    await fileSizeCheck({maxSize: config.maxSize,path});
                                }
                                if(filesLength === filenames.length){
                                    resolve(filenames);
                                }
    
                            }catch(err){                    
                                reject(err);
                            }
    
    
                        }catch(err){
                            reject(err);
                        }
                    }
    
                });
            }
             
        }
    });
    return promise
}


export { uploadFile }