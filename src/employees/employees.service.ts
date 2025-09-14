import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeesService {
  private employees = [
  {
    id:uuid(),
    name:"Alberto",
    lastname:"Santos",
    phonenumber:"4421387642",
  },
  {
    id:uuid(),
    name:"Jose",
    lastname:"Perez",
    phonenumber:"4428787642",
  }
]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee)=>employee.id === id)[0];
    if(!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    employeeToUpdate = {
      ...employeeToUpdate,
      ... updateEmployeeDto
    }

    this.employees = this.employees.map((employee)=> {
      if(employee.id === id){
        employee = employeeToUpdate;
      }
      return employeeToUpdate;
    })
    return employeeToUpdate
  }

  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}