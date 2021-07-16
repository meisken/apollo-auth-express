
export function getCookie(cookies: (string | object | any),name: string) {

    if(typeof(cookies) === "string"){
        let v = cookies.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }else{
        return cookies[name]
    }

}