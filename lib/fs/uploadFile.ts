import { createWriteStream } from "fs";
import { File } from "../../types/file/uploadType"
import { logger } from "../winston";
import fs from "fs"
import { SaveFileConfig } from "../../types/file/saveFileConfig";
import { fileTypeCheck } from "./fileCheck/fileTypeCheck";
import { filesCountCheck } from "./fileCheck/filesCountCheck";
import { saveSingleFile } from "./saveSingleFile";
import { fileNameCheck } from "./fileCheck/fileNameCheck";
import { fileSizeCheck } from "./fileCheck/fileSizeCheck";



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
            const urls: string[] = [];
        
            try{
                if(config?.maxCount){
                    await filesCountCheck({filesLength,maxCount: config.maxCount})
                }
            }catch(err){
                reject(err);
                return
            }

            files.forEach(async (file) => {

                if(file){
                    try{
                        const { createReadStream,filename,mimetype } = await file;
                        const path = `${__dirname}/../../../public/uploads/${filename}`;
                        try{
                       
                            if(config?.fileType){
                                await fileTypeCheck({mimetype,fileType: config.fileType});
                                await fileNameCheck(filename);
                            }
                            await saveSingleFile({createReadStream,path});
                            logger.info(`${filename} is saved`);
                            urls.push( `${process.env.BASE_URL}/uploads/${filename}`);

                            if(config?.maxSize){
                                await fileSizeCheck({maxSize: config.maxSize,path});
                            }
                            if(filesLength === urls.length){
                                resolve(urls);
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
    });
    return promise
}


export { uploadFile }