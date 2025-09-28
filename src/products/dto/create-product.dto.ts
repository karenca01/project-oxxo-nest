import { IsIn, IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import {Provider} from "../../providers/entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductDto{
    @ApiProperty()
    @IsUUID("4")
    @IsString()
    @IsOptional()
    productId: string;
    
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    productName: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsInt()
    countSeal: number;

    @ApiProperty()
    @IsObject()
    provider: Provider;
}
