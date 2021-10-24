import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, bookmarkDocument, User, userDocument } from '../model';
import { BookmarkDto } from './dto/bookmark.dto';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

@Injectable()
export class BookmarksService {
    constructor(@InjectModel(Bookmark.name) private BookmarkModel:Model<bookmarkDocument>,
    @InjectModel(User.name) private Usermodel:Model<userDocument>,
    private jwtService:JwtService,
    ){}

     authorization(header:string ):string|BadRequestException{
        const token = header.split(" ")[1];
        const decodedToken =  this.jwtService.verify(token);
        if(!decodedToken) return new BadRequestException("you dont have permission")
        return decodedToken.email
    }

    async findAllBookmarks():Promise<Bookmark[]>{
        const findAllBookmarks = await this.BookmarkModel.find({});
        return findAllBookmarks
    }

    async createBookmark(bookmarkDto:BookmarkDto , email:string):Promise<Bookmark>{
        const {url , description } = bookmarkDto;
        const findUsersByName = await this.Usermodel.findOne({email:email} , "_id")
        const createbookmark = await this.BookmarkModel.create({
            url,
            description,
            user:findUsersByName._id
        })
        return createbookmark;
    }

    async deleteBookmark(id:string , header:string):Promise<BadGatewayException|any>{
        try {
            const userEmail = await this.authorization(header)
            console.log(userEmail);
            const findBookmarkByid = await this.BookmarkModel.findOne({_id:id}).populate("user")
            if(!findBookmarkByid) return new BadRequestException("there isn't any bookmark with this id");
            const userEmailInBookmarkDoc = findBookmarkByid.user.email;
            
            if(userEmail === userEmailInBookmarkDoc ){
                 await this.BookmarkModel.deleteOne({_id : id})
            }else{
                return new BadRequestException("you don't have enough permission")
            }
        } catch (err) {
            return err
        }
    }

    async updateBookmarkUrl(id:string , url:string , header:string):Promise<Bookmark|BadRequestException>{
        try {
            const userEmail = await this.authorization(header);
            const findBookmarkByid = await this.BookmarkModel.findOne({_id:id}).populate("user");
            if(!findBookmarkByid) return new BadRequestException("there isn't any bookmark with this id");

            const userEmailInBookmarkDoc = findBookmarkByid.user.email;

            if(userEmail === userEmailInBookmarkDoc){

            await this.BookmarkModel.updateOne({_id:id} , {$set:{url}})
            const updatedBookmark = await this.BookmarkModel.findOne({_id:id})  
            return updatedBookmark;

            }else{
                return new BadRequestException("you don't have permission")
            }
        } catch (err) {
            return err
        }
    }
}
