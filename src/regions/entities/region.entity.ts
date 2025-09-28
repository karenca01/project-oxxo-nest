import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Location } from "../../locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;

    @ApiProperty({
        default: 'Norte'
    })
    @Column({
        type: "text",
        unique: true,
    })
    regionName: string;

    @ApiProperty({
        default: ['Chihuahua', 'Coahuila', 'Monterrey', 'Tamaulipas']
    })
    @Column('simple-array')
    regionStates: string[];

    @OneToMany(() => Location, (location) => location.region)
    locations: Location[];
}
