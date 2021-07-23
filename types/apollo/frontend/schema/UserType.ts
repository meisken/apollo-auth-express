interface UserType{
    id: string,
    username: string,
    email: string,
    admin: boolean,
    pictureUrl?: string | undefined
} 


export type { UserType }