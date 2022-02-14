import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' }) 
    startDate: Date;

    @Column({ type: 'timestamp' }) 
    endDate: Date;

    @Column({type: 'text', nullable: false})
    reason: string;

    @Column({type: 'int'})
    approved: number;
}