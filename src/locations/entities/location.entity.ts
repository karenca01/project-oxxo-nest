import { Manager } from "src/managers/entities/manager.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Region } from "../../regions/entities/region.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: 'Oxxo Juriquilla'
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: 'Calle 123, 123 Barrio, Juriquilla'
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [-12.1234, 12.1234]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @ApiProperty({default: "adb439e9-77be-47b8-bc6c-90c02cfb39b0"})
    @OneToOne(() => Manager,{
        eager: true
    })
    @JoinColumn({
        name: 'managerId',
    })
    manager: Manager | string;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: 'regionId',
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
