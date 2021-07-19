import { SaveFileConfig } from "../../../types/file/saveFileConfig";
import { File, Upload } from "../../../types/file/uploadType"
import { fileNameCheck } from "./fileNameCheck";
import { filesCountCheck } from "./filesCountCheck";
import { fileSizeCheck } from "./fileSizeCheck";
import { fileTypeCheck } from "./fileTypeCheck";



type FilesCheck = (files: File[], config: SaveFileConfig) => Promise<(Upload | undefined)[]>
const filesCheck: FilesCheck = (files,config) => {
    const filesLength = files.length;
    const promise = new Promise<(Upload | undefined)[]>(async (resolve,reject) => {
        try{
            if(config?.maxCount){
                await filesCountCheck({filesLength,maxCount: config.maxCount})
            }
            const syncFiles = await Promise.all(files);
            const errorCheckPromises: Promise<void>[] = [];

            syncFiles.forEach((file) => {
                errorCheckPromises.push(
                    new Promise<void>(async (_resolve,_reject) => {
                        if(file){
                            const { createReadStream,filename,mimetype } = file;
                            try{
                                await fileNameCheck(filename);
                                if(config?.fileType){
                                    await fileTypeCheck({mimetype,fileType: config.fileType});
                                }
                                if(config?.maxSize){
                                    await fileSizeCheck({createReadStream,maxSize:config.maxSize});
                                }
                                _resolve();
                            }catch(err){
                                _reject(err);
                            }
                        }
                    })
                );
            });

            await Promise.all(errorCheckPromises);
            resolve(syncFiles);
            
        }catch(err){
            reject(err);
        }

    });
    return promise
}



export { filesCheck }