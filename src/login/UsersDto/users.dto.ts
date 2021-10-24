export class CreateUsersDto{
    name:string;
    email:string;
    age:number;
    password:string;
}

export class LoginUserDto{
    email:string;
    password:string;
}