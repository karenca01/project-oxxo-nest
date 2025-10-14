import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private  locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) {}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id
    });

    if(!location) throw new NotFoundException("Location not found");
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location : null})
      .where("locationId = :id",{
        id,
      }).execute();

    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    const savedLocation = await this.locationRepository.save(location);

    if (updateLocationDto.manager) {
      const updatedManager = await this.managerRepository.preload({
        managerId: updateLocationDto.manager,
        location: savedLocation,
      });

      if (!updatedManager) {
        throw new NotFoundException(`Manager with ID ${updateLocationDto.manager} not found`);
      }

      await this.managerRepository.save(updatedManager);
    }
    return savedLocation;
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id });
  }
}
