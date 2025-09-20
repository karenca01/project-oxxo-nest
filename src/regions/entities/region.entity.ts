import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;

    @Column({
        type: "text",
        unique: true,
    })
    regionName: string;

    @Column("text", { array: true })
    regionStates: string[];
}
