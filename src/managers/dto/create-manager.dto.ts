import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

export class CreateManagerDto {
    @IsString()
    @MaxLength(80)
    managerFullName: string;

    @IsNumber()
    managerSalary: number;

    @IsString()
    @IsEmail()
    managerEmail: string;

    @IsString()
    @MaxLength(16)
    managerPhonenumber: string;
}
