import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from "./interfaces/products.interface";
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductsService {
constructor(@InjectModel('Products') private productModel: Model<Products>){}

async getProducts(): Promise<Products[]>{
    const product = await this.productModel.find()
return product
}

async getProduct(id:string): Promise<Products>{
 const productOnly = await this.productModel.findById(id)
 return productOnly
}

async createProduct(createProductDTO: CreateProductDTO): Promise<Products>{
const product =  new this.productModel(createProductDTO);
return await product.save();

}

async updateProduct(id:string, createProductDTO:CreateProductDTO):Promise<Products>{
return await this.productModel.findByIdAndUpdate(id,createProductDTO,{new:true});
}

async deleteProduct(id:string):Promise<Products>{
return await this.productModel.findByIdAndDelete(id);
}

}
