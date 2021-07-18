import fs from "fs"


type FileSizeCheck = ({maxSize,path}:{maxSize: number,path: string}) => Promise<void>
const fileSizeCheck:FileSizeCheck = ({maxSize,path}) => {
    const promise = new Promise<void>((resolve,reject) => {
        const stats = fs.statSync(path);
        if(stats.size < maxSize * 1000000){
            resolve();
        }else{
            reject(new Error(`file size cannot be bigger than ${maxSize}mb`));
        }
    });
    return promise
}



export { fileSizeCheck }