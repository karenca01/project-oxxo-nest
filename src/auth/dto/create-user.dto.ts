import { IsEmail, IsOptional, IsString, MinLength, IsIn } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {
    @IsEmail()
    userEmail: string;

    @IsString()
    @MinLength(8)
    userPassword: string;

    @IsIn(["Employee", "Manager", "Admin"])
    @IsOptional()
    userRoles: string[];
}
