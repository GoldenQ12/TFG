export interface SignupData {
    fullName: string,
    email: string,
    password: string,
}

export interface LoginData {
    email: string,
    password: string,
}

export interface UserData {
    _id: string,
    email: string,
    password: string,
    fullName: string,
    profilePic: string,
    collections: {
        [key: string] : string[],
    },
    createdAt: string,
    updatedAt: string,
}

