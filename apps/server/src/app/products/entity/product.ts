import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum NumberOfEntries {
    SINGLE = 'Single',
    MULTIPLE = 'Multiple',
}

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    country: string;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int' })
    lengthOfStay: number;


    @Column({ type: 'enum', enum: NumberOfEntries })
    numberOfEntries: NumberOfEntries;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    filingFee: number;
}
