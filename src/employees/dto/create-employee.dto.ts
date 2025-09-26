import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @MaxLength(30)
    employeeName: string;

    @IsString()
    @MaxLength(70)
    employeeLastname: string;

    @IsString()
    @MaxLength(10)
    employeePhonenumber: string;

    @IsString()
    @IsEmail()
    employeeEmail: string;
}
