import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './Task.Repository';
import { Task } from './Task.Entity';
import { CreateDTO } from './dto/create.dto';
import { TaskStatus } from './Task.Status.Enum';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task)
    private TaskRepository:TaskRepository){}

    async GetTaskById(id:string):Promise<Task>{
        console.log(id);
        const found = await this.TaskRepository.findOne({where:{id}})
        if(!found) {
            throw new NotFoundException(`Task with \* ${id} */ was not exist`)
        }
        return found
    }

    async CreateTask(CreateDTO:CreateDTO):Promise<Task>{
        const {username , name} = CreateDTO;
        const task =  this.TaskRepository.create({
            name,
            username,
            status:TaskStatus.OPEN
        })
        await this.TaskRepository.save(task)
        return task
        
    }
}
