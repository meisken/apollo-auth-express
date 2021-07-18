import { hasSymbol } from "../../both/hasSymbol";
import { hasWhiteSpace } from "../../both/hasWhiteSpace"


type UsernameCheck = (username: string) => Promise<void>
const usernameCheck: UsernameCheck = (username) => {
    const promise = new Promise<void>((resolve,reject) => {
        if(hasWhiteSpace(username)){
            reject(new Error("Username cannot be left blank"));
        }else if(hasSymbol(username)){
            reject(new Error("Username cannot contain symbol"));
        }else{
            resolve();
        }
    
    })
    return promise
}


export { usernameCheck }