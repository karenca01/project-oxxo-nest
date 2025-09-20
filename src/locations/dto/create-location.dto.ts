import { ArrayNotEmpty, IsArray, IsString, MaxLength } from 'class-validator';
import { Location } from '../entities/location.entity';

export class CreateLocationDto{
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
}