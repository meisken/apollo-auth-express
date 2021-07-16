
import { Cookie,SetCookieWrapper  } from "../../../types/cookieTypes"
const cookie = require("cookie")


export const setCookie: SetCookieWrapper = (res) => {

    return (cookies) => {
        let cookieArray: Cookie[] = [];
        if(Array.isArray(cookies)){
            cookieArray = cookies
        }else{
            cookieArray = [cookies]
        }
    
        let combinedCookies:string[] = [];
        cookieArray.forEach(({name,value,options}) => {
            //res.cookie(name,value,options);
            combinedCookies.push(cookie.serialize(name, value,options));
        })
 
        
        res.setHeader("Set-Cookie",combinedCookies);
    }
}