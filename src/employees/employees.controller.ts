import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { AwsService } from 'src/aws/aws.service';

// @ApiAuth()
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService, 
    private readonly awsService: AwsService
  ) {}

  // @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: 'UUID',
      employeeName: 'Karen',
      employeeLastname: 'Cervantes',
      employeeEmail: 'karen@email.com',
      employeePhonenumber: '4427544416'
    } as Employee
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  // @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@Param('id') id:string, @UploadedFile() file: Express.Multer.File){
    const response = await this.awsService.uploadFile(file);
    return this.employeesService.update(id,{
      employeePhoto : response
    })
  }

  // @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  // @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.employeesService.findOne(id);
  }

  // @Auth(ROLES.MANAGER)
  @Get('location/:id')
  findAllLocation(@Param('id')id: string){
    return this.employeesService.findByLocation(+id);
  }

  // @Auth(ROLES.EMPLOYEE)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Cynthia",
      employeeLastname: "Aguilar",
      employeePhonenumber: "4422521870",
      employeeEmail: "cynthia@email.com",
      employeePhoto: "null",
      location: {
        locationId: 1,
        locationName: "Oxxo Juriquilla",
        locationAddress: "Calle 123, 123 Barrio, Juriquilla",
        locationLatLng: [-12.1234, 12.1234]
      }
    } as Employee
  })
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  // @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.employeesService.remove(id);
  }
}
