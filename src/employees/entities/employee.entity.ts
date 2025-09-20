import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "text"})
    name: string;

    @Column({type: "text"})
    lastname: string;

    @Column({type: "text"})
    phonenumber: string;

    @Column({type: "text"})
    email: string;

    @Column({
        type: "text",
        nullable: true,
    })
    file: string;

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: 'locationId'
    })
    location: Location
}
