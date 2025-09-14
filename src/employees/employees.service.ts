import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';

@Injectable()
export class EmployeesService {
  private employees = [
  {
    id:1,
    name:"Alberto",
    lastname:"Santos",
    phonenumber:"4421387642",
  },
  {
    id:2,
    name:"Jose",
    lastname:"Perez",
    phonenumber:"4428787642",
  }
]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length +1;
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee)=>employee.id === id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
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

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}