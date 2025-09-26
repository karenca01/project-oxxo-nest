import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

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

    @OneToOne(() => User)
    @JoinColumn({
        name: 'userId'
    })
    user: User;
}
