import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { Request , Response } from "express";
import { User } from 'src/model';
import { CreateUsersDto } from './UsersDto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('register')
export class RegisterController {
    constructor(
        private loginService:LoginService,
        private jwtService:JwtService
        ){}
    
    @Get()
    getAllUsers(){
        const AllUsers = this.loginService.findAllusers();
        return AllUsers;
    }

    @Post()
    async createUser(@Body() createUsersDto:CreateUsersDto){
        const newUser = await this.loginService.createUsers(createUsersDto)
        const token = await this.jwtService.sign({email:createUsersDto.email})
        return {newUser , token };
    }

}
