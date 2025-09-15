import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
