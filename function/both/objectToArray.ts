

const objectToArray = <T>(obj: ({[key: string]: any})) => {
    let resultArray: T[] = [];
    const objectKeys = Object.keys(obj);
    objectKeys.forEach((objKey) => {
        resultArray.push(obj[objKey]);
    });
    return resultArray
}


export { objectToArray }