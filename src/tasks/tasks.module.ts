import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './Task.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './Task.Entity';

@Module({
  imports:[TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
