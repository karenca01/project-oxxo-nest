import { Region } from "../entities/region.entity";
import { IsString, IsArray, ArrayNotEmpty, Max, MaxLength } from "class-validator";

export class CreateRegionDto {
    @IsString()
    @MaxLength(100)
    regionName: string;

    @IsArray()
    regionStates: string[];
}
