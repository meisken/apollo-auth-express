import { cookiesConfig } from "../cookie/cookiesConfig"
import { SetCookie } from "../../../types/cookieTypes"

const deleteAccessTokenCookie = (setCookie: SetCookie) => {
    setCookie({
        name: "access-token",
        value: "deleted",
        options: {
            ...cookiesConfig,
            maxAge: -1
        }
    })
}

export { deleteAccessTokenCookie }