import { CookieOptions } from "../../../types/cookieTypes"
const cookiesConfig: CookieOptions = process.env.NODE_ENV === "production" ? {
    domain:process.env.URL,           
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly:true
} : {
    path: "/",
    httpOnly:true
}
export { cookiesConfig }