import { FileMimetype } from "../../../types/file/saveFileConfig"


type FileTypeCheck = ({mimetype,fileType}: {mimetype: string,fileType: FileMimetype}) => Promise<void>
const fileTypeCheck:FileTypeCheck = ({mimetype,fileType}) => {
    const promise = new Promise<void>((resolve,reject) => {
        if(mimetype.includes(fileType)){
            resolve();
        }else{
            reject(new Error("Your file type is not supported"));
        }
    });
    return promise
}



export { fileTypeCheck }