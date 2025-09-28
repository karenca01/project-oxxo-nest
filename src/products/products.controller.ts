import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe,  ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';


@ApiAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example:{
      productId: "UUID",
      productName: "Oxxo",
      price: 1000,
      countSeal: 10
    }
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findOne(id);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('provider/:id')
  findByProvider(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findByProvider(id);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      productId: "UUID",
      productName: "Oxxo",
      price: 1000,
      countSeal: 10,
      provider: {
        providerId: "UUID",
        providerName: "Coca Cola",
        providerEmail: "coca@email.com",
        providerPhoneNumber: "4421382759"
      }
    } as Product
  })
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.remove(id);
  }
}
