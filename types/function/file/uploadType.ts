import { Stream } from "stream";

interface Upload {
    filename: string,
    mimetype: string,
    encoding: string,
    createReadStream: () => Stream
}

export type { Upload }