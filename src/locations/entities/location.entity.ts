import { Manager } from "src/managers/entities/manager.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Region } from "../../regions/entities/region.entity";
import { Employee } from "src/employees/entities/employee.entity";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @Column('text')
    locationName: string;

    @Column('text')
    locationAddress: string;

    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(() => Manager)
    @JoinColumn({
        name: 'managerId',
    })
    manager: Manager;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: 'regionId',
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
