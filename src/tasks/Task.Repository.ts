import { Repository } from "typeorm";
import { Task } from "./Task.Entity";
import { CreateDTO } from "./dto/create.dto";
import { TaskStatus } from "./Task.Status.Enum";

export class TaskRepository extends Repository<Task>{
    // async CreateTask(CreateDTO:CreateDTO):Promise<Task>{
    //     const {username , name} = CreateDTO;
    //     const task =  this.create({
    //         name,
    //         username,
    //         status:TaskStatus.OPEN
    //     })
    //     await this.save(task)
    //     return task  
    // }
}