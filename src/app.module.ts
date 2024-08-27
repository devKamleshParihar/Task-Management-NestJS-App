import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/Task.Entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports :[
    ConfigModule.forRoot({
      envFilePath:[`.env.stage.${process.env.STAGE}`]
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (ConfigService:ConfigService)=>{
        return {
          type:"postgres",
          autoLoadEntities:true,
          host:'localhost',
          username:'postgres',
          password:'postgres',
          entities:[Task],
          database:'tasks-management'
          // entities:[Task],
          // synchronize:true,
          // host:ConfigService.get('DB_HOST'),
          // port:ConfigService.get('DB_PORT'),
          // username:ConfigService.get('DB_USERNAME'),
          // password:ConfigService.get('DB_PASSWORD'),
          // database:ConfigService.get('DB_DATABASE')
        }
      }
    }),
    AuthModule
  ]
 
})
export class AppModule {}

// type:"postgres",
//       host:"localhost",
//       port:5432,
//       username:"postgres",
//       password:"postgres",
//       database:"tasks-management",
//       autoLoadEntities:true,
//       entities:[Task],
//       synchronize:true
