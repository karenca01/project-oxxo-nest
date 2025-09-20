import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
