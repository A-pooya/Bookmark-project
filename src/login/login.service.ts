import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/model';
import { CreateUsersDto, LoginUserDto } from './UsersDto/users.dto';
import * as bcript from "bcrypt";

@Injectable()
export class LoginService {
    constructor(@InjectModel(User.name) private userModel:Model<userDocument>,){}

    async findAllusers():Promise<User[]>{
        const findAllUsers = await this.userModel.find({})
        return findAllUsers
    }

    async createUsers(createUserDto:CreateUsersDto):Promise<User>{
        const {name , age , email , password} = createUserDto;
        const hashPassword = await bcript.hash(password , 10)
        const newUser = await this.userModel.create({
            name,
            email,
            age,
            password:hashPassword
        })
        return newUser;
    }
     async handleLogin(loginUserDto:LoginUserDto):Promise<BadRequestException|string>{
         const {email , password} = loginUserDto;
         const user = await this.userModel.findOne({email});

         if(!user) return new BadRequestException("please register first")

         const isMatch = await bcript.compare(password , user.password)
         
         if(!isMatch) return new BadRequestException("password or email is not correct")
         return "welcome:) you logged in"
     }
}
