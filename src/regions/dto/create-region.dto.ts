import { ApiProperty } from "@nestjs/swagger";
import { Region } from "../entities/region.entity";
import { IsString, IsArray, ArrayNotEmpty, Max, MaxLength } from "class-validator";

export class CreateRegionDto {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    regionName: string;

    @ApiProperty({
        default: ['string', 'string', 'string', 'string']
    })
    @IsArray()
    regionStates: string[];
}
