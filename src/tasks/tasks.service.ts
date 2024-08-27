import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './Task.Repository';
import { Task } from './Task.Entity';
import { CreateDTO } from './dto/create.dto';
import { TaskStatus } from './Task.Status.Enum';
import { FilterAndSearchDTO } from './dto/filter.And.Search.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    private logger = new Logger('TasksService')
    constructor(@InjectRepository(Task)
    private TaskRepository:TaskRepository){}

    async GetTaskById(id:string,user:User):Promise<Task>{
        const found = await this.TaskRepository.findOne({where:{id,user}})
        if(!found) {
            throw new NotFoundException(`Task with \* ${id} */ was not exist`)
        }
        return found
    }

     async CreateTask(CreateDTO:CreateDTO,user:User):Promise<Task>{
        const {title , description} = CreateDTO;
        const task =  this.TaskRepository.create({
            title,
            description,
            status:TaskStatus.OPEN,
            user
        })

        try {
            await this.TaskRepository.save(task)
            return task
        } catch (error) {
            throw new InternalServerErrorException()
        }  
    }

    async DeleteTaskByID(id :string,user:User):Promise<string>{

        const found = await this.TaskRepository.delete({id,user})
        if(found.affected === 0) {
             throw new NotFoundException(`Task with */ ${id} */ was not exist`) 
        }
        return "task was deleted";
    }

    async UpdateTaskStatus(id:string ,status:TaskStatus,user:User):Promise<Task>{
        const task = await this.GetTaskById(id,user)
        task.status = status
        await this.TaskRepository.save(task)
        return task
    }

    async GetTasks(FilterAndSearchDTO:FilterAndSearchDTO,user:User):Promise<Task[]>{
        const query = this.TaskRepository.createQueryBuilder('task')
        const {status,search} = FilterAndSearchDTO

        query.where({user})

        if(status){
            query.andWhere('task.status = :status',{status})
        }
        //show error here 
        if(search){
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',{
                search : `%${search}%`
            })
        }

        try {
            const tasks = await query.getMany() 
            return tasks
        } catch (error) {
            this.logger.error(`user ${user.username} unable to get task ${JSON.stringify(CreateDTO)}`)
            throw new InternalServerErrorException()
        }


        
    }
}
