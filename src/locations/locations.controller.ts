import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ROLES } from '../auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiResponse } from '@nestjs/swagger';


@ApiAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Auth()
  @ApiResponse({
    status: 201,
    example:{
      locationId: "Increment",
      locationName: "Oxxo Juriquilla",
      locationAddress: "Calle 123, 123 Barrio, Juriquilla",
      locationLatLng: [-12.1234, 12.1234]
    }
  })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
