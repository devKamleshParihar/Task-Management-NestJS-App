import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './Task.Repository';
import { Task } from './Task.Entity';
import { CreateDTO } from './dto/create.dto';
import { TaskStatus } from './Task.Status.Enum';
import { FilterAndSearchDTO } from './dto/filter.And.Search.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task)
    private TaskRepository:TaskRepository){}

    async GetTaskById(id:string):Promise<Task>{
        const found = await this.TaskRepository.findOne({where:{id}})
        if(!found) {
            throw new NotFoundException(`Task with \* ${id} */ was not exist`)
        }
        return found
    }

     async CreateTask(CreateDTO:CreateDTO):Promise<Task>{
        const {title , description} = CreateDTO;
        const task =  this.TaskRepository.create({
            title,
            description,
            status:TaskStatus.OPEN
        })
        await this.TaskRepository.save(task)
        return task  
    }

    async DeleteTaskByID(id :string):Promise<string>{

        const found = await this.TaskRepository.delete(id)
        if(found.affected === 0) {
             throw new NotFoundException(`Task with */ ${id} */ was not exist`) 
        }
        return "task was deleted";
    }

    async UpdateTaskStatus(id:string ,status:TaskStatus):Promise<Task>{
        const task = await this.GetTaskById(id)
        task.status = status
        await this.TaskRepository.save(task)
        return task
    }

    async GetTasks(FilterAndSearchDTO:FilterAndSearchDTO):Promise<Task[]>{
        const query = this.TaskRepository.createQueryBuilder('task')
        const {status,search} = FilterAndSearchDTO

        if(status){
            query.andWhere('task.status = :status',{status})
        }

        if(search){
            query.andWhere('LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.username) LIKE LOWER(:search)',{
                search : `%${search}%`
            })
        }

        const tasks = await query.getMany() 
        return tasks


        
    }
}
