

type FilesCountCheck = ({filesLength,maxCount}: {maxCount: number,filesLength:number}) => Promise<void>
const filesCountCheck:FilesCountCheck = ({filesLength,maxCount}) => {
    const promise = new Promise<void>((resolve,reject) => {
        if(filesLength <= maxCount){
            resolve();
        }else if(filesLength <= 0){
            reject(new Error("Not file uploaded"));
        }else{
            reject(new Error(`The max count of file uploads is ${maxCount}`));
        }
    });
    return promise
}



export { filesCountCheck }