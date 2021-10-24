import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, bookmarkSchema, User, userSchema } from '../model';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Bookmark.name , schema:bookmarkSchema},
      {name:User.name , schema:userSchema}
    ]),
    JwtModule.register({
      secret:"secret",
    }) 
],
  controllers: [BookmarksController],
  providers: [BookmarksService]
})
export class BookmarkModule {}
