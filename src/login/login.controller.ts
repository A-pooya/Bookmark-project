import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUserDto } from './UsersDto/users.dto';

@Controller('login')
export class LoginController {
    constructor(private loginService:LoginService){}
    @Post()
    async handleLogin(@Body() loginUserDto:LoginUserDto){
        return await this.loginService.handleLogin(loginUserDto)
    }
}
