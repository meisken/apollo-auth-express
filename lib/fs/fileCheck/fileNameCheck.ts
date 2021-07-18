import { hasSymbol } from "../../../function/both/hasSymbol";
import { hasWhiteSpace } from "../../../function/both/hasWhiteSpace";



type FileNameCheck = (filename: string) => Promise<void>
const fileNameCheck: FileNameCheck = (filename) => {
    const promise = new Promise<void>((resolve,reject) => {
        if(hasWhiteSpace(filename)){
            reject(new Error("Filename cannot be left blank"));
        }/*else if(hasSymbol(filename)){
            reject(new Error("Filename cannot contain symbol"));
        }*/else{
            resolve();
        }
    })
    return promise
}


export { fileNameCheck }