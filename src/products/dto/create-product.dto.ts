import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsUUID("4")
    @IsString()
    @IsOptional()
    productId: string;
    
    @IsString()
    @MaxLength(40)
    productName: string;

    @IsNumber()
    price: number;

    @IsInt()
    countSeal: number;

    @IsString()
    @IsUUID("4")
    @IsOptional()
    provider: string;
}
