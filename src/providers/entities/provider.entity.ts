import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @ApiProperty({
        default: 'Coca Cola'
    })
    @Column('text')
    providerName: string;

    @ApiProperty({
        default: 'coca@email.com'
    })
    @Column('text', {
        unique: true,
    })
    providerEmail: string;

    @ApiProperty({
        default: '4421382759'
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (product) => product.provider)
    products: Product[]
}
