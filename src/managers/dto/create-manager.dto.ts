import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagerDto {
    @ApiProperty()
    @IsString()
    @MaxLength(80)
    managerFullName: string;

    @ApiProperty()
    @IsNumber()
    managerSalary: number;

    @ApiProperty()
    @IsString()
    @IsEmail()
    managerEmail: string;

    @ApiProperty()
    @IsString()
    @MaxLength(16)
    managerPhonenumber: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    location: Location
}
