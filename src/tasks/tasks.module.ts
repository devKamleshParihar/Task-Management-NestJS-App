import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './Task.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './Task.Entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Task]),AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
