import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type bookmarkDocument = Bookmark & Document;
export type userDocument = User & Document

@Schema()
export class User{
    @Prop()
    name:string
    @Prop({unique:true})
    email:string
    @Prop()
    age:number
    @Prop()
    password:string
}

@Schema()
export class Bookmark{
    @Prop()
    url:string

    @Prop()
    description:string

    @Prop({type:mongoose.Schema.Types.ObjectId , ref:"User"})
    user:User
}

export const bookmarkSchema = SchemaFactory.createForClass(Bookmark);
export const userSchema = SchemaFactory.createForClass(User);