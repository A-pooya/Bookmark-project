import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkModule } from './bookmarks/bookmark.module';
import { LoginModule } from './login/login.module';


@Module({
  imports: [BookmarkModule ,
    MongooseModule.forRoot("mongodb://localhost:27017/bookmark"),
    LoginModule,
    JwtModule.register({
      secret:"secret",
    }) 
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
