export interface User{
    id: string;
    login: string;
    password: string;
}

export interface CreateUserDto {
    login: string;
    password: string;
}