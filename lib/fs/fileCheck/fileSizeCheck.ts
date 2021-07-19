import fs from "fs"
import { CreateReadStream } from "../../../types/file/uploadType";


type FileSizeCheck = ({maxSize,createReadStream}:{maxSize: number,createReadStream: CreateReadStream}) => Promise<void>
const fileSizeCheck:FileSizeCheck = ({maxSize,createReadStream}) => {
    const promise = new Promise<void>(async (resolve,reject) => {
        const uploadStream = createReadStream() as any;
    

        let byteLength = 0;
        for await (const uploadChunk of uploadStream) {
            byteLength += (uploadChunk as Buffer).byteLength;
            
            if (byteLength > maxSize * 1000000) {
                reject(new Error(`File size can not bigger than ${maxSize}mb`));
                break;
            }
        }
        uploadStream.destroy();
        if(byteLength < maxSize * 1000000){
            resolve();
        }

    });
    return promise
}



export { fileSizeCheck }