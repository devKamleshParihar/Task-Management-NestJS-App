import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./Task.Status.Enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    username:string

    @Column()
    status:TaskStatus
}