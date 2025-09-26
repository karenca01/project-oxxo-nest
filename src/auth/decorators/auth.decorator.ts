import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../guards/roles.guard";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "./roles.decorator";

export const Auth = (...roles: string[]) =>{
    roles.push("Admin");
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard),
    );
}