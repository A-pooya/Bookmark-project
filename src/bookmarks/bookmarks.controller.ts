import { BadRequestException, Body, Controller, Delete, Get,  Headers, Param, Patch, Post, Req } from '@nestjs/common';
import { Bookmark } from '../model';
import { BookmarksService } from './bookmarks.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { JwtService } from '@nestjs/jwt';


@Controller('bookmarks')
export class BookmarksController {
    constructor(
        private bookmarkService:BookmarksService,
        private jwtService:JwtService,
        ){}

    @Get()
     async getAllBookmarks():Promise<Bookmark[]>{
          const getAllBookmarks = await this.bookmarkService.findAllBookmarks();
          return getAllBookmarks;
    }
    @Post()
    async createBoomark(@Headers("Authorization") header,@Body() bookmarkDto:BookmarkDto , @Body("email") email:string){
        try {
        const bearerToken = header;
        
        if(!bearerToken) throw new BadRequestException("invalid credential!")
        const token = bearerToken.split(" ")[1]
        const decodedToken = await this.jwtService.verify(token);
        if(!decodedToken){
            throw new BadRequestException("invalid credential");
        }
        const createdBookmark = await this.bookmarkService.createBookmark(bookmarkDto , email)
        return createdBookmark;
            
        } catch (err) {
            return err
        }
    }
    @Delete("/:id")
    async deleteBookmark(@Param("id") id:string , @Headers("Authorization") header:string){
            await this.bookmarkService.deleteBookmark(id , header)
            return {message:"bookmark successfully deleted"} 
    }
    @Patch("/:id")
    async updateBookmarkUrl(@Param("id") id:string , @Body("url") url:string , @Headers("Authorization") header:string){
        const updatedBookmark = await this.bookmarkService.updateBookmarkUrl(id , url , header)
        return updatedBookmark;
    }
}
