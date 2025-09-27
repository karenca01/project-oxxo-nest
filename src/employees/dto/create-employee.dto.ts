import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class LocationEmployeeDto{
    @ApiProperty()
    locationId: number;

    @ApiPropertyOptional()
    locationName: string;

    @ApiPropertyOptional()
    locationAddress: string;

    @ApiPropertyOptional()
    locationLatLng: number[];
}

export class CreateEmployeeDto {
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    employeeName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(70)
    employeeLastname: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    employeePhonenumber: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;

    @ApiProperty()
    @IsObject()
    @IsOptional()
    location: LocationEmployeeDto
}
