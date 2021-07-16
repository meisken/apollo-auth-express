import fs from "fs"
export const removeFiles = ( paths: (string[] | string) ) => {
    if(!(Array.isArray(paths))){
        paths = [paths];
    }
    paths.forEach((path) => {


        if (fs.existsSync(path)){
            fs.unlinkSync(path);
        }else{
            console.log("file doesn't exist"); 
        }
    });
}