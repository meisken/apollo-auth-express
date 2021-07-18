
type FileMimetype = "image" | "audio" | "text" | "video" | "model" | "font" | "application";

interface SaveFileConfig{
    fileType?: FileMimetype,
    maxCount?: number,
    maxSize?: number,
    destinationFolder?: string
}


export type { SaveFileConfig,FileMimetype }