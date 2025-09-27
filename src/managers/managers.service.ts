import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) {}

  create(createManagerDto: CreateManagerDto) {
    console.log('Creado');
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    console.log('Buscado');
    return this.managerRepository.find();
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOneBy({ managerId: id });
    
    if(!manager) throw new NotFoundException();
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    console.log('Cambiado');
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    })

    if(!managerToUpdate) throw new NotFoundException();
    this.managerRepository.save(managerToUpdate);
    return managerToUpdate;
  }

  remove(id: string) {
    return this.managerRepository.delete({ managerId: id });
  }
}
