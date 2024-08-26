import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './Task.Entity';
import { CreateDTO } from './dto/create.dto';
import { UpdateTaskStatusDTO } from './dto/update.TaskStatus';
import { FilterAndSearchDTO } from './dto/filter.And.Search.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get.user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private TasksServices : TasksService){}

    @Get()
    getTasks(@Query() FilterAndSearchDTO:FilterAndSearchDTO,@GetUser() user:User):Promise<Task[]>{
      return this.TasksServices.GetTasks(FilterAndSearchDTO,user)
    }

    @Get("/:id")
    getTaskById(@Param("id") id :string,@GetUser() user:User): Promise<Task>{  
      return this.TasksServices.GetTaskById(id,user)
    }

    @Post()
    createTask(@Body() CreateDTO:CreateDTO , @GetUser() user:User):Promise<Task>{
      return this.TasksServices.CreateTask(CreateDTO,user)
    }

    @Delete("/:id")
    deleteTask(@Param("id") id:string,@GetUser() user:User):Promise<string>{
      return this.TasksServices.DeleteTaskByID(id,user)
    }

    @Patch("/:id/status")
    updateTaskStatus(
      @Param("id") id :string ,
      @Body() UpdateTaskStatusDTO:UpdateTaskStatusDTO,
      @GetUser() user:User):Promise<Task>{
      const {status} = UpdateTaskStatusDTO
      return this.TasksServices.UpdateTaskStatus(id,status,user)
    }
}
