import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { create } from 'domain';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register/:id')
  registerManager(
    @Query("role") role:string,
    @Body() createUserDto: CreateUserDto,
    @Param ('id') id: string
  ) {
    if(role === "manager"){
      return this.authService.registerManager(id, createUserDto);
    }else if(role === "employee"){
      return this.authService.registerEmployee(id, createUserDto);
    }
    throw new BadRequestException("El usuario no puede ser administrador o gerente");
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response) {
    const token = await this.authService.loginUser(loginUserDto);
    console.log(token)
    response.cookie(TOKEN_NAME, token,{
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}