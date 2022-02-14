import { Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity    {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: false})
    username: string;

    @Column({type: 'text', nullable: false})
    password: string;

    @Column({type: 'text', nullable: false})
    role: string;
}