import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './Task.Entity';
import { CreateDTO } from './dto/create.dto';
import { UpdateTaskStatusDTO } from './dto/update.TaskStatus';
import { FilterAndSearchDTO } from './dto/filter.And.Search.dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksServices : TasksService){}

    @Get()
    getTasks(@Query() FilterAndSearchDTO:FilterAndSearchDTO):Promise<Task[]>{
      return this.TasksServices.GetTasks(FilterAndSearchDTO)
    }

    @Get("/:id")
    getTaskById(@Param("id") id :string): Promise<Task>{  
      return this.TasksServices.GetTaskById(id)
    }

    @Post()
    createTask(@Body() CreateDTO:CreateDTO):Promise<Task>{
      return this.TasksServices.CreateTask(CreateDTO)
    }

    @Delete("/:id")
    deleteTask(@Param("id") id:string):Promise<string>{
      return this.TasksServices.DeleteTaskByID(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param("id") id :string ,@Body() UpdateTaskStatusDTO:UpdateTaskStatusDTO):Promise<Task>{
      const {status} = UpdateTaskStatusDTO
      return this.TasksServices.UpdateTaskStatus(id,status)
    }
}
