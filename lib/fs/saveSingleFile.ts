import { createWriteStream } from "fs";
import { CreateReadStream } from "../../types/file/uploadType";




type SaveSingleFile = ({createReadStream,path}: {createReadStream:CreateReadStream,path: string}) => Promise<void>

const saveSingleFile: SaveSingleFile = ({createReadStream,path}) => {
    const promise = new Promise<void>((resolve,reject) => {
        createReadStream()
        .pipe(createWriteStream(path))
        .on("finish",async () => resolve())
        .on("error", () => reject(new Error("ave file failed")));
    });
    return promise
}


export { saveSingleFile }