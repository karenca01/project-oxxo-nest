import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Location } from "../../locations/entities/location.entity";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;

    @Column("text")
    managerFullName: string;

    @Column("float")
    managerSalary: number;

    @Column("text")
    managerEmail: string;

    @Column("text")
    managerPhonenumber: string;

    @OneToOne(() => Location)
    location: Location;
}
