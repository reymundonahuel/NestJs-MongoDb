import { Document } from "mongoose";

export interface Products extends Document{
    name:string;
    description:string;
    price:number;
    imageURL:string;
    createdAt:Date;
}