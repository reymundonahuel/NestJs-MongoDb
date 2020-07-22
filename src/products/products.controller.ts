import { Controller, Get, Post, Res, HttpStatus, Body, Put, Param, NotFoundException, Delete, Query } from '@nestjs/common';
import { CreateProductDTO } from "./dto/product.dto";
import { ProductsService } from './products.service';
import { identity } from 'rxjs';

@Controller('products')
export class ProductsController {
constructor(private service: ProductsService){}

@Post('/create')
async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){
    const product = await this.service.createProduct(createProductDTO)
    return res.status(HttpStatus.OK).json({
        message: "Product Sucess",
        product: product
    })
}

@Get('/')
async GetProducts(@Res() res){
const product = await this.service.getProducts();
res.status(HttpStatus.OK).json({
    product
})
}

@Get('/:id')
async getProduct(@Res()res, @Param('id') ID){
const product = await this.service.getProduct(ID);
if (!product) throw new NotFoundException('Product Not Found')
return res.status(HttpStatus.OK).json(product)
}

@Delete('/delete')
async deleteProduct(@Res()res, @Query('id') id){
    const product = await this.service.deleteProduct(id);
    if (!product) throw new NotFoundException('Product Not Found')
    return res.status(HttpStatus.OK).json(product)
}

@Put('/update')
async updateProduct(@Res()res, @Body() createProductDto: CreateProductDTO, @Query('id') id){
    const product = await this.service.updateProduct(id,createProductDto);
    if (!product) throw new NotFoundException('Product Not Found')
    return res.status(HttpStatus.OK).json(product)
}

}
