import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    employeeId: string;

    @Column('text')
    employeeName: string;

    @Column('text')
    employeeLastname: string;

    @Column('text')
    employeePhonenumber: string;

    @Column('text', {
        unique: true,
    })
    employeeEmail: string;

    @Column({
        type: "text",
        nullable: true,
    })
    employeePhoto: string;

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: 'locationId'
    })
    location: Location

    @OneToOne(() => User)
    @JoinColumn({
        name: 'userId'
    })
    user: User;
}
