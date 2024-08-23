import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './Task.Entity';
import { CreateDTO } from './dto/create.dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksServices : TasksService){}
    @Get("/:id")
    getTaskById(@Param("id") id :string): Promise<Task>{  
      return this.TasksServices.GetTaskById(id)
    }

    @Post()
    createTask(@Body() CreateDTO:CreateDTO):Promise<Task>{
      return this.TasksServices.CreateTask(CreateDTO)
    }
}
