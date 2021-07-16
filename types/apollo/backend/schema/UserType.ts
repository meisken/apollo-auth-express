interface UserType{
    id: string,
    username: string,
    email: string,
    admin: boolean,
    confirmed: boolean,
    password: string,
    accessTokenIp?: string | undefined,
    pictureUrl?: string | undefined

}export type { UserType };