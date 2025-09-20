import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, Like } from 'typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider) 
    private providerRepository: Repository<Provider>
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy({providerId: id});
  }

  findByName(name: string) {
    const provider = this.providerRepository.findOneBy({
      providerName: Like(`%${name}%`)
    });

    if(!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerToUpdate = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    })

    if(!providerToUpdate) throw new NotFoundException();
    this.providerRepository.save(providerToUpdate);
    return providerToUpdate;
  }

  remove(id: string) {
    this.providerRepository.delete({ providerId: id });
  
    return {
      message: `El provedor con id ${id} fue eliminado`
    }
  }
}
