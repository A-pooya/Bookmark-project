import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/model';
import { RegisterController } from './register.controller';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name , schema:userSchema}]),
    JwtModule.register({
    secret:"secret",
  }) ],
  controllers: [RegisterController , LoginController],
  providers: [LoginService],
})
export class LoginModule {}
