import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';
import { Location } from '../entities/location.entity';
import { Region } from "src/regions/entities/region.entity";
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto{
    @ApiProperty()
    @IsString()
    @MaxLength(35)
    locationName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    
    @ApiProperty({
        default: [-12.1234, 12.1234]
    })
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];

    @ApiProperty()
    @IsObject()
    @IsOptional()
    region: Region
}