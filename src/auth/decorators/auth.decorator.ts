import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../guards/roles.guard";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "./roles.decorator";
import { ROLES } from "../constants/roles.constants";

export const Auth = (...roles: ROLES[]) =>{
    roles.push(ROLES.ADMIN);
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard),
    );
}