import { Stream } from "stream";


type CreateReadStream = () => Stream;
interface Upload {
    filename: string,
    mimetype: string,
    encoding: string,
    createReadStream: CreateReadStream
}
type File = Promise<Upload> | undefined;
export type { Upload,File,CreateReadStream }